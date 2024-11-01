import { VehicleSchema } from "./schema"
import { COLORS } from '@/data/constants/colors'
import { CAR_BRANDS, CAR_FUELS } from '@/data/constants/carBrands'
import { Input } from "@/components/ui/input"
import SelectOption from "@/components/ui/selectOptions"
import { Controller, useFormContext } from "react-hook-form"

interface IVehicleSheetsProps {
  data?: VehicleSchema,
  disabled?: boolean,
  onChange?: (data: VehicleSchema) => void,
  onDelete?: () => Promise<any>
  isPending: boolean
}

export function VehicleForm({disabled = false}: IVehicleSheetsProps) {
  const {  register, control } = useFormContext()

  return (
    <div className="grid gap-4 py-4">
      <div className="flex gap-2">
        <Input {...register('vehicle.plate')} disabled={disabled} label="Placa" placeholder="ABC-1D23"  className={'uppercase'} />
        <Controller
          name="vehicle.color"
          control={control}
          render={({field}) => (
            <SelectOption {...field} disabled={disabled}label="Cor" placeholder="Selecione..." options={COLORS} onChange={(value) => {
              field.onChange(value)
            }}/>
          )}
        />
      </div>
      <div className="flex gap-2">
      <Controller 
          name='vehicle.brand'
          control={control}
          render={({field}) => (
            <SelectOption {...field} disabled={disabled} label="Marca" placeholder="Selecione..." options={CAR_BRANDS} onChange={(value) => {
              field.onChange(value)
            }}  />
          )}  
        />
        <Input disabled={disabled} {...register('vehicle.model')} label="Modelo" placeholder="Digite aqui..." />
      </div>
      <div className="flex gap-2">
        <Input disabled={disabled} {...register('vehicle.year')} label="Ano" placeholder="2024"/>
        {/* <Input disabled={disabled} label="Km" {...register('vehicle.km')} placeholder="Digite aqui..."/> */}
        {/* <Input disabled={disabled} label="Chassi" {...register('vehicle.chassi')} placeholder="Ex: 1HGCM82633A123456" /> */}
        <Controller
          name="vehicle.fuel"
          control={control}
          render={({field}) => (
            <SelectOption {...field} disabled={disabled} label="Combustível" placeholder="Selecione..." options={CAR_FUELS} onChange={(value) => {
              field.onChange(value)
            }} />
          )}
        />
      </div>
      {/* <SheetFooter className="mt-4 justify-between">
        {!(data?.id) && <Button type="submit" disabled={false}>Salvar</Button>}
        {data?.plate && <ConfirmButton
            onConfirm={() => handleOnDelete()}
            variant={"destructive"}
            disabled={isPending}
            title="Remover veículo"
            message="Deseja realmente remover o veículo desse orçamento?">
              Remover
          </ConfirmButton>}
      </SheetFooter> */}
    </div>
  )
}
