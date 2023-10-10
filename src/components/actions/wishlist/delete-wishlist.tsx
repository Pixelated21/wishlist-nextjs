'use client'
import { deleteWishListAction } from "@/action/wishlist"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Product, WishList } from "@/types"
import { useState } from "react"
import { set } from "react-hook-form"
import { toast } from "sonner"
import { redirect } from "next/navigation"


interface RemoveWishlistProps {
    className?: string
    wishlist: WishList
    children: React.ReactNode
}


export function RemoveWishlist(props: RemoveWishlistProps) {
    const { className, wishlist, children } = props
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        toast.promise(deleteWishListAction(wishlist), {
            loading: 'Deleting wishlist...',
            success: async (res) => {
                console.log(await res)
                setOpen(false)
                redirect('/profile')
                return res
            },
            error: (error) => {
                console.log(error)
                setOpen(true)
                return 'Error deleting wishlist'
            }
        })
        console.log('delete')
    }


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleSubmit()} className={buttonVariants({ variant: 'destructive' })}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
