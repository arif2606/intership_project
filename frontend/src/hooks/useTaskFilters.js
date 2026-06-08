import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

export const useTaskFilters = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearch = useDebounce(search, 500);

  const filters = useMemo(
    () => ({
      search: debouncedSearch,
      status,
      sortBy,
      sortOrder,
    }),
    [debouncedSearch, status, sortBy, sortOrder],
  );

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return {
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filters,
    resetFilters,
  };
};
