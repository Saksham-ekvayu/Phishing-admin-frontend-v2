import { ReactElement } from "react";
// import Chart from "react-apexcharts";
import { ChartBox, ChartContainer, ChartProvider, Chart } from "@/components";
import { StringHelper } from "@/helpers/string.helper";
import { LineGraphController } from "./line-graph.controller";

export function LineGraph(): ReactElement {
  const { getters } = LineGraphController();
  const { title, chartOptions, series, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart shows stock price movement over time."
        disableAction={enableButton}
      >
        <ChartBox height={300}>
          <Chart
            height="100%"
            width="100%"
            options={chartOptions}
            series={[{ name: "XYZ MOTORS", data: series }]}
            type="area"
          />
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}
