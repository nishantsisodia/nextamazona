import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCategories } from "@/lib/actions/product.actions";
import { getTranslations } from "next-intl/server";
import { getSetting } from "@/lib/actions/setting.actions";

const categories = await getAllCategories();

const Search = async () => {
  const {
    site: { name },
  } = await getSetting();

  const t = await getTranslations();
  return (
    <div>
      <form action="/search" method="GET" className="flex items-stretch h-10">
        <Select name="Catagory">
          <SelectTrigger className="w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  ">
            <SelectValue placeholder={t("Header.All")} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">{t("Header.All")}</SelectItem>
            {categories.map((catagory) => (
              <SelectItem key={catagory} value={catagory}>
                {catagory}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full"
          placeholder={t("Header.Search Site", { name })}
          name="q"
          type="search"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default Search;
