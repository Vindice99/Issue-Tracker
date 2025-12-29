'use client'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import axios from 'axios';


const DeleteButton = ({ id }: { id: number }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <Button
                    size="2"
                    color="red"
                    variant="soft"
                >
                    <TrashIcon width="16" height="16" />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50"
                />
                <AlertDialog.Content
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg sm:rounded-xl"
                >
                    <div className="flex flex-col space-y-2 text-center sm:text-left">
                        <AlertDialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Delete Issue
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-sm text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete this issue? This action cannot be undone and will permanently remove the issue from the database.
                        </AlertDialog.Description>
                    </div>
                    <div className="flex justify-end gap-[25px] mt-3">
                        <AlertDialog.Cancel asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-gray-200 dark:bg-gray-700 px-[15px] font-medium leading-none text-gray-700 dark:text-gray-300 outline-none outline-offset-1 hover:bg-gray-300 dark:hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-gray-400 select-none">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button className="inline-flex h-[35px] items-center justify-center 
                            rounded bg-red-500 px-[15px] font-medium leading-none 
                            text-white outline-none outline-offset-1 
                            hover:bg-red-600 focus-visible:outline-2 
                            focus-visible:outline-red-400 select-none"
                            onClick = {async () => {
                                await axios.delete(`/api/issue/${id}`)
                                router.push('/issues')
                            }}
                            >
                                Yes, Delete
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}
export default DeleteButton