"use client"

import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPending } from "@/store/tasksSlice";
import api from "@/util/api";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { endpoints } from "@/constants/endpoints";


export default function TopBar(){



        const [visible,setVisible]=useState(false);

        const router=useRouter();
        
        const pending = useSelector((state: RootState) => state.tasks.pending);
        const dispatch = useDispatch();
        


    useEffect(() => {
        const fetchCount = async () => {
            const res = await api.get(endpoints.pending_tasks);
            const pending=res.data.pending;
            
            dispatch(setPending(pending));
        };

        fetchCount();
    }, []);



    const logout=()=>{


        api.post(endpoints.logout).then(()=>{


            router.push(routes.login);

        })


    }



    return <div className="bg-white mb-2 p-2 gap-3 flex justify-center items-center">

                <span className="ml-auto">Tareas pendientes {pending}</span>

                <div className="relative">

                    <button onClick={()=>{setVisible(!visible)}} className="bg-yellow-500 p-1 rounded-full text-white">
                        <Icon className="text-[30px]" icon="tabler:mood-smile"></Icon>
                    </button>

                    <div className={clsx('bg-white shadow-lg absolute right-0',!visible?'hidden':'')}>
                        <button onClick={()=>{logout()}} className="px-5 py-2">Logout</button>

                    </div>
                </div>

          </div>



}