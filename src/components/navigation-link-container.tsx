import { siteConfig } from "@/config/site";
import Link from "next/link";

export const NavigationLinks = async () => {
    return (
        <ul className="hidden items-center gap-x-4 md:flex">
            {siteConfig.mainNav.map((link) => {
                // if (link.is_auth) return false
                if (!link.is_visible) return false
                if (link.isDisabled) return (
                    <li key={link.name}>
                        <span className="font-semibold transition-colors duration-300 transform  text-gray-500 cursor-not-allowed">{link.name}</span>
                    </li>
                )
                return (
                    <li
                        key={link.name}
                    >
                        <Link className="font-semibold transition-colors duration-300 transform  text-blue-500" href={link.url}>{link.name}</Link>
                    </li>
                )
            })}
        </ul>
    )
};
