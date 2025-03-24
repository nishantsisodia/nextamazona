import { getAllCategories } from '@/lib/actions/product.actions'
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import data from "@/lib/data";
import Search from "./search";
import Sidebar from "./sidebar";
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from "next-intl/server";


export default async function Header() {
    const categories = await getAllCategories()
    const { site } = await getSetting()
    const t = await getTranslations()
    return (
        <header className="bg-black text-white">
            <div className="px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href={"/"} className="header-button flex items-center font-extrabold text-2xl">
                            <div className="h-12 w-auto overflow-hidden">
                                <Image className="object-cover h-full" src={site.logo} width={60} height={0}  alt={`${site.name} logo`} />
                            </div>
                            {site.name}
                        </Link>
                    </div>

                    <div className="hidden md:block flex-1 max-w-xl">
                        <Search />
                    </div>
                    <Menu />
                </div>
                <div className="md:hidden block py-2">
                    <Search />
                </div>
            </div>
            <div className="flex items-center px-3 mb-[1px] bg-gray-800">
            <Sidebar categories={categories} />
                <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]">

                    {data.headersMenus.map((menu) => (
                        <Link href={menu.href} key={menu.href}   className='header-button !p-2 '>
                           {t('Header.' + menu.name)}
                        </Link>
                    ))}

                </div>

            </div>

        </header>
    )
}