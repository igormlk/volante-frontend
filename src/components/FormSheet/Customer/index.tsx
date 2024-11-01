import { CustomerSchema } from "./schema"
import MaskedInput from "@/components/MaskedInput/MaskedInput"
import { MASKS } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Controller, useFormContext } from "react-hook-form"
import Textarea from "@/components/ui/textarea"
interface ICustomerSheetsProps {
  data?: CustomerSchema,
  onChange?: (data: CustomerSchema) => void
  onDelete?: (data?: CustomerSchema) => Promise<any>
  isPending?: boolean,
  disabled?: boolean
}

export function CustomerForm({disabled = false}: ICustomerSheetsProps) {
  const { register, control } = useFormContext()

  return (
    <div className={'grid gap-2 py-4'}>
      <Input disabled={disabled} {...register('customer.name')} id="name" label='Nome do cliente' type="text" placeholder="Digite aqui..." />
      <div className="flex gap-2">
        <Controller
          name="customer.cpf"
          control={control}
          render={({field}) => (
            <MaskedInput disabled={disabled} {...field} mask={MASKS.CPF} placeholder='000.000.000-00' label='CPF'/>
          )}
        />
        <Controller
          name="customer.phone"
          control={control}
          render={({field}) => (
            <MaskedInput disabled={disabled} {...field} mask={MASKS.PHONE} maskChar="" placeholder='(00) 00000-0000' label='Telefone' />
          )}
        />
      </div>
      <Input disabled={disabled} {...register('customer.email')}  type="email" label="Email" placeholder="Digite aqui..." />
      <Textarea label="Endereço" {...register("customer.address")} placeholder="Digite aqui..." />
      {/* <SheetFooter className="mt-4 justify-between">
        {!(data?.id) && <Button type="submit">Salvar</Button>}
        {data?.name && <ConfirmButton 
            onConfirm={() => handleOnDelete()}
            variant={"destructive"}
            disabled={isPending}
            title="Remover cliente"
            message="Deseja realmente remover o cliente desse orçamento?">
              Remover
          </ConfirmButton>}
      </SheetFooter> */}
    </div>
  )
}
