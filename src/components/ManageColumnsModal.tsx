// src/components/ManageColumnsModal.tsx
"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, DialogActions, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleColumn } from "../store/tableSlice";

export default function ManageColumnsModal() {
  const dispatch = useDispatch();
  const allColumns = useSelector((s: RootState) => s.table.allColumns);
  const visible = useSelector((s: RootState) => s.table.visibleColumns);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mr: 1 }}>
        Manage Columns
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {allColumns.map(col => (
            <div key={col}>
              <FormControlLabel
                control={<Checkbox checked={visible.includes(col)} onChange={() => dispatch(toggleColumn(col))} />}
                label={col}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
