"use client"
import clsx from "clsx"
import SidebarMenuItem from "./SidebarMenuItem"
import { routes } from "@/constants/routes"


interface SidebarProps{
    className?:string,
}




export default function Sidebar({className=""}:SidebarProps){

    
    return <div className={clsx(className)}>


          <span className="block p-5 font-bold text-lg">Administrador de tareas</span>
          <div className={clsx('sidebar bg-white-500 flex flex-col gap-2')}>

            <SidebarMenuItem icon="home" route={routes.dashboard}>Inicio</SidebarMenuItem>
            <SidebarMenuItem icon="checkup-list" route={routes.tasks}>Tareas</SidebarMenuItem>
            <SidebarMenuItem icon="users" route={routes.users}>Usuarios</SidebarMenuItem>
                
          </div>
            
          </div>
    

}