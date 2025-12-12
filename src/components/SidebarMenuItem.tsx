import React from "react";
import { Icon } from "@iconify/react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import clsx from "clsx";

interface MenuItemProps{
    children:React.ReactNode,
    icon:String,
    route:Url,
    className?:string

}

export default function ({children,icon="",route="",className=""}:MenuItemProps){

    return <>
                <Link className={clsx(className,'p-3 text-violet-500 hover:bg-slate-100')} href={route}><Icon className="inline relative top-[-2px]" icon={`tabler:${icon}`}/> {children}</Link>
           </>
}