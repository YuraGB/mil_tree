"use client";
import { useSearch } from "./hook/useSearch";
import { SearchResults } from "./components/SearchResults";
import { UnitNode } from "@/types/units";

export const Search = ({ data }: { data: UnitNode }) => {
  const { onSearchChange, results } = useSearch(data);

  return (
    <section className="relative p-4 pl-0">
      <input
        type="search"
        name="Search field"
        onChange={(v) => onSearchChange(v.target.value)}
        placeholder="Search"
        className="w-min-2 w-max-[300px] rounded-md border border-gray-300 p-2"
      />
      <SearchResults results={results} />
    </section>
  );
};
