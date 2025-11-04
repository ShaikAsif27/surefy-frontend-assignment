// src/components/SearchBar.tsx
"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSearch } from "../store/tableSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((s: RootState) => s.table.search);

  return (
    <TextField
      size="small"
      placeholder="Global search..."
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      sx={{ mb: 2, width: 320 }}
    />
  );
}
