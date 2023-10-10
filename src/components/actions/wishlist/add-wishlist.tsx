'use client';
import { addWishListAction } from "@/action/wishlist";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddProductFormSchema } from "@/lib/schema/product";
import { AddWishListFormSchema } from "@/lib/schema/wishlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as z from "zod";

interface AddWishlistProps extends PropsWithChildren { }

const AddWishlist = (props: AddWishlistProps) => {
    const { children } = props;
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof AddWishListFormSchema>>({
        resolver: zodResolver(AddWishListFormSchema),
    })

    function onSubmit(data: z.infer<typeof AddWishListFormSchema>) {
        toast.promise(addWishListAction(data), {
            loading: 'Loading...',
            success: async (res) => {
                setOpen(false);
                form.reset();
                return `${data.wishlist_name} has been added`;
            },
            error: (_) => {
                setOpen(true);
                return `Failed to add product ${data.wishlist_name}`;
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Wishlist</DialogTitle>
                    <DialogDescription>
                        Add a new wishlist here click save when done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="wishlist_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wishlist Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Christmas List" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wishlist_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your message here." id="message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button variant={'secondary'} onClick={() => setOpen(false)} type="button">Cancel</Button>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
export default AddWishlist;