import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Logo from "@/../public/assets/svg/logo";
// import logo from "/assets/app-logo.png"

const MenuNavLinkVariant = cva('flex items-center gap-2 w-[160px] p-3 rounded-xl text-sm transition hover:bg-zinc-200 hover:text-black', {
    variants: {
        isActive: {
            true: 'font-bold text-white text-black',
            false: 'text-zinc-500'
        }
    },
    defaultVariants: {
        isActive: false
    }
})
// [&_svg]:text-highlight 
interface MenuProps {
    links: { path: string, label:string, icon?:ReactElement }[]
}

const Menu = ({links}: MenuProps) => {
  return (
    <nav className="select-none flex flex-col items-center justify-center py-8">
        <Logo/>
        <ol className="flex-1 my-6 px-4 mt-8 flex flex-col gap-1">
            {links.map(({path, label, icon}) => (
                <NavLink key={path} to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                    {icon}
                    {label}
                </NavLink>
            ))}
        </ol>
        <Button variant={"link"} className="bg-transparent text-zinc-100">
            <LogOut size={25} className="pr-2"/> Sair
        </Button>
    </nav>
  );
};

export default Menu;
