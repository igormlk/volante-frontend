import { CAR_FUELS } from '@/data/constants/carBrands';
import { COLORS } from '@/data/constants/colors';
import useSOPrices from '@/hooks/useSOPrices';
import { currencyFormat } from '@/lib/utils';
import { ServiceOrder, ServiceOrderItem } from '@/pages/ServiceOrder/types';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';
import { useMemo } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontSize: 9,
    padding: 12,
    fontFamily: 'Helvetica'
  },
  logo: {
    height: 42
  },
  header: {
    flexDirection: 'row',
    textAlign: 'right',
    padding: 12,
  },
  body: {
    margin: 12,
    flexGrow: 1,
    gap: 2,
    border:'1 solid #CBD5E1',
    borderRadius: 3
  },
  footer: {
    padding: 12,
    backgroundColor: '#EFEFEF',
    fontSize: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  preFooter:{
    flexDirection: 'row',
    padding: 12,
    marginBottom: 24
  },
  signContainer:{
    width: 250,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: 24
  },
  container:{
    flexDirection: 'row',
    gap: 24,
    padding: 12
  },
  title:{
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase'
  },
  titleRight:{
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    textAlign: 'right'
  },
  title2:{
    fontFamily: 'Helvetica-Bold',
    textTransform: "capitalize",
    marginBottom: 4
  },
  subtitle:{
    textTransform: 'capitalize',
    fontSize: 10
  },
  itemText: {
    textAlign: 'right',
    width: 60
  },
  itemTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    width: 60
  },
  expiration:{
    fontFamily: "Helvetica-Oblique",
    fontSize: 9
  },
  pageNumber:{
    fontSize: 7,
    color: '#606060'
  }
});

interface ServiceOrderPDFProps {
    data?: Partial<ServiceOrder>,
    filename?: string
}
export const ServiceOrderPDF = ({data, filename}: ServiceOrderPDFProps) => {
  const PAGE_SIZE = 20;

  const expirationDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return date;
  }, []);

  const paginatedItems = useMemo(() => {
    let paginated = []
    for (let i = 0; i < (data?.service_order_items?.length || 0); i += PAGE_SIZE) {
      paginated.push(data?.service_order_items?.slice(i, i + PAGE_SIZE));
    }
    return paginated
  }, [data?.service_order_items])

  const LAST_PAGE_INDEX =  paginatedItems.length - 1
  const prices = useSOPrices(data?.service_order_items || [])
  
  return (
  <Document author='Volante - Sistema de Gestão de Orçamentos' title={filename} subject={'Orçamento Veicular'} creationDate={new Date()}> 
    {paginatedItems?.map((serviceOrderItems, pageIndex) => (
      <Page key={pageIndex} size="A4" style={styles.page} bookmark={"Geração 2000"}>
      {/* Header da Página */}
      <View style={styles.header} fixed>
          <Image src={'../assets/company_logo.png'} style={styles.logo}/>
          <View style={{flex: 1}}>
              <Text>{Intl.DateTimeFormat('pt-BR', {dateStyle: 'full'}).format(new Date())}</Text>
              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)}/>
          </View>
      </View>
      <Text style={{...styles.title, fontSize: 12, textAlign: 'center', marginVertical: 8}}>Orçamento Veicular</Text>

      {/* Dados do Orçamento */}
      <View style={{...styles.container, justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
              <Text style={styles.title}>{data?.customer?.name || 'Cliente anônimo'}</Text>
              {data?.customer?.cpf && <Text><Text style={styles.title2}>CPF: </Text>{data?.customer?.cpf}</Text>}
              {data?.customer?.email && <Text><Text style={styles.title2}>E-mail: </Text>{data?.customer?.email}</Text>}
              {data?.customer?.phone && <Text><Text style={styles.title2}>Telefone: </Text>{data?.customer?.phone}</Text>}
          </View>
          <View style={{flex: 1}}>
              <Text style={styles.title}>{(data?.vehicle?.model || data?.vehicle?.brand) ? `${data?.vehicle?.brand} ${data?.vehicle?.model}` : 'Veículo não informado'}</Text>
              <View style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                {data?.vehicle?.year && <Text><Text style={styles.title2}>Ano: </Text>{data?.vehicle?.year || 'não informado'}</Text>}
                {data?.vehicle?.plate && <Text><Text style={styles.title2}>Placa: </Text>{String(data?.vehicle?.plate || 'Sem Placa').toUpperCase()}</Text>}
              </View>
              <View style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
              {data?.vehicle?.color && <Text><Text style={styles.title2}>Cor: </Text>{COLORS.find(i => (i.value === data?.vehicle?.color))?.label || "não informada"}</Text>}
                {data?.vehicle?.fuel && <Text><Text style={styles.title2}>Combustível: </Text>{CAR_FUELS.find(i => i.value === data?.vehicle?.fuel)?.label || 'não informado'}</Text>}
              </View>
              <View style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                {data?.vehicle?.km && <Text><Text style={styles.title2}>Km: </Text>{data?.vehicle?.km || 'não informado'}</Text>}
                {data?.vehicle?.chassi && <Text><Text style={styles.title2}>Chassi: </Text>{data?.vehicle?.chassi || 'não informado'}</Text>}
              </View>
          </View>
          <View style={{width: 120}}>
              {data?.customer?.address && <Text style={{...styles.title, textAlign: 'right'}}>{data?.customer?.address ? 'Endereço' : 'Endereço não informado'}</Text>}
              {data?.customer?.address && <Text style={{textAlign: 'right'}}>{data?.customer?.address || "não informado"}</Text>}
          </View>
      </View>

      {/* Items do Orçamento */}
      <View style={styles.body}>
          <View style={{flexDirection: 'row', minHeight: 12, backgroundColor: '#EFEFEF',paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8}}>
              <Text style={{...styles.itemTitle,textAlign: 'left', flex: 1}}>Item</Text>
              <Text style={styles.itemTitle}>Qtd.</Text>
              <Text style={styles.itemTitle}>Valor</Text>
              <Text style={styles.itemTitle}>Subtotal</Text>
              <Text style={styles.itemTitle}>Desconto</Text>
              <Text style={styles.itemTitle}>Total</Text>
          </View>
          {((serviceOrderItems?.length || 0) > 0) && serviceOrderItems?.map((item: ServiceOrderItem) => (
              <View key={item?.id} style={{flexDirection: 'row', minHeight: 12, paddingHorizontal: 12}}>
                  <Text style={{...styles.itemText, flex: 1, textAlign: 'left'}}>{item.description}</Text>
                  <Text style={styles.itemText}>{item.quantity}</Text>
                  <Text  style={styles.itemText}>{currencyFormat(item.value)}</Text>
                  <Text style={styles.itemText}>{currencyFormat(item.value * item.quantity)}</Text>
                  <Text style={styles.itemText}>{currencyFormat(item.discount)}</Text>
                  <Text style={styles.itemText}>{currencyFormat((item.value * item.quantity) - item.discount)}</Text>
              </View>
          ))}
      </View>
      {/* Preços */}
      {(pageIndex === LAST_PAGE_INDEX) && <View style={styles.container}>
        <View>
            <Text style={styles.title}>Subtotal</Text>
            <Text>{currencyFormat(prices.subtotal, 'currency')}</Text>
        </View>
        <View style={{flex: 1}}>
            <Text style={styles.title}>Descontos</Text>
            <Text>{currencyFormat(prices.totalDiscountPrice, 'currency')}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '8px'}}>
          <View style={{textAlign: 'right', alignItems: 'flex-end'}}>
              <Text style={styles.titleRight}>Peças</Text>
              <Text style={{textAlign: 'right'}}>{currencyFormat(prices.totalPartsPrice, 'currency')}</Text>
          </View>
          <View style={{textAlign: 'right', alignItems: 'flex-end'}}>
              <Text style={styles.titleRight}>Serviços</Text>
              <Text style={{textAlign: 'right'}}>{currencyFormat(prices.totalServicesPrice, 'currency')}</Text>
          </View>
          <View style={{textAlign: 'right', alignItems: 'flex-end'}}>
            <Text style={styles.titleRight}>Valor Total</Text>
            <Text style={{textAlign: 'center'}}>{currencyFormat(prices.totalPrice, 'currency')}</Text>
          </View>
        </View>
      </View>}

      {/* Data de validade */}
      <View style={{padding: 12}}>
          <Text style={styles.expiration}>{'Orçamento válido até ' + Intl.DateTimeFormat('pt-BR').format(expirationDate)}</Text>
          <Svg height="5" width="100%">
              <Line x1="0" y1="5" x2="2000" y2="5" strokeWidth={2} stroke="#CBD5E1" />
          </Svg>
      </View>
      {/* Formas de pagamento e avisos */}
      <View style={styles.preFooter}>
          <View style={{flex: 1, gap: 12}}>
              <View>
                  <Text style={styles.title}>Formas de pagamento</Text>
                  <Text>50% de entrada da mão de obra e o restante parcelado em até 3 vezes no cartão, sem juros ( para orçamentos acima de R$ 500,00 ).
                      Pagamento à vista no PIX com 5% de desconto.
                      Chave PIX: CNPJ 04.367.737.0001-06.</Text>
                  <Text>O pagamento do valor das peças é exclusivamente à vista.</Text>
              </View>
              <View>
                  <Text style={styles.title}>Avisos</Text>
                  <Text>Em alguns casos, precisaremos ajustar a data de entrega. Isso pode acontecer por diverso fatores, como atrasos na entrega de peças.</Text>
                  <Text>Trabalhamos com todas as companhias de seguros.</Text>
              </View>
          </View>
          <View style={styles.signContainer}>
              {<Text>____________________________________</Text>}
              <Text style={{marginTop: 6, marginRight: 42, fontFamily: 'Helvetica-Bold', marginBottom: 24}}>Assinatura da Oficina</Text>
              <Text>____________________________________</Text>
              <Text style={{marginTop: 6, marginRight: 42, fontFamily: 'Helvetica-Bold'}}>Assinatura do Cliente</Text>
          </View>
      </View>
      {/* Footer */}
      <View style={styles.footer} fixed>
          <View>
            <Text><Text style={styles.title2}>Whatsapp: </Text>{`+55 (11) 99169-5290`}</Text>
            <Text><Text style={styles.title2}>Telefone: </Text>{`+55 (11) 4194-3489`}</Text>
              <Text><Text style={styles.title2}>E-mail: </Text>funilariageracao2000@gmail.com </Text>
              <Text><Text style={styles.title2}>Instagram: </Text>@oficinageracao2k</Text>
              <Text><Text style={styles.title2}>Facebook: </Text>Oficina Geração 2000</Text>
          </View>
          <Text style={{width: 100,textAlign: 'center'}}>Rua Gisele, 204 Parque dos Camargos, Barueri - SP / 06436-120 </Text>
          <Text style={{width: 110,textAlign: 'right'}}>CNPJ: 04.367.737/0001-06</Text>
      </View>
    </Page>
    ))}
  </Document>
)};