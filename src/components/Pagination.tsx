"use client";
import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";

type Props = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(_, p) => onChange(p)}
        color="primary"
      />
    </Box>
  );
}
