'use client';
import { addProductAction } from "@/action/product";
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
import { productSchema } from "@/lib/validations/product";
import { WishList } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as z from "zod";

interface AddProductProps extends PropsWithChildren {
    wishlist?: WishList,
    children?: React.ReactNode
}

const AddProduct = ({ wishlist, children }: AddProductProps) => {
    const [open, setOpen] = useState(false);
    // const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    })

    // function onSubmit(event: React.SyntheticEvent) {
    //     event.preventDefault()
    //     setIsLoading(true)

    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 3000)
    // }

    function onSubmit(data: z.infer<typeof productSchema>) {
        toast.promise(addProductAction({
            ...data,
            wishlist_code: wishlist?.wishlist_code,
            null: null
        }), {
            loading: 'Loading...',
            success: async (res) => {
                setOpen(false);
                form.reset();
                return `${data.product_name} has been added`;
            },
            error: (_) => {
                setOpen(true);
                return `Failed to add product ${data.product_name}`;
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
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>
                        Add a new product here click save when done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="product_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ridge Wallet" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
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
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="300" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control} name="wishlist" render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Wishlist</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? wishlists?.find(
                                                            (wishlist) => wishlist.wishlist_code === field.value
                                                        )?.name
                                                        : "Select Course Type"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search Course Type..." />
                                                <CommandEmpty>No course type found.</CommandEmpty>
                                                <CommandGroup>
                                                    {wishlists?.map((wishlist) => (
                                                        <CommandItem
                                                            value={wishlist.wishlist_code}
                                                            key={wishlist.wishlist_code}
                                                            onSelect={() => {
                                                                form.setValue("wishlist", wishlist.wishlist_code)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    wishlist.wishlist_code === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {wishlist.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} /> */}
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
export default AddProduct;