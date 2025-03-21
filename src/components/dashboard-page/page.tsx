"use client";

import React, { JSX, useMemo } from "react";

import { Spacing, SpacingEnum } from "@/components";

import { DashboardController } from "./dashboard.controller";
import DatePicker from "@/components/datePicker";
import { Grid } from "@mui/material";
import { InfoCard } from "./components/infoCard/infoCard";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Top5Journerys } from "./components/charts/top5Journey/top5Journey";
import JourneyOverview from "./components/charts/journeyOverview/journeyOverview";
import TotalMessage from "./components/charts/totalMessage/totalMessage";
import { UnidentifiedUttrances } from "./components/charts/unidentifiedUtterances/unidentifiedUtterances";
import PageHeader from "../pageHeader";

// const NormalLayout = dynamic(() => import("layouts/Normal"));

/**
 * Dashboard Page
 * @return {JSX.Element}
 */
export default function DashboardPage(): JSX.Element {
  const { handlers, getters } = DashboardController();
  const { ref, top5Measure, breadcrumbs } = getters;
  const { handleDate } = handlers;

  /**
   * Generate Cards Layout
   * Calculates and return the grid item
   * sections according to the count
   */
  const generateCardGrid = useMemo(() => {
    const count = 4;

    switch (count) {
      case 4:
        return { xs: 12, sm: 6, md: 3 };
      // case 5:
      //   return { xs: 12, sm: 6, md: 6, xl: 2.4 };
      // case 6:
      //   return { xs: 12, sm: 6, md: 4 };
      default:
        return { xs: 12, sm: 6, md: 3 };
    }
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        breadcrumbs={breadcrumbs}
        actions={<DatePicker onChange={handleDate} />}
      />
      <Spacing spacing={1.5} variant={SpacingEnum.BOTTOM} />
      <Grid container spacing={3}>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={689}
            title="Total Mail"
            icon={faUser}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={3320}
            title="SandBox Testing"
            icon={faUser}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={851}
            title="CDR Complete"
            icon={faUser}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
        <Grid item {...generateCardGrid}>
          <InfoCard
            data={1456}
            title="Suspicious Documents"
            icon={faUser}
            secondaryTitle="Last Week"
            secondaryData={125}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ my: 0 }} spacing={3}>
        <Grid item xs={12} md={9}>
          <div ref={ref}>
            <Top5Journerys />
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <div style={{ maxHeight: top5Measure.height }}>
            <JourneyOverview />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TotalMessage />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* {dashboardGraphs.dashboardGraph?.unidentifiedUtterances && ( */}
          <UnidentifiedUttrances />
          {/* )} */}
        </Grid>
      </Grid>
    </>
  );
}

// export const getStaticProps = (props: NextPageContext) =>
//   IntlHelper.getStaticProps(props, ["dashboard"]);

// export const { getStaticPaths } = IntlHelper;
