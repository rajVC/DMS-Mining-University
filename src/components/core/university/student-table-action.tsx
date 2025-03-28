import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, MoreHorizontal } from 'lucide-react'
import React from 'react'
import RemoveLicensePupup from './remove-license'
import DeleteStudentPopup from './delete-user-popup'
import { useRouter } from 'next/navigation'
import { TableDataProps } from '@/data/table/table-columns'

const StudentTableAction = (userData:TableDataProps) => {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Button onClick={() => router.push(`/university/students/view/${userData.id}`)} variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"><Eye size={16} />
                    View
                </Button>
                <RemoveLicensePupup {...userData} />
                <DeleteStudentPopup id={userData.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StudentTableAction