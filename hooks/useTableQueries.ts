import { useCallback } from "react";
import { useRouter } from "next-nprogress-bar";
import _ from "lodash";
import dayjs from "dayjs";

import { generateQueryString } from "@/utils/queryString";

const useTableQueries = () => {
  const router = useRouter();

  const handleChangePage = useCallback(
    _.debounce((value: number) => {
      router.push(
        generateQueryString({
          page: `${value}`,
        }),
      );
    }, 300),
    [],
  );

  const handleSearch = useCallback(
    _.debounce((value: string) => {
      router.push(generateQueryString({ search: `${value}`, page: "1" }));
    }, 300),
    [],
  );

  const handleFilter = useCallback(
    _.debounce((filters: Record<string, string>) => {
      router.push(
        generateQueryString({
          ...filters,
          page: "1",
        }),
      );
    }, 300),
    [],
  );

  const handleFilterMultiple = useCallback(
    _.debounce((filters: Record<string, string>) => {
      router.push(
        generateQueryString({
          ...filters,
          page: "1",
        }),
      );
    }, 300),
    [],
  );

  const handleFilterDate = useCallback(
    _.debounce((e: any) => {
      router.push(
        generateQueryString({
          date: `${
            e
              ? JSON.stringify({
                  $gte: dayjs(e?.start).format(),
                  $lte: dayjs(e?.end).format(),
                })
              : ""
          }`,
          page: "1",
        }),
      );
    }, 300),
    [],
  );

  const handleChangeLimit = useCallback(
    _.debounce((value: number) => {
      router.push(
        generateQueryString({
          limit: `${value}`,
          page: "1",
        }),
      );
    }, 300),
    [],
  );
  return {
    handleSearch,
    handleFilter,
    handleFilterDate,
    handleChangePage,
    handleChangeLimit,
  };
};
export default useTableQueries;
