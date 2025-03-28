"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode, useEffect, useState } from "react";
import Loader from "../loader/loader";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setIsLoading(false)
  },[])
  return (
    <SessionProvider>
      {isLoading ? <Loader/> : children}
      {/* {children} */}
        <Toaster />
    </SessionProvider>
  );
};

export default Providers;
