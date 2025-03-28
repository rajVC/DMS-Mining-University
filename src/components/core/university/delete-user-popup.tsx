import React from 'react'
import Popup from '@/components/core/popup'
import { LoaderCircle, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useUniversityActions } from '@/hooks/use-university-action'
import { useRouter } from 'next/navigation'

const DeleteStudentPopup = ({ id }: { id: number }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false);
    const { deleteStudent } = useUniversityActions()
    const router = useRouter()
    const deleteStudentAction = async (id: number) => {
        try {
            setIsLoading(true);
            await deleteStudent(id)
            router.refresh();
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <Popup
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<Button variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center" onClick={() => setIsOpen(true)}> <Trash size={16} />Delete student</Button>}
            title="Delete student"
            footer={<>
                <Button onClick={() => setIsOpen(false)} variant={"secondary"}>No</Button>
                <Button type="submit" onClick={() => { deleteStudentAction(id) }} disabled={isLoading}>
                    {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Yes
                </Button>
            </>
            }

        >
            Are you sure want to delete this student ?
        </Popup>
    )
}

export default DeleteStudentPopup