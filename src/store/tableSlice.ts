import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SAMPLE_DATA, Row } from "../data/sampleData";

type SortState = { column: string | null; direction: 'asc' | 'desc' | null };

type TableState = {
  rows: Row[];
  visibleColumns: string[];
  allColumns: string[];
  sort: SortState;
  search: string;
};

const defaultColumns = ['Name', 'Email', 'Age', 'Role'];

const persistedVisible = typeof window !== 'undefined'
  ? (localStorage.getItem('visibleColumns') ? JSON.parse(localStorage.getItem('visibleColumns')!) : null)
  : null;

const initialState: TableState = {
  rows: SAMPLE_DATA,
  visibleColumns: persistedVisible || defaultColumns,
  allColumns: Array.from(new Set([...defaultColumns, 'Department', 'Location'])),
  sort: { column: null, direction: null },
  search: ''
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload;
    },
    addRows(state, action: PayloadAction<Row[]>) {
      state.rows = [...state.rows, ...action.payload];
    },
    updateRow(state, action: PayloadAction<Row>) {
      state.rows = state.rows.map(r => r.id === action.payload.id ? action.payload : r);
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter(r => r.id !== action.payload);
    },
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visibleColumns = action.payload;
      if (typeof window !== 'undefined') localStorage.setItem('visibleColumns', JSON.stringify(action.payload));
    },
    toggleColumn(state, action: PayloadAction<string>) {
      const c = action.payload;
      if (state.visibleColumns.includes(c)) state.visibleColumns = state.visibleColumns.filter(x => x !== c);
      else state.visibleColumns = [...state.visibleColumns, c];
      if (typeof window !== 'undefined') localStorage.setItem('visibleColumns', JSON.stringify(state.visibleColumns));
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    reset(state) {
      state.rows = SAMPLE_DATA;
      state.visibleColumns = defaultColumns;
      state.sort = { column: null, direction: null };
      if (typeof window !== 'undefined') localStorage.removeItem('visibleColumns');
    }
  }
});

export const {
  setRows, addRows, updateRow, deleteRow, setVisibleColumns, toggleColumn, setSort, setSearch, reset
} = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
