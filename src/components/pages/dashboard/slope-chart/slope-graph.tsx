import { ReactElement } from "react";
import { StringHelper } from "@/helpers/string.helper";
import { SlopeGraphController } from "./slope-graph.controller";
import {
  Chart,
  ChartContainer,
  ChartProvider,
} from "@/components/common/charts";
import { ChartBox } from "../chart-box";

export function SlopeGraph(): ReactElement {
  const { getters } = SlopeGraphController();
  const { title, chartOptions, series, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart compares values across different categories."
        disableAction={enableButton}
      >
        <ChartBox height={350}>
          <Chart
            height="100%"
            width="100%"
            options={chartOptions}
            series={series}
            type="line"
          />
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}
