"use client";
 
 import { Button } from "@/components/ui/button";
 import { Card } from "@/components/ui/card";
 import { AlertOctagon, Home, RefreshCcwIcon } from "lucide-react";
 import { useRouter } from "next/navigation";
 
 export default function Error({
   error,
   reset,
 }: {
   error: Error & { digest?: string };
   reset: () => void;
 }) {
  const router = useRouter()
   return (
     <div className="min-h-screen flex items-center justify-center">
       <Card className="max-w-md w-full bg-white shadow-lg rounded-lg p-5 text-center">
         <AlertOctagon className="mx-auto h-12 w-12 text-red-500" />
         <h1 className="mt-4 text-2xl font-bold text-gray-900">
           {error.message}
         </h1>
         <p className="mt-2 text-md text-gray-600">
           We apologize for the inconvenience. An unexpected error has occurred.
         </p>
         {error.digest && (
           <p className="mt-2 text-sm text-gray-500">Error ID: {error.digest}</p>
         )}
         <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
         <Button
             onClick={() => router.push("/")}
             variant="outline"
             className="flex items-center"
           >
             <Home className="mr-1 h-4 w-4" />
             Go to Home
           </Button>
           <Button
             onClick={reset}
             variant="outline"
             className="flex items-center"
           >
             <RefreshCcwIcon className="mr-1 h-4 w-4" />
             Try again
           </Button>
         </div>
       </Card>
     </div>
   );
 }