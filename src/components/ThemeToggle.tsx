// src/components/ThemeToggle.tsx
"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from "./ThemeProviderWrapper";

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={toggle} aria-label="toggle theme">
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
