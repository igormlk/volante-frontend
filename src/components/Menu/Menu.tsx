import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
// import Logo from "@/assets/svg/logo";
import logo from "../../icons/app-icon-transparent.png"

const MenuNavLinkVariant = cva('flex items-center gap-2 w-[160px] p-3 rounded-xl text-zinc-400 text-sm transition', {
    variants: {
        isActive: {
            true: 'font-bold [&_svg]:text-highlight text-zinc-900',
            false: 'hover:bg-zinc-200'
        }
    },
    defaultVariants: {
        isActive: false
    }
})

interface MenuProps {
    links: { path: string, label:string, icon?:ReactElement }[]
}

const Menu = ({links}: MenuProps) => {
  return (
    <nav className="select-none flex flex-col items-center justify-center py-8">
        {/* <Logo size={32} color="var(--theme-highlight)"/> */}
        <img src={logo} className="w-[90px] h-[90px]"/>
        <ol className="flex-1 my-6 px-4 mt-8 flex flex-col gap-1">
            {links.map(({path, label, icon}) => (
                <NavLink key={path} to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                    {icon}
                    {label}
                </NavLink>
            ))}
        </ol>
        <Button variant={"link"} className="bg-transparent text-zinc-400">
            <LogOut size={25} className="pr-2"/> Sair
        </Button>
    </nav>
  );
};

export default Menu;
