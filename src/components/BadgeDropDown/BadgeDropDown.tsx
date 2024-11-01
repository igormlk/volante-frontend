import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { STATUS_SERVICE_ORDER } from "@/pages/ServiceOrder/types";
interface StatusDropDownProps {
    title?: string,
    value: string | undefined,
    disabled?: boolean,
    options: {value: STATUS_SERVICE_ORDER, label: string, color?: string, linked?:STATUS_SERVICE_ORDER[]}[]
    onChange: (value: STATUS_SERVICE_ORDER | string | any) => void
}
export default function StatusDropDown({title, value, options, disabled, onChange}: StatusDropDownProps) {
    const selected = options.find(item => item.value === value)
    const linked = options.filter(({value}) => selected?.linked ? selected?.linked.includes(value) : false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled} className="focus:outline-none">
                <Badge className={`h-8 rounded-full ${selected?.color} focus:border-dashed`}>{selected?.label}</Badge>
            </DropdownMenuTrigger>
            {linked.length > 0 && <DropdownMenuContent side="bottom" align="end">
                {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                    {linked.map(({value, label}) => (
                        <DropdownMenuRadioItem key={value} value={value}>{label}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>}
        </DropdownMenu>
    )
};