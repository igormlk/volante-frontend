import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./label";
import { forwardRef } from "react";

interface SelectOptionProps{
    value?: string,
    placeholder?: string,
    options: {value: string, label: string, color?: string}[],
    className?: string,
    label?: string,
    disabled?: boolean,
    onChange?: (value: any) => void,
    props?: any,
    containerFlex?: string,
}
 
const SelectOption = forwardRef(({value, placeholder,options, className, disabled, label, onChange, containerFlex = '1', props}: SelectOptionProps, ref: any) => {
    return ( 
        <span className={`flex flex-${containerFlex} flex-col`}>
        {label && <Label className={`text-sm mb-1 ${disabled && 'text-muted-foreground'}`}>{label}</Label>}
        <Select disabled={disabled} value={value} {...props} onValueChange={onChange} >
            <SelectTrigger className={className} ref={ref}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
                <SelectGroup>
                    {/* <SelectLabel>Title</SelectLabel> */}
                    {options.map(renderOption)}
                </SelectGroup>
            </SelectContent>
        </Select>
        </span>
     );
})

const renderOption = (option: any) => (
    <SelectItem key={option.value} value={option.value}>
        <span className="flex items-center">
        {option.color && <div className={`w-3 h-3 rounded-full mr-1 ${option.color}`}></div>}
        {option.label}
        </span>
    </SelectItem>
);
 
export default SelectOption;