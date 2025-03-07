"use client"

import { useReducer, useCallback, useMemo } from "react"
import { Problem, useGetAllProblemsQuery } from "@/store/queries/problem"
import type { SortingState, ColumnFiltersState, VisibilityState, PaginationState } from "@tanstack/react-table"
import debounce from "lodash/debounce"
import { initialState, TableAction, tableReducer } from "@/types/data-table-state"

export function useDataTable() {
    const [state, dispatch] = useReducer(tableReducer, initialState)
  
    const debouncedDispatch = useMemo(
      () =>
        debounce((action: TableAction) => {
          dispatch(action)
        }, 300),
      [],
    )
  
    const setGlobalFilter = useCallback(
      (value: string) => {
        debouncedDispatch({ type: "SET_GLOBAL_FILTER", payload: value })
      },
      [debouncedDispatch],
    )
  
    const setSorting = useCallback(
      (updater: SortingState | ((old: SortingState) => SortingState)) => {
        dispatch({ type: "SET_SORTING", payload: updater instanceof Function ? updater(state.sorting) : updater })
      },
      [state.sorting],
    )
  
    const setColumnFilters = useCallback(
      (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
        dispatch({
          type: "SET_COLUMN_FILTERS",
          payload: updater instanceof Function ? updater(state.columnFilters) : updater,
        })
      },
      [state.columnFilters],
    )
  
    const setColumnVisibility = useCallback(
      (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
        dispatch({
          type: "SET_COLUMN_VISIBILITY",
          payload: updater instanceof Function ? updater(state.columnVisibility) : updater,
        })
      },
      [state.columnVisibility],
    )
  
    const setRowSelection = useCallback(
      (updater: Record<string, boolean> | ((old: Record<string, boolean>) => Record<string, boolean>)) => {
        dispatch({
          type: "SET_ROW_SELECTION",
          payload: updater instanceof Function ? updater(state.rowSelection) : updater,
        })
      },
      [state.rowSelection],
    )
  
    const setPagination = useCallback(
      (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
        dispatch({ type: "SET_PAGINATION", payload: updater instanceof Function ? updater(state.pagination) : updater })
      },
      [state.pagination],
    )
  
    const resetFilters = useCallback(() => {
      dispatch({ type: "RESET_FILTERS" })
    }, [])
  
    const clearFilter = useCallback(
      (id: string) => {
        setColumnFilters((prev) => prev.filter((filter) => filter.id !== id))
      },
      [setColumnFilters],
    )
  
    const clearSort = useCallback(() => {
      setSorting([])
    }, [setSorting])
  
    const { data, isLoading, isFetching } = useGetAllProblemsQuery({
      pageSize: state.pagination.pageSize,
      pageIndex: state.pagination.pageIndex,
      globalFilter: state.globalFilter,
      sorting: state.sorting,
      filters: state.columnFilters,
    })
  
    const tableData = useMemo(() => data?.result?.items || [], [data]) as Problem[]
  
    const pageCount = useMemo(() => {
      return Math.ceil((data?.result?.total || 0) / state.pagination.pageSize)
    }, [data, state.pagination.pageSize])
  
    return {
      state,
      setSorting,
      setColumnFilters,
      setColumnVisibility,
      setRowSelection,
      setPagination,
      setGlobalFilter,
      resetFilters,
      clearFilter,
      clearSort,
      tableData,
      pageCount,
      isLoading,
      isFetching,
    }
  }
