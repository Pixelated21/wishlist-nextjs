"use client"

import type { FileWithPreview, WishList } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    UncontrolledFormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { catchError, isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { addProductAction } from "@/action/product"
import { FileDialog } from "../file-dialog"
import Image from "next/image"
import { Zoom } from "../zoom-image"
import { Icons } from "../icons"

interface AddProductFormProps {
    wishlist: WishList
    children?: React.ReactNode
}

type Inputs = z.infer<typeof productSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddProductForm({ wishlist, children }: AddProductFormProps) {
    const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
    const [open, setOpen] = React.useState(false);

    const [isPending, startTransition] = React.useTransition()

    const { isUploading, startUpload } = useUploadThing("imageUploader")

    const form = useForm<Inputs>({
        resolver: zodResolver(productSchema),
    })

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            try {
                // await checkProductAction({
                //     name: data.product_name,
                // })

                const images = isArrayOfFile(data.images)
                    ? await startUpload(data.images).then((res) => {
                        const formattedImages = res?.map((image) => ({
                            id: image.key,
                            name: image.key.split("_")[1] ?? image.key,
                            url: image.url,
                        }))
                        return formattedImages ?? null
                    })
                    : null

                await addProductAction({
                    ...data,
                    wishlist_code: wishlist?.wishlist_code,
                    images,
                })

                toast.success("Product added successfully.")

                form.reset()
                setFiles(null)
                setOpen(false)
            } catch (err) {
                catchError(err)
            }
        })
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
                        <FormItem className="flex w-full flex-col gap-1.5">
                            <FormLabel>Image</FormLabel>
                            {files?.length ? (
                                <div className="flex items-center gap-2">
                                    {files.map((file, i) => (
                                        <Zoom key={i}>
                                            <Image
                                                src={file.preview}
                                                alt={file.name}
                                                className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                                                width={80}
                                                height={80}
                                            />
                                        </Zoom>
                                    ))}
                                </div>
                            ) : null}
                            <FormControl>
                                <FileDialog
                                    setValue={form.setValue}
                                    name="images"
                                    maxFiles={1}
                                    maxSize={1024 * 1024 * 4}
                                    files={files}
                                    setFiles={setFiles}
                                    isUploading={isUploading}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <UncontrolledFormMessage
                                message={form.formState.errors.images?.message}
                            />
                        </FormItem>
                        <DialogFooter>
                            <Button disabled={isPending} variant={'secondary'} onClick={() => setOpen(false)} type="button">Cancel</Button>
                            <Button
                                onClick={() =>
                                    void form.trigger(["product_name", "description", "price", "images"])
                                }
                                className="w-fit"
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Icons.spinner
                                        className="mr-2 h-4 w-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                Add Product
                                <span className="sr-only">Add Product</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}