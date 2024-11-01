import { cn } from "@/lib/utils"
import { forwardRef, TextareaHTMLAttributes } from "react"

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(({ label, className, ...props }, ref) => {
  return (
    <>
      {label && <span className="text-sm font-medium m-0 p-0">{label}</span>}
      <textarea ref={ref} className={cn("border m-0 p-2 rounded", className)} {...props} />
    </>
  )
});

export default Textarea;