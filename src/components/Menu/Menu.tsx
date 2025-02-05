import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "@/../public/assets/svg/logo";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import { useAuthContext } from "@/hooks/useAuth";
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
    const { logout } = useAuthContext()
    return (
        <nav className="select-none flex items-center gap-4 justify-center px-8 pt-6  md:flex-col md:py-8 md:px-0">
            <Logo/>
            <ol className="flex-1 px-4 flex gap-1 items-center md:flex-col">
                {links.map(({path, label, icon}) => (
                    <NavLink key={path} to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                        {icon}
                        {label}
                    </NavLink>
                ))}
            </ol>
            <ConfirmButton 
                variant={"link"}
                title={"Deseja realmente sair?"}
                className="text-zinc-400 hover:text-red-500"
                onConfirm={() => logout()}>
                <LogOut size={25} className="pr-2"/> Sair
            </ConfirmButton>
        </nav>
    );
};

export default Menu;