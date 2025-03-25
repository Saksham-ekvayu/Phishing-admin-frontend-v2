import { ReactElement } from "react";
import { ChartBox, ChartContainer, ChartProvider, Chart } from "@/components";
import { StringHelper } from "@/helpers/string.helper";
import { SlopeGraphController } from "./slope-graph.controller";

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
