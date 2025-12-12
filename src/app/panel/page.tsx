"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/store";



import Container from "@/components/Container"
import Card from "@/components/Card"
import { routes } from "@/constants/routes"
import { useRef} from "react";




export default function Dashboard(){


    const pendingTasks = useSelector((state: RootState) => state.tasks.pending);


      


      const loading=useRef(false);

      









    return <Container title="Bienvenido al panel">

                <div className="flex">
                    <Card loading={loading.current} className="" title={`${pendingTasks} Tareas pendientes`} to={routes.tasks} label="Ver todas" icon="checkup-list"/>
                </div>

            </Container>

}