import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"


export default function SearchPage({children}: any) {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  )
}

SearchPage.Title = ({children}: {children: string}) => {
    return (
        <h1 className="text-2xl font-bold">{children}</h1>
    )
}

SearchPage.SearchBar = ({className, children,...props}: InputProps) => {
    return (
        <div className='my-4 flex'>
            {children}
            <Input type="text" className={"flex-1 p-6 " + className} {...props} />
        </div>
    )
}

interface LoadMoreProps {
    loading: boolean,
    visible: boolean,
    onClick: () => void,
    children: string
}

SearchPage.LoadMore = ({loading, visible, onClick, children}: LoadMoreProps) => {
    if(!visible){
        return null
    }
    return(
        <div className="flex justify-center p-4">
            <Button  
                loading={loading}
                onClick={onClick} 
                variant={'link'}
                className="text-md">
                {children}
            </Button>
        </div>
    )
}