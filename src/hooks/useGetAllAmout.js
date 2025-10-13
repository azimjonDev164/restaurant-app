import useDish from "./useDish";
import useCategory from "./useCategory";
import useMenu from "./useMenu";
import useTable from "./useTable";

export default function useGetAllAmout() {
  const { data: dishes = [] } = useDish();
  const { data: categories = [] } = useCategory();
  const { data: menus = [] } = useMenu();
  const { data: tables = [] } = useTable();

  return {
    dishes: dishes.length,
    categories: categories.length,
    menus: menus.length,
    tables: tables.length,
  };
}
