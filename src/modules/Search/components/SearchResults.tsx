import { PersonNode } from "@/types/persons";
import { memo } from "react";

const SearchResultsComponent: React.FC<{ results?: PersonNode[] }> = ({
  results,
}) => {
  if (!results || results.length === 0) {
    return null;
  }
  return (
    <section className="absolute top-full left-0 z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-md border border-gray-700 bg-white p-4 shadow-lg shadow-gray-500">
      {results.map((person) => (
        <p key={person.id} className="border-b border-gray-700 p-2">
          <strong className="flex justify-between font-semibold">
            <b>{person.name}</b>{" "}
            <span className="text-gray-400">Status: {person.statusCode}</span>
          </strong>
          <small className="block text-sm text-gray-300">{person.rank}</small>
        </p>
      ))}
    </section>
  );
};
export const SearchResults = memo(SearchResultsComponent);
