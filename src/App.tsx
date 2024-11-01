import "./App.css";
import ServiceOrderPage from "@/pages/ServiceOrder/ServiceOrder";
import { Toaster } from "./components/ui/sonner";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { ROUTER_PATHS } from "./routes/routes";
import { Car, FilePlus, FolderSearch, Home, User } from "lucide-react";
import VehiclesPage from "./pages/Vehicles/VehiclesPage";
import CustomersPage from "./pages/Customers/CustomersPage";
// import CatalogPage from "./pages/Catalog/CatalogPage";
// import SquadPage from "./pages/Squad/SquadPage";
// import SupplierPage from "./pages/Supplier/SupplierPage";
import SearchServiceOrdersPage from "./pages/ServiceOrders/ServiceOrdersPage";

const MENU_LINKS = [
  {
    path: ROUTER_PATHS.HOME,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-xl text-center py-[30%]">Volante, você na direção da sua oficina</h1>,
    label: 'Início',
    icon: <Home size={23}/>
  },
  {
    path: ROUTER_PATHS.SERVICE_ORDER + '/new',
    element: <ServiceOrderPage/>,
    label: 'Novo',
    icon: <FilePlus size={23}/>
  },
  {
    path: ROUTER_PATHS.SERVICE_ORDERS,
    element: <SearchServiceOrdersPage/>,
    label: 'Orçamentos',
    icon: <FolderSearch size={23}/>
  },
  {
    path: ROUTER_PATHS.CUSTOMER,
    element: <CustomersPage/>,
    label: 'Clientes',
    icon: <User size={23}/>
  },
  // {
  //   path: ROUTER_PATHS.EMPLOYEE,
  //   element: <SquadPage/>,
  //   label: 'Equipe',
  //   icon: <Users size={23}/>
  // },
  {
    path: ROUTER_PATHS.VEHICLE,
    element: <VehiclesPage/>,
    label: 'Veículos',
    icon: <Car size={23}/>
  },
  // {
  //   path: ROUTER_PATHS.CATALOG,
  //   element: <CatalogPage/>,
  //   label: 'Catálogo',
  //   icon: <Hammer size={23}/>
  // },
  // {
  //   path: ROUTER_PATHS.SUPPLIER,
  //   element: <SupplierPage/>,
  //   label: 'Fornecedores',
  //   icon: <Store size={23}/>
  // },
  // {
  //   path: ROUTER_PATHS.CONFIG,
  //   element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">Ajustes</h1>,
  //   label: 'Ajustes',
  //   icon: <Settings2 size={23}/>
  // }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div className="flex-1 flex bg-zinc-50 divide-x">
        <Menu links={MENU_LINKS}/>
        <div className="rounded p-8 pb-0 flex-1 overflow-scroll">
          <Outlet/>
        </div>
      </div>,
    errorElement: <h1>404 not found page <Link to={"/"}>Voltar</Link></h1>,
    children: [...MENU_LINKS.map(link => ({
      path: link.path,
      element: link.element,
    })), {
      path: `${ROUTER_PATHS.SERVICE_ORDER}/:id`,
      element: <ServiceOrderPage/>
    }]
  }
])

function App() {
  return (
    <div className="bg-zinc-50 flex-1 flex">
      <RouterProvider router={router}/>
      <Toaster position="top-right"  closeButton/>
    </div>
  );
}

export default App;
