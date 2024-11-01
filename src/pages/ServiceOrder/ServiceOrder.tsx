import { Check, File, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerForm } from "@/components/FormSheet/Customer";
import { VehicleForm } from "@/components/FormSheet/Vehicle";
import ServiceOrderItems from "../../components/ServiceOrderItems/ServiceOrderItems";
import { ServiceOrder, ServiceOrderItem, STATUS_SERVICE_ORDER } from "./types";
import { toast } from "sonner";
import StatusDropDown from "@/components/BadgeDropDown/BadgeDropDown";
import { SO_STATUS_LIST } from "@/data/constants/utils";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ServiceOrderPDF } from "@/components/PDF/ServiceOrderPDF";
import { Modal } from "@/components/Modal/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {deleteServiceOrderItem,putServiceOrderAPI} from "@/data/api/ServiceOrderAPI";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema";
import { DEFAULT_VEHICLE_VALUES } from "@/components/FormSheet/Vehicle/schema";
import Textarea from "@/components/ui/textarea";
import { nanoid } from "nanoid/non-secure";
import { useLocation, useParams } from "react-router-dom";


function ServiceOrderPage() {
  const [activeTab, setActiveTab] = useState<"customer" | "damage" | string>("customer");
  const [pdfData, setPdfData] = useState<ServiceOrder>();
  const pdfFileName = `${pdfData?.vehicle?.brand}_${pdfData?.vehicle?.model}_${pdfData?.customer?.name}`
  const { id } = useParams()
  const location = useLocation()

  const methods = useForm<ServiceOrder>({
    defaultValues: {
      id: nanoid(8),
      service_order_items: [],
      customer: DEFAULT_CUSTOMER_VALUE,
      vehicle: DEFAULT_VEHICLE_VALUES,
      status: STATUS_SERVICE_ORDER.PENDING,
      startAt: "",
      endAt: "",
      note: "",
    },
  });

  useEffect(() => {
    if(id){
      const editingServiceOrder: ServiceOrder = location?.state?.service_order
      Object.entries(editingServiceOrder).forEach(([key, value]) => {
        if(['startAt', 'endAt'].includes(key)){
          return methods.setValue(key as keyof ServiceOrder, String(value).substring(0,10));
        }
        methods.setValue(key as keyof ServiceOrder, value);
      });
    }else if(location.pathname === '/service-order/new'){
      methods.reset()
    }
  }, [id])

  const serviceOrderItems  = methods.watch('service_order_items')

  const handleOnAddItem = async (newItem: ServiceOrderItem) => {
    methods.setValue('service_order_items', [newItem, ...serviceOrderItems])
  };

  const handleChangeItem = (changedItem: ServiceOrderItem) => {
    const index = serviceOrderItems.findIndex((item) => (item.id === changedItem.id))
    let updatedServiceOrderItems = serviceOrderItems
    updatedServiceOrderItems[index] = changedItem
    methods.setValue('service_order_items', updatedServiceOrderItems)
  };

  const handleOnRemoveItem = (deletedItem: ServiceOrderItem) => {
    deleteServiceOrderItem(deletedItem.id).then(() => {
      methods.setValue('service_order_items', serviceOrderItems.filter((item) => (item.id !== deletedItem.id)) || [])
    })
  };

  // const handleCarMapChange = async (selected: IChangeValue, data: ICarSelectionValue) => {
  //   if(selected.action.value === CAR_ACTIONS.DAMAGE) return

  //   const newItem: ServiceOrderItem = {id: '389', description: selected.action.value + ' ' + selected.car_part, discount: 0, quantity: 1, total: 50, type: selected.action.value, insurance_coverage: 0, value: 50}
  //   setItems([newItem, ...service_order_items])
  //   setCarMap(data)
  // }

  // const getVehicleColor = (vehicle: VehicleSchema) => {
  //   return COLORS.find(color => color.value === vehicle?.color)?.code || "#000"
  // }

  const handleOnSave = (serviceOrder: any) => {
    putServiceOrderAPI(serviceOrder).then((data) => {
      if (data) {
        methods.setValue('customer', data?.customer)
        methods.setValue('vehicle', data?.vehicle)
        toast.message("Salvo com sucesso!", { icon: <Check /> });
      } else {
        toast.message("Erro ao salvar", { icon: <X /> });
      }
    });
  };

  // const onDuplicateClick = () => {
    // const newOSId = nanoid();
    // setId(newOSId);
    // setStatus(STATUS_SERVICE_ORDER.PENDING);
    // const duplicatedItems = methods
    //   .watch("service_order_items")
    //   .map((item) => ({ ...item, id: nanoid(), serviceOrderId: newOSId }));
    // setItems(duplicatedItems);
    // toast.message("Duplicado com sucesso!");
  // };

  return (
    <div className="h-full flex gap-8 pb-8 flex-wrap flex-row-reverse">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleOnSave)}>
          {/* Left side */}
          <div className="flex w-[350px] flex-col">
            {/* <CarServiceSelector/> */}
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-[7px]">
                <TabsTrigger value="customer">
                  <User className="w-[18px] mr-2" />
                  Dados Pessoais
                </TabsTrigger>
                {/* <TabsTrigger value="damage"><Car className="w-[18px] mr-2"/>Mapa Veicular</TabsTrigger> */}
              </TabsList>
              {/* <TabsContent value="damage" hidden={activeTab !== 'damage'} forceMount>
              <CarServiceSelector color={getVehicleColor(vehicle)} value={car_map} onChange={handleCarMapChange}/>
              <Card className="p-4 rounded-lg mt-3">
                <FileSelect label="Imagens"/>
              </Card>
              </TabsContent> */}
              <TabsContent value="customer" className="h-[calc(100vh-160px)] flex-1 overflow-scroll">
                <div className="flex flex-col gap-2">
                  <Card className="px-4 rounded-lg">
                    <CustomerForm isPending={false} />
                  </Card>
                  <Card className="px-4 rounded-lg">
                    <VehicleForm isPending={false} />
                  </Card>
                  <Card className="flex flex-col p-4 rounded-lg gap-1">
                    <Textarea label="Anotações" {...methods.register("note")} placeholder="Ex: Avarias, acordos com o cliente..."/>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Botões */}
            <div className="flex justify-between items-end gap-4 mt-4 pt-4" onMouseEnter={() => setPdfData(methods.getValues())}>
              {/* <div> */}
                {/* <ConfirmButton
                  message="Deseja começar um novo orçamento do zero?"
                  title="Resetar"
                  variant={"destructive"}
                  onConfirm={() => console.log("reset")}
                >
                  Resetar
                </ConfirmButton> */}
                {/* <ConfirmButton
                  message="Deseja começar um novo orçamento para a mesma pessoa e veículo?"
                  title="Duplicar"
                  variant={"outline"}
                  onConfirm={onDuplicateClick}
                >
                  Duplicar
                </ConfirmButton> */}
              {/* </div> */}
              <div className="flex gap-2">
                <Modal
                  trigger={<Button disabled={serviceOrderItems.length <= 0} onClick={() => setPdfData(methods.getValues())} variant="outline"><File size={18}/>PDF</Button>}
                  title="Orçamento"
                  subtitle="Envie ou imprima para seu cliente"
                  className="min-h-[calc(100vh-180px)]"
                  async={true}
                >
                  <PDFViewer showToolbar={true} className="w-full min-h-[calc(100vh-180px)]">
                    <ServiceOrderPDF data={pdfData} filename={pdfFileName}/>
                  </PDFViewer>
                </Modal>
                <PDFDownloadLink
                  fileName={pdfFileName}
                  document={<ServiceOrderPDF data={pdfData}/>}>
                  <Button variant={"outline"} disabled={serviceOrderItems.length <= 0} type="button"><Save size={18} />Download</Button>
                </PDFDownloadLink>
              </div>
              <Button type="submit"><Save size={18} className="mr-2" />Salvar</Button>
            </div>
          </div>
        </form>
      </FormProvider>

      {/* right Side */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center pb-4 gap-4">
          <div className="flex flex-1">
            <h1 className="text-2xl font-bold">{id ?  `Orçamento ${methods.getValues('id')}` : 'Novo orçamento'}</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input type="date" {...methods.register("startAt")} />
            <p>até</p>
            <Input type="date" {...methods.register("endAt")} />
          </div>
          <StatusDropDown
            value={methods.watch("status", STATUS_SERVICE_ORDER.PENDING)}
            title="Situação atual"
            options={SO_STATUS_LIST}
            onChange={(value) => methods.setValue("status", value)}
          />
        </header>

        <ServiceOrderItems
          data={serviceOrderItems}
          onAddItem={handleOnAddItem}
          onChangeItem={handleChangeItem}
          onRemoveItem={handleOnRemoveItem}
        />
      </div>
    </div>
  );
}

export default ServiceOrderPage;
