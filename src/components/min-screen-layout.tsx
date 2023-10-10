import { PropsWithChildren } from "react"
import HeaderNavigationBar from "./header-navigation-bar"
import { cn } from "@/lib/utils";


interface MinScreenLayoutProps extends React.HTMLAttributes<HTMLDivElement> { }

const MinScreenLayout = (props: MinScreenLayoutProps) => {
    const { className } = props;
    return (
        <div className={cn('min-h-screen w-full pb-10', className)}>
            <HeaderNavigationBar />
            {props.children}
        </div>
    )
}

export default MinScreenLayout