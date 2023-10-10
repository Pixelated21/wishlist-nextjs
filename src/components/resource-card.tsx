import Link from "next/link";

interface ResourceCardProps {
    name: string;
    secondaryText: string;
}

const ResourceCard = () => {
    return (
        <div className="block rounded-lg hover:bg-gray-100 transition ease-in-out duration-300">
            <div style={{ backgroundImage: '' }} className="flex justify-center items-center h-56 w-full rounded-md bg-gray-300 hover:bg-slate-200 transition ease-in-out duration-1000">
                <h4 className="text-gray-500 text-2xl font-semibold">No Wishes Yet</h4>
            </div>
            <div className="mt-2">
                <div className="font-semibold"> Wedding wishlist
                </div>
                <div className="text-sm text-gray-500">0 Wishes
                </div>
            </div>
        </div>
    )
}

export default ResourceCard;

