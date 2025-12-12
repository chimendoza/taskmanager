import clsx from "clsx"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router";
import { Icon } from "@iconify/react";

interface CardProps{

    children?:React.ReactElement
    title:string,
    className:string,
    icon:string,
    label:string,
    to:Url,
    loading:boolean

}


export default function Card({children,title="",className,to,label,loading}:CardProps){


    



    const Skeleton=<div className="w-full bg-slate-300 animate-pulse"></div>;

    if(loading)return Skeleton;


    return <div className={clsx('p-5 border border-1 border-violet-400',className)}>
            <h3>{title}</h3>
            
            <Link className="underline" href={to}>{label}</Link>

          </div>


}