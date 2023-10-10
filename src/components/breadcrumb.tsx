import { BreadcrumbItem } from "@/types";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    breadcrumbs?: BreadcrumbItem[];
}
const Breadcrumb = (props: BreadcrumbProps) => {
    const { breadcrumbs } = props;
    if (!breadcrumbs) return <span aria-hidden />;

    const lastIndex = breadcrumbs.length - 1;

    return (
        <nav className="flex container py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="flex items-center whitespace-nowrap min-w-0 " aria-label="Breadcrumb">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.name} className="text-sm flex items-center gap-x-4" >
                        {
                            breadcrumb.url && (
                                <div className="flex items-center">
                                    <Link href={breadcrumb.url} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                        <span>{breadcrumb.name}</span>
                                    </Link>
                                </div>
                            )
                        }
                        {!breadcrumb.url && (
                            <span className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <span>{breadcrumb.name}</span>
                            </span>)
                        }

                        {index < lastIndex && (<ChevronRightIcon className="h-4 w-4 text-gray-400" />)}
                    </li>
                ))}
            </ol>
        </nav >
    );
};

export default Breadcrumb;