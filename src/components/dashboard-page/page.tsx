"use client";

import React, { JSX, useMemo } from "react";

import { BarGraph, Spacing, SpacingEnum } from "@/components";

import { DashboardController } from "./dashboard.controller";
import { Grid } from "@mui/material";
import { InfoCard } from "./infoCard";
import {
  faEnvelope,
  faFlask,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../pageHeader";

export default function DashboardPage(): JSX.Element {
  const { getters } = DashboardController();
  const { breadcrumbs } = getters;

  const generateCardGrid = useMemo(() => {
    const count = 4;

    switch (count) {
      case 4:
        return { xs: 12, sm: 6, md: 3 };
      default:
        return { xs: 12, sm: 6, md: 3 };
    }
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" breadcrumbs={breadcrumbs} actions={""} />
      <Spacing spacing={1.5} variant={SpacingEnum.BOTTOM} />
      <Grid container spacing={3}>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={689}
            title="Total Mail"
            icon={faEnvelope}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={3320}
            title="SandBox Testing"
            icon={faFlask}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={851}
            title="CDR Complete"
            icon={faCheckCircle}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={1456}
            title="Suspicious Documents"
            icon={faExclamationTriangle}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
      </Grid>
      <div className="w-full mt-5">
        <BarGraph />
      </div>
    </>
  );
}
