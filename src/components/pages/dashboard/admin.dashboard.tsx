"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import { InfoCard } from "./infoCard";
import {
  faEnvelope,
  faFlask,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { DashboardController } from "./dashboard.controller";
import { BarGraph } from "./bar-charts/bar-graph";
import { LineGraph } from "./line-chart/line-graph";
import { SlopeGraph } from "./slope-chart/slope-graph";
import { PageHeader, Spacing, SpacingEnum } from "@/components/common";

export default function AdminDashboard() {
  const { getters } = DashboardController();
  const { breadcrumbs } = getters;

  const cardData = [
    { title: "Total Mail", data: 689, icon: faEnvelope },
    { title: "SandBox Testing", data: 3320, icon: faFlask },
    { title: "CDR Complete", data: 851, icon: faCheckCircle },
    { title: "Suspicious Documents", data: 1456, icon: faExclamationTriangle },
  ];

  return (
    <>
      <PageHeader title="Dashboard" breadcrumbs={breadcrumbs} actions={""} />
      <Spacing spacing={1.5} variant={SpacingEnum.BOTTOM} />
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <InfoCard
              data={card.data}
              title={card.title}
              icon={card.icon}
              weekTitle="Last Week"
              lastWeekCount={125}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ p: 0, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BarGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineGraph />
          </Grid>
          <Grid item xs={12} md={8}>
            <SlopeGraph />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
