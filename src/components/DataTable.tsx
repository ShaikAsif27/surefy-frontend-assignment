// src/components/DataTable.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSort, updateRow, deleteRow } from "../store/tableSlice";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { Row } from "../data/sampleData";

const PAGE_SIZE = 10;

export default function DataTable() {
  const dispatch = useDispatch();
  const rows = useSelector((s: RootState) => s.table.rows);
  const visible = useSelector((s: RootState) => s.table.visibleColumns);
  const sort = useSelector((s: RootState) => s.table.sort);
  const search = useSelector((s: RootState) => s.table.search);

  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editState, setEditState] = useState<Partial<Row>>({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = rows.filter(r => {
      if (!q) return true;
      return visible.some(col => {
        const val = (r as any)[col];
        return String(val ?? '').toLowerCase().includes(q);
      });
    });
    if (sort.column) {
      list = [...list].sort((a,b) => {
        const A = ((a as any)[sort.column!] ?? '').toString();
        const B = ((b as any)[sort.column!] ?? '').toString();
        if (sort.direction === 'asc') return A.localeCompare(B, undefined, { numeric: true });
        else return B.localeCompare(A, undefined, { numeric: true });
      });
    }
    return list;
  }, [rows, visible, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(col: string) {
    let dir: 'asc' | 'desc' | null = 'asc';
    if (sort.column === col) {
      if (sort.direction === 'asc') dir = 'desc';
      else if (sort.direction === 'desc') dir = null;
      else dir = 'asc';
    }
    dispatch(setSort({ column: dir ? col : null, direction: dir }));
  }

  function onDoubleClickEdit(row: Row) {
    setEditingId(row.id);
    setEditState({ ...row });
  }

  function onSave() {
    if (!editingId) return;
    const age = Number((editState as any).Age);
    if (isNaN(age) || age < 0) {
      alert('Age must be a valid non-negative number');
      return;
    }
    dispatch(updateRow({ ...(editState as Row), id: editingId } as Row));
    setEditingId(null);
    setEditState({});
  }

  function onCancel() {
    setEditingId(null);
    setEditState({});
  }

  return (
    <Box>
      <SearchBar />

      <Table>
        <TableHead>
          <TableRow>
            {visible.map(col => (
              <TableCell key={col}>
                <Box display="flex" alignItems="center">
                  <span style={{ cursor: 'pointer' }} onClick={() => handleSort(col)}>{col}</span>
                  {sort.column === col && sort.direction === 'asc' && <ArrowUpwardIcon fontSize="small" />}
                  {sort.column === col && sort.direction === 'desc' && <ArrowDownwardIcon fontSize="small" />}
                </Box>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {pageRows.map(row => (
            <TableRow key={row.id}>
              {visible.map(col => (
                <TableCell key={col} onDoubleClick={() => onDoubleClickEdit(row)}>
                  {editingId === row.id ? (
                    <input
                      value={String((editState as any)[col] ?? '')}
                      onChange={(e) => setEditState(prev => ({ ...(prev as any), [col]: e.target.value }))}
                      style={{ width: '100%', padding: 6 }}
                    />
                  ) : (
                    String((row as any)[col] ?? '')
                  )}
                </TableCell>
              ))}

              <TableCell>
                {editingId === row.id ? (
                  <>
                    <IconButton onClick={onSave}><SaveIcon /></IconButton>
                    <IconButton onClick={onCancel}><CancelIcon /></IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => onDoubleClickEdit(row)}><EditIcon /></IconButton>
                    <IconButton onClick={() => { if (confirm('Delete row?')) dispatch(deleteRow(row.id)); }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination page={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
      <Box mt={2}>
        <Button variant="outlined" onClick={() => { window.location.reload(); }}>
          Reset (quick)
        </Button>
      </Box>
    </Box>
  );
}
