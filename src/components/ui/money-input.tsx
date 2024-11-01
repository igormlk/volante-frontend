import {FormControl,FormField,FormItem,FormLabel,FormMessage} from "../ui/form"; // Shadcn UI import
import { Input } from "../ui/input"; // Shandcn UI Input
import { UseFormReturn } from "react-hook-form";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
};

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput(props: TextInputProps) {
  // Atualiza o valor diretamente com o hook form
  const handleChange = (value: string, onChange: Function) => {
    const digits = value.replace(/\D/g, "");
    const realValue = Number(digits) / 100;

    // Atualiza o valor no formulário
    onChange(realValue);
  };

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        const formattedValue = field.value
          ? moneyFormatter.format(field.value)
          : "";

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                value={formattedValue} // Valor formatado exibido no input
                onChange={(ev) => handleChange(ev.target.value, field.onChange)} // Manipula a formatação
                className={props.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
