
import Link from "next/link";
import CartButton from "./cart-button";



const Menu = () => {
    return (
        <div className="flex justify-end">
            <nav className="flex gap-3 w-full border border-black">
                <Link href={"/signin"} className="header-button flex justify-center items-center flex-col">
                    <span className="font-bold text-sm">Hello, Sign in</span>
                </Link>
               <CartButton/>
            </nav>
        </div>
    )
}

export default Menu
