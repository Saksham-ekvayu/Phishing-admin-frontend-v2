"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "plugin",
    title: "Plugin",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "available-license",
        title: "Available license",
        icon: <DescriptionIcon />,
      },
      {
        segment: "agent-installed",
        title: "Agent installed",
        icon: <DescriptionIcon />,
      },
      {
        segment: "allocated-license",
        title: "Allocated license",
        icon: <DescriptionIcon />,
      },
      {
        segment: "all-license-report",
        title: "All license report",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "phishing-mails",
    title: "Phishing mails",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "disputes",
    title: "Disputes",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "report",
    title: "Report",
    icon: <BarChartIcon />,
  },
  {
    segment: "sandbox",
    title: "Sandbox",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "running-sandbox",
        title: "Running Sandbox",
        icon: <DescriptionIcon />,
      },
      {
        segment: "completed-sandbox",
        title: "Completed Sandbox",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "quarantine",
    title: "Quarantine",
    icon: <LayersIcon />,
  },
  {
    segment: "rogueDB",
    title: "RogueDB",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "urls",
        title: "Urls",
        icon: <DescriptionIcon />,
      },
      {
        segment: "domains",
        title: "Domains",
        icon: <DescriptionIcon />,
      },
      {
        segment: "mails",
        title: "Mails",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "logs-report",
    title: "Logs report",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "exception-logs",
        title: "Exception Logs",
        icon: <DescriptionIcon />,
      },
      {
        segment: "error-logs",
        title: "Error Logs",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <LayersIcon />,
  },
];

// Create a basic theme without color scheme settings
const initialTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
      lgplus: 1400,
      sd: 1800,
      xxl: 2100,
    },
  },
  // Add the missing required properties
  navigationBar: {
    text: "",
    width: 0,
    background: "",
    hover: {
      background: "",
    },
    active: {
      color: "",
      background: "",
    },
    scrollbar: {
      shadow: "",
      thumb: {
        color: "",
        outline: "",
      },
    },
  },
  loader: {
    primary: "",
    secondary: "",
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  // Use state for theme to avoid hydration mismatch
  const [theme, setTheme] = useState(initialTheme);

  // Apply color scheme after component mounts to avoid hydration issues
  useEffect(() => {
    // Now it's safe to create a theme with color scheme
    const fullTheme = createTheme({
      cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
      },
      colorSchemes: { light: true, dark: true },
      breakpoints: initialTheme.breakpoints,
      // Add the missing required properties
      navigationBar: initialTheme.navigationBar,
      loader: initialTheme.loader,
    });

    setTheme(fullTheme);
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
