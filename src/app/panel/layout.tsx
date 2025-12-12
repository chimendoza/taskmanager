"use client"
import { Provider } from "react-redux";
import { store } from "@/store";

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import React from "react";




export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return <React.Fragment>

        <Provider store={store}>
          <section className="flex bg-slate-100 h-screen">

            
              <Sidebar className="bg-white w-2/10"/>

              <div className="w-8/10">
                <TopBar/>
                <div className="p-10 ">

                {children}    
                </div>
              </div>
              
          </section>
        </Provider>
        </React.Fragment>
}