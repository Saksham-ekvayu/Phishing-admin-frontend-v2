"use client";

import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard"; // For Dashboard
import ExtensionIcon from "@mui/icons-material/Extension"; // For Plugin
import EmailIcon from "@mui/icons-material/Email"; // For Phishing mails
import GavelIcon from "@mui/icons-material/Gavel"; // For Disputes
import AssessmentIcon from "@mui/icons-material/Assessment"; // For Report
import SecurityIcon from "@mui/icons-material/Security"; // For Sandbox
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"; // For Quarantine
import StorageIcon from "@mui/icons-material/Storage"; // For RogueDB
import BugReportIcon from "@mui/icons-material/BugReport"; // For Logs report
import PersonIcon from "@mui/icons-material/Person"; // For Profile
import VpnKeyIcon from "@mui/icons-material/VpnKey"; // For License related items
import ComputerIcon from "@mui/icons-material/Computer"; // For Agent installed
import AssignmentIcon from "@mui/icons-material/Assignment"; // For Reports
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // For Running Sandbox
import DoneIcon from "@mui/icons-material/Done"; // For Completed Sandbox
import LinkIcon from "@mui/icons-material/Link"; // For URLs
import DomainIcon from "@mui/icons-material/Domain"; // For Domains
import MailIcon from "@mui/icons-material/Mail"; // For Mails
import ErrorIcon from "@mui/icons-material/Error"; // For Error logs
import WarningIcon from "@mui/icons-material/Warning"; // For Exception logs
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { usePathname, useRouter } from "next/navigation";
import { AppBar, Box, Chip, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import ekvayu_logo from "@/assets/ekvayu-logo.png";
import UserProfileHeader from "@/components/common/user-profile-header";

const NAVIGATION: Navigation = [
  {
    segment: "admin",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/plugin",
    title: "Plugin",
    icon: <ExtensionIcon />,
    children: [
      {
        segment: "available-license",
        title: "Available license",
        icon: <VpnKeyIcon />,
      },
      {
        segment: "agent-installed",
        title: "Agent installed",
        icon: <ComputerIcon />,
      },
      {
        segment: "allocated-license",
        title: "Allocated license",
        icon: <AssignmentIcon />,
      },
      {
        segment: "all-license-report",
        title: "All license report",
        icon: <AssessmentIcon />,
      },
    ],
  },
  {
    segment: "admin/phishing-mails",
    title: "Phishing mails",
    icon: <EmailIcon />,
  },
  {
    segment: "admin/disputes",
    title: "Disputes",
    icon: <GavelIcon />,
  },
  {
    segment: "admin/report",
    title: "Report",
    icon: <AssessmentIcon />,
  },
  {
    segment: "admin/sandbox",
    title: "Sandbox",
    icon: <SecurityIcon />,
    children: [
      {
        segment: "running-sandbox",
        title: "Running Sandbox",
        icon: <PlayArrowIcon />,
      },
      {
        segment: "completed-sandbox",
        title: "Completed Sandbox",
        icon: <DoneIcon />,
      },
    ],
  },
  {
    segment: "admin/quarantine",
    title: "Quarantine",
    icon: <FolderSpecialIcon />,
  },
  {
    segment: "admin/rogue-db",
    title: "RogueDB",
    icon: <StorageIcon />,
    children: [
      {
        segment: "urls",
        title: "Urls",
        icon: <LinkIcon />,
      },
      {
        segment: "domains",
        title: "Domains",
        icon: <DomainIcon />,
      },
      {
        segment: "mails",
        title: "Mails",
        icon: <MailIcon />,
      },
    ],
  },
  {
    segment: "admin/logs-report",
    title: "Logs report",
    icon: <BugReportIcon />,
    children: [
      {
        segment: "exception-logs",
        title: "Exception Logs",
        icon: <WarningIcon />,
      },
      {
        segment: "error-logs",
        title: "Error Logs",
        icon: <ErrorIcon />,
      },
    ],
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <PersonIcon />,
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

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image src={ekvayu_logo} alt="Ekvayu logo" className="w-8 h-8" />
      <Typography variant="h6">Ekvayu Tech</Typography>
      {/* <Chip size="small" label="BETA" color="info" /> */}
    </Stack>
  );
}

export default function DashboardLayoutBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useDemoRouter("/");
  const router = useRouter();
  const pathname = usePathname();

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
      navigationBar: initialTheme.navigationBar,
      loader: initialTheme.loader,
    });

    setTheme(fullTheme);
  }, []);

  const adaptedRouter = {
    pathname: pathname || "/",
    searchParams: new URLSearchParams(),
    push: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    prefetch: (path: string) => router.prefetch?.(path),
    reload: () => router.refresh?.(),
    navigate: (url: string | URL) => {
      router.push(url.toString());
    },
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={adaptedRouter}
      theme={theme}
      // branding={{
      //   logo: (
      //     <Image src={ekvayu_logo} alt="Ekvayu logo" className="w-10 h-10" />
      //   ),
      //   title: "Ekvayu",
      //   homeUrl: "/",
      // }}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: UserProfileHeader,
          // sidebarFooter: SidebarFooter,
        }}
      >
        <Box className="p-2">{children}</Box>
      </DashboardLayout>
    </AppProvider>
  );
}
