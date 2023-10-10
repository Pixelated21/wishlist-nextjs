import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils";

interface ActionBarProps {
    className?: string
}

const ActionBar = (props: ActionBarProps) => {
    const { className } = props;
    return (
        <div className={cn(`container gap-x-2 flex`, className)}>
            <Link href={'/wishlist'} className={buttonVariants()}>
                Add New List
            </Link>
            {/* <Button variant={'outline'}>
            Copy List Link
        </Button> */}
        </div>
    )
}

export default ActionBar