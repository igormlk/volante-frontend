import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


interface ConfirmButtonProps{
    title?: string,
    message?: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    onConfirm: () => void,
    className?: string,
    disabled?: boolean,
    children: ReactNode | string
}

export default function ConfirmButton({title, message, children, onConfirm, variant, disabled, className}: ConfirmButtonProps) {
    const [isPopoverOpen, setPopoverOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setPopoverOpen(false);
    };

    return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
            <Button type="button" className={className} variant={variant} disabled={disabled}>{children}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[160px]">
            <div className="space-y-2">
                {title && <h4 className="font-medium text-sm leading-none">{title}</h4>}
                {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </div>
            <div className={"flex justify-end mt-4"}>
                <Button size={"sm"} onClick={handleConfirm}>Sim</Button>
            </div>
        </PopoverContent>
    </Popover>
    )
}
