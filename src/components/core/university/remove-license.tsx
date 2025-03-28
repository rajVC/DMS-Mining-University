import React from 'react'
import Popup from '@/components/core/popup'
import { Crown, OctagonMinus } from 'lucide-react'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useUniversityActions } from '@/hooks/use-university-action'
import { FIELD_PARAMS } from '@/constant/params'
import { TableDataProps } from '@/data/table/table-columns'

/* eslint-disable @typescript-eslint/no-explicit-any */
const RemoveLicensePupup = (userData: Partial<TableDataProps>) => {
    
    const [isOpen, setIsOpen] = React.useState(false)
    const { assignLicense, removeLicense } = useUniversityActions()
    return (
        <Popup
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={userData[FIELD_PARAMS.ASSIGN_LICENSE] ? <Button variant={"ghost"} onClick={() => setIsOpen(true)} className="p-2 w-full flex gap-3 justify-start items-center"> <OctagonMinus size={16} />Remove License</Button> :
                <Button variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center" onClick={() => setIsOpen(true)}> <Crown size={16} />Assign License</Button>}
            title="Confirmation"
            footer={<>
                <Button onClick={() => setIsOpen(false)} variant={"secondary"}>No</Button>
                <DialogClose asChild>
                    <Button onClick={() => userData[FIELD_PARAMS.ASSIGN_LICENSE] ? removeLicense(userData[FIELD_PARAMS.LICENSE_NUMBER]) : assignLicense(userData.id)}>Yes</Button>
                </DialogClose>
            </>
            }

        >
            {userData[FIELD_PARAMS.ASSIGN_LICENSE] ? `Are you sure want to de-assign the licence “${userData[FIELD_PARAMS.LICENSE_NUMBER]}”` :
                `Are you sure want to assign the licence`}
        </Popup>
    )
}

export default RemoveLicensePupup