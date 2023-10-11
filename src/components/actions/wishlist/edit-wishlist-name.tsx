'use client'

import { editWishListAction } from "@/action/wishlist"
import { Button } from "@/components/ui/button"
import {
    DialogFooter
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { WishList } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCheckIcon, PencilIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRef } from "react"
import { watch } from "fs"
import { EditWishListFormSchema } from "@/lib/validations/wishlist"

interface EditWatchListNameProps {
    className?: string
    wishlist: WishList
}
const EditWatchListName = (props: EditWatchListNameProps) => {
    const { className, wishlist } = props;
    const [isEditing, setIsEditing] = useState(false)
    const wishlistNameForm = useRef<HTMLFormElement>(null)

    const form = useForm<z.infer<typeof EditWishListFormSchema>>({
        resolver: zodResolver(EditWishListFormSchema),
    })


    const triggerSubmit = () => {
        if (wishlistNameForm.current) {
            wishlistNameForm.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            console.log('submit')
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.reset()
        form.setValue('wishlist_name', wishlist.name)
    }

    function onSubmit(data: z.infer<typeof EditWishListFormSchema>) {
        toast.promise(editWishListAction(data, wishlist), {
            loading: 'Loading...',
            success: async (res) => {
                setIsEditing(false);
                form.reset();
                return `${wishlist.name} successfully renamed to ${data.wishlist_name}`;
            },
            error: (_) => {
                setIsEditing(true);
                form.setValue('wishlist_name', wishlist.name)
                return `Failed to rename ${wishlist.name}`;
            },
        });
    }

    return (
        <div className={cn('flex justify-center items-center self-start gap-x-2', className)}>
            {isEditing ? (<>
                <Button onClick={() => handleCancel()} variant={'outline'} size={'icon'}>
                    <XIcon className="h-5 w-5" />
                </Button>
                <Button onClick={() => triggerSubmit()} variant={'outline'} size={'icon'}>
                    <CheckCheckIcon className="h-5 w-5" />
                </Button>
            </>
            ) : (<Button onClick={() => setIsEditing((prev) => !prev)} variant={'outline'} className="" size={'icon'}>
                <PencilIcon className="h-5 w-5 text-gray-600" />
            </Button>)
            }
            {isEditing ? (
                <Form {...form}>
                    <form ref={wishlistNameForm} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="wishlist_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormMessage />
                                    <FormControl>
                                        <Input disabled={!isEditing} placeholder="Ridge Wallet" {...field} defaultValue={wishlist.name} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>

                </Form>
            ) : (<div className="text-2xl font-semibold flex gap-x-2"><span>{wishlist.name}</span></div>)}

        </div >
    )
}

export default EditWatchListName