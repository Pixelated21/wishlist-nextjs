import { cn } from "@/lib/utils";

interface ResourceCardProps {
    title: string;
    secondaryText?: string;
    className?: string;
}
const AddResourceCard = (props: ResourceCardProps) => {
    const { title, secondaryText, className } = props;
    return (
        <div className={cn(`block rounded-lg hover:bg-gray-100 transition ease-in-out duration-300`, className)}>
            <div className="flex justify-center items-center h-56 w-full rounded-md bg-gray-300 hover:bg-slate-200 transition ease-in-out duration-1000">
                <svg className="w-12 h-12" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="300" cy="300" r="300" fill="#2563EB" />
                    <path d="M178 299.5H423M300.5 177V422" stroke="white" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <div className="mt-2">
                <div className="font-semibold text-gray-400">
                    {title}
                </div>
            </div>
        </div>
    )
}

export default AddResourceCard;
