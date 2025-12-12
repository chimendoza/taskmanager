"use client";

import { useState,useRef } from "react";
import { Task } from "@/types/Task";
import api from "@/util/api";
import { endpoints } from "@/constants/endpoints";
import Button from "./Button";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTasks } from "@/store/tasksSlice";
import { Icon } from "@iconify/react";

export default function TaskManager() {
  
  const [title, setTitle] = useState<any>();
  const [description, setDescription] = useState("");
  
  const working=useRef(false);


  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const dispatch=useDispatch();




  const createTask = async () => {

    
    if (!title) return alert("El título es obligatorio");
    working.current=true;
    try {
      const { data: newTask } = await api.post<Task>("/tasks", {
        title,
        description,
      });

      working.current=false;
      dispatch(setTasks([newTask, ...tasks]));
      setTitle("");
      setDescription("");
    } catch (err: any) {
      alert("Error creando la tarea");
    }
  };

  const toggleStatus = async (task: Task) => {

    working.current=true;
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      const { data: updated } = await api.patch<Task>(endpoints.update_task, {
        id: task.id,
        status: newStatus,
      });
      working.current=false;
      dispatch(setTasks(tasks.map((t) => (t.id === updated.id ? updated : t))));
    } catch (err: any) {
      alert("Error actualizando la tarea");
    }
  };

  const deleteTask = async (task: Task) => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    try {
      working.current=true;
      await api.delete(endpoints.delete_task, { data: { id: task.id } });
      working.current=false;
      dispatch(setTasks(tasks.filter((t) => t.id !== task.id)));
    } catch (err: any) {
      alert("Error eliminando la tarea");
    }
  };

  const Skeleton = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex">
          <span className="inline-block w-2/10 h-10 bg-slate-200 animate-pulse"></span>
        </div>
        <div className="flex gap-3">
          <span className="inline-block w-2/10 h-10 bg-slate-200 animate-pulse"></span>
          <span className="inline-block w-2/10 h-10 bg-slate-200 animate-pulse"></span>
          <span className="inline-block w-2/10 h-10 bg-slate-200 animate-pulse"></span>
        </div>
        <div className="animate-pulse bg-slate-200 h-20"></div>
        <div className="animate-pulse bg-slate-200 h-20"></div>
        <div className="animate-pulse bg-slate-200 h-20"></div>
      </div>
    );
  };

  if (loading) return <Skeleton />;

  return (
    <div>
      <h2 className="text-xl text-slate-500 mb-2">Crear Tarea</h2>
      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 mr-2"
      />
      <Input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 mr-2"
      />
      <Button
        onClick={createTask}
        variant="info"
        disabled={working.current}
      >
        Crear
      </Button>

      <h2 className="text-xl text-slate-500 mt-4 mb-2">Lista de tareas</h2>
      <ul>
        {tasks.map((task) => {


        
        return <li
            key={task.id}
            className="border-slate-300 border-1 p-2 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-black-500">{task.title}</h3>
              <p className="text-slate-800">{task.description}</p>
              <p className="text-sm text-gray-500">Estado: {task.status=='pending'?'Pendiente':'Listo'}</p>
            </div>
            <div className="flex gap-2">

              <button
              onClick={() => toggleStatus(task)}>
                {task.status === "pending"
                  ? <Icon className="text-red-500" icon="tabler:square"/>
                  : <Icon className="text-green-500"  icon="tabler:checkbox" />}</button>
              <button
                onClick={() => deleteTask(task)} 
              >
                <Icon className="text-red-500" icon="tabler:trash"/>
              </button>
            </div>
          </li>
          })}
      </ul>
    </div>
  );
}
