// src/components/ImportExport.tsx
"use client";

import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { addRows } from "../store/tableSlice";
import { RootState } from "../store";
import { saveAs } from "file-saver";
import { Row } from "../data/sampleData";
import { v4 as uuidv4 } from "uuid";

export default function ImportExport() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const visible = useSelector((s: RootState) => s.table.visibleColumns);
  const rows = useSelector((s: RootState) => s.table.rows);

  function handleImportClick() {
    fileRef.current?.click();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        const parsed = results.data as any[];
        const valid: Row[] = [];
        const errors: string[] = [];
        parsed.forEach((r, idx) => {
          if (!r.Name || !r.Email) {
            errors.push(`Row ${idx + 1}: missing Name or Email`);
            return;
          }
          valid.push({
            id: uuidv4(),
            Name: r.Name,
            Email: r.Email,
            Age: r.Age ? Number(r.Age) : 0,
            Role: r.Role || '',
            Department: r.Department || '',
            Location: r.Location || ''
          });
        });
        if (errors.length) {
          alert('Import errors:\n' + errors.slice(0,5).join('\n'));
        }
        if (valid.length) {
          dispatch(addRows(valid));
          alert(`Imported ${valid.length} row(s).`);
        }
      },
      error: (err: Papa.ParseError) => {
        alert('CSV parse error: ' + err.message);
      }
    });
    e.currentTarget.value = '';
  }

  function handleExport() {
    const csvRows: any[] = rows.map(r => {
      const obj: any = {};
      visible.forEach(k => {
        obj[k] = (r as any)[k] ?? '';
      });
      return obj;
    });
    const csv = Papa.unparse(csvRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  }

  return (
    <Box component="span" sx={{ display: 'inline-flex', gap: 1 }}>
      <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFile} />
      <Button variant="contained" onClick={handleImportClick}>Import CSV</Button>
      <Button variant="contained" color="secondary" onClick={handleExport}>Export CSV</Button>
    </Box>
  );
}
