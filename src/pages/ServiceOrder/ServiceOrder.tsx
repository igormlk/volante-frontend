import { MoreVertical, Save, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerFormSheet } from "@/components/FormSheet/Customer";
import { VehicleFormSheet } from "@/components/FormSheet/Vehicle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceOrderAPI } from "@/data/ServiceOrder";
import ServiceOrderCard from "../../components/ServiceOrderTable/ServiceOrderTable";
import { ServiceOrder, ServiceOrderItem } from "./types";
import { getCarServicesAPI } from "@/data/CarServices";
import { z } from "zod";
import { CustomerSchema } from "@/components/FormSheet/Customer/schema";
import { VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { toast } from "sonner";
import { VehicleDetailCard, CustomerDetailCard } from "@/components/DetailCard/DetailCard";
import StatusDropDown from "@/components/BadgeDropDown/BadgeDropDown";
import { SO_STATUS_LIST } from "@/data/constants/utils";

const ServiceOrderSchema = z.object({
  // customer: customerSchema
})

function ServiceOrderPage() {
  const [show, setShow] = useState(false)
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('pending')
  // const form = useForm({ resolver: zodResolver(ServiceOrderSchema), defaultValues: {
  //   duration_quantity: 1,
  //   customer: {name: "", cpf: "", phone: "", email: ""}
  // } })

  const {data: carServices} = useQuery({
    queryKey: ['car-services'],
    queryFn: getCarServicesAPI,
    refetchOnWindowFocus: false
  })

  const { data: serviceOrder } = useQuery({
    queryFn: getServiceOrderAPI,
    queryKey: ['service-order'],
    refetchOnWindowFocus: false
  })

  // const onSubmitHandle = (data: any) => {
  //   console.log(serviceOrder, data)
  //   toast.success('Salvo com sucesso', )
  //   // let newSO = queryClient.getQueryData<ServiceOrder>(['service-order'])
  //   // newSO = {...newSO, ...data}
  //   // console.log(newSO)
  //   // putServiceOrder(newSO)
  // }

  const handleCustomerSubmit = async (customer: CustomerSchema) => {
    toast.message("Cliente adicionado com sucesso!")
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, customer} 
    })
  }

  const handleVehicleSubmit = async (vehicle: VehicleSchema) => {
    toast.message("Veículo adicionado com sucesso!")
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, vehicle}
    })
  }

  const handleNewSOItem = async (newItem: ServiceOrderItem) => {
    console.log(newItem)
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      const newSO = {...data}
      newSO.items = [...newSO.items, newItem]
      return newSO
    })
  }

  const handleVehicleDelete = async (data?: VehicleSchema) => {
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, vehicle: {}}
    })
  }

  const handleCustomerDelete = async (data?: CustomerSchema) => {
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, customer: {}}
    })
  }


  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center pb-8">
        <div className="flex gap-10 flex-1">
          <div>
            <h1 className="text-2xl font-semibold">Novo orçamento</h1>
            <p className="text-sm text-muted-foreground">
              Último salvo {serviceOrder?.last_saved_at ? new Date(serviceOrder?.last_saved_at).toLocaleString() : '...'}
            </p>
          </div>

          <StatusDropDown value={status} title="Situação atual" options={SO_STATUS_LIST} onChange={setStatus}/>
          
        </div>

        <Button variant={"link"}>
          <MoreVertical size={18}/>
        </Button>
      </header>

      <div className="flex-1 flex gap-10">
        
        {/* Left side */}
        <div className="flex flex-col w-[300px] gap-4">
          <VehicleFormSheet 
            onSubmit={handleVehicleSubmit}
            onDelete={handleVehicleDelete}
            isPending={false}
            data={serviceOrder?.vehicle}
            trigger={<VehicleDetailCard vehicle={serviceOrder?.vehicle}/>}
          />
          <CustomerFormSheet 
            onSubmit={handleCustomerSubmit}
            onDelete={handleCustomerDelete}
            isPending={false}
            data={serviceOrder?.customer}
            trigger={<CustomerDetailCard customer={serviceOrder?.customer}/>}
          />
          <FileSelect label="Imagens"/>
        </div>

        {/* center Side */}
        <div className="flex-1 flex flex-col">
          <ServiceOrderCard data={serviceOrder?.items || []} carServices={carServices || []} onAddItem={handleNewSOItem}/>
          <div className="flex mt-6 justify-end items-end gap-3">
            <Button variant="outline"><Send size={18} className="mr-2"/>Enviar</Button>
            <Button type="submit"><Save size={18} className="mr-2"/>Salvar</Button>
          </div>
        </div>

        {/* Right Side */}
        {/* <div className="flex flex-col">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmitHandle)} className="flex flex-col flex-1">
              
              <div className="flex flex-1 flex-col gap-3 w-[300px]">
                  <FormSelect label="Seguradora" name="insurance_company" form={form} options={[{value: 'none', label: 'Não há'}, {value: 'blue', label: 'Azul'}]} placeholder="Selecione..." containerClassName="w-[150px]" direction={"col"}/>
                  <span>
                    <Label htmlFor="duration" className="font-bold">Duração Aproximada</Label>
                    <span className="flex gap-1">
                      <FormInput form={form} name="duration_quantity" placeholder="0" type="number" key={"duration_quantity"} containerClassName="w-[70px]"/>
                      <FormSelect name="duration_type" form={form} options={[{label: 'Horas', value: "hour"}, {label: 'Dias', value: 'day'}, {label: 'Semanas', value: 'week'}, {label: 'Meses', value: 'month'}, {label: 'Anos', value: "year"}]} placeholder="Selecione..." className="flex-1"/>
                    </span>
                  </span>
              </div>
            </form>
          </Form>
        </div> */}
      </div>
    </div>
  );
}

export default ServiceOrderPage;
