// app/page.tsx (server)
import React from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

const DataTable = dynamic(() => import("../src/components/DataTable"), { ssr: false });
const ManageColumnsModal = dynamic(() => import("../src/components/ManageColumnsModal"), { ssr: false });
const ImportExport = dynamic(() => import("../src/components/ImportExport"), { ssr: false });
const ThemeToggle = dynamic(() => import("../src/components/ThemeToggle"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Dynamic Data Table Manager</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <ThemeToggle />
          <ManageColumnsModal />
          <ImportExport />
        </Box>
      </Box>

      <DataTable />
    </div>
  );
}
