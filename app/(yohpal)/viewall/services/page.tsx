import ViewAllServices from "../viewall_services";
import { CATEGORY_FILTERS, type CategoryFilter } from "@/constants/hustle-categories";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialFilter: CategoryFilter =
    CATEGORY_FILTERS.includes(category as CategoryFilter)
      ? (category as CategoryFilter)
      : "All";
  return <ViewAllServices initialFilter={initialFilter} />;
}
