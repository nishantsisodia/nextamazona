import { ShoppingCartIcon, User2Icon } from "lucide-react";
import Link from "next/link";



const Menu = () => {
    return (
        <div className="flex justify-end">
            <nav className="flex gap-3 w-full border border-black">
                <Link href={"/signin"} className="header-button flex justify-center items-center flex-col">
                    <span className="font-bold text-sm">Hello, Sign in</span>
                </Link>
                <Link href={"/cart"} className="header-button flex justify-center items-center gap-1">
                    <ShoppingCartIcon className="w-8 h-8" />
                    <span className="font-bold text-sm">Cart</span>
                </Link>
            </nav>
        </div>
    )
}

export default Menu
