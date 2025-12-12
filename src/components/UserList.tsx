"use client"
import api from "@/util/api";
import { useEffect,useState,useMemo } from "react";
import { User } from "@/types/User";
import { endpoints } from "@/constants/endpoints";
import Input from "./Input";
import Button from "./Button";


import { Icon } from "@iconify/react";

export default function UserList(){


    const [users,setUsers]=useState<User[]>([]);

    const [searchKey,setSearchKey]=useState("");


    const searchUsers=()=>{
        loadUsers(searchKey);
    }


    const resetSearch=()=>{
        setSearchKey("")
        loadUsers("");
    }

    const loadUsers=(name?:string)=>{

        const endpoint=name?endpoints.users.concat(`?name=${name}`):endpoints.users;

        api.get(endpoint).then((e)=>{

            
            setUsers(e.data);

        })

    }


    const showClearButton=useMemo(()=>{
        return searchKey.length>0
    },[searchKey])



    useEffect(()=>{
        loadUsers();

    },[])

    return <>
            <div className="searchbar flex">

                <div className="relative">
                    <Input onChange={(e)=>{setSearchKey(e.target.value)}} type="text" placeholder="Buscar por nombre" value={searchKey}/>
                    {showClearButton && <button onClick={()=>{resetSearch()}} className="absolute cursor-pointer text-lg top-3 right-3"><Icon icon="tabler:square-rounded-x"/></button>}
                </div>

                <Button onClick={()=>{searchUsers()}}>Buscar</Button>

            
            </div>

            <div className="search-results p-10 border border-1 border-cyan-200 mt-10">
                <h3>Listando usuarios</h3>
                <div className="userslist flex flex-col gap-2">
                    {
                        users.map((user:User)=>{

                            return <div className="p-2 border border-slate-200" key={user.id}>{user.name}</div>
                        })
                    }
                </div>
            </div>
    
           </>

}