import type { SortingState, ColumnFiltersState, VisibilityState, PaginationState } from "@tanstack/react-table"

export interface TableState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  globalFilter: string
  rowSelection: Record<string, boolean>
  pagination: PaginationState
}

export type TableAction =
  | { type: "SET_SORTING"; payload: SortingState }
  | { type: "SET_COLUMN_FILTERS"; payload: ColumnFiltersState }
  | { type: "SET_COLUMN_VISIBILITY"; payload: VisibilityState }
  | { type: "SET_GLOBAL_FILTER"; payload: string }
  | { type: "SET_ROW_SELECTION"; payload: Record<string, boolean> }
  | { type: "SET_PAGINATION"; payload: PaginationState }
  | { type: "RESET_FILTERS" }

export const initialState: TableState = {
  sorting: [],
  columnFilters: [],
  columnVisibility: {},
  globalFilter: "",
  rowSelection: {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
}

export function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case "SET_SORTING":
      return { ...state, sorting: action.payload }
    case "SET_COLUMN_FILTERS":
      return { ...state, columnFilters: action.payload }
    case "SET_COLUMN_VISIBILITY":
      return { ...state, columnVisibility: action.payload }
    case "SET_GLOBAL_FILTER":
      return { ...state, globalFilter: action.payload }
    case "SET_ROW_SELECTION":
      return { ...state, rowSelection: action.payload }
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload }
    case "RESET_FILTERS":
      return { ...state, columnFilters: [], globalFilter: "", sorting: [] }
    default:
      return state
  }
}

