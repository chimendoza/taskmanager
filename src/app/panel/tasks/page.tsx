"use client"
import TaskManager from "@/components/TaskManager";
import Container from "@/components/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTasks,setLoading } from "@/store/tasksSlice";
import { endpoints } from "@/constants/endpoints";
import api from "@/util/api";
import { Task } from "@/types/Task";





export default function TasksPage(){


    const dispatch = useDispatch();
    
    
  const fetchTasks = async () => {
    
    try {
      const { data } = await api.get<Task[]>(endpoints.tasks);
      dispatch(setTasks(data));
    } catch (err: any) {
      console.error("Error cargando tareas:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchTasks();
  }, []);


    return <Container title="Administrar tareas">

    
                <TaskManager/>
        
            </Container>

}