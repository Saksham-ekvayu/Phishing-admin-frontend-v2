"use client";

import React, { ReactElement } from "react";
import { CardContent } from "@mui/material";

import { StringHelper } from "@/helpers";
import { NoDataEnum } from "@/enum";
import { Chart, ChartContainer, NoDataFound } from "@/components";
import ChartProvider from "@/components/charts/context/chart-context";

import { Top5JournerysController } from "./top5Journey.controller";

/**
 * Top 5 Journey Chart
 * @return {ReactElement}
 */
export function Top5Journerys(): ReactElement {
  const { getters } = Top5JournerysController();
  const { title, chartSeries, chartOptions, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart shows the count of top 5 most visited parts of the journey."
        disableAction={enableButton}
      >
        <CardContent sx={{ px: 0 }}>
          {chartSeries[0]?.name !== NoDataEnum.NO_DATA ? (
            <Chart
              height={400}
              options={chartOptions}
              series={chartSeries}
              type="line"
            />
          ) : (
            <NoDataFound title="No data found in selected time period" />
          )}
        </CardContent>
      </ChartContainer>
    </ChartProvider>
  );
}

export default React.memo(Top5Journerys);
