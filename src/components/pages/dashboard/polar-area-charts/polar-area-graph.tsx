import { ReactElement } from "react";
import { StringHelper } from "@/helpers/string.helper";
import { PolarAreaGraphController } from "./polar-area-graph.controller";
import {
  Chart,
  ChartContainer,
  ChartProvider,
} from "@/components/common";
import { ChartBox } from "../chart-box";

export function PolarAreaGraph(): ReactElement {
  const { getters } = PolarAreaGraphController();
  const { title, chartOptions, series, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.generateUID(title, 1)}>
      <ChartContainer
        title={title}
        description="This chart shows distribution across different categories."
        disableAction={enableButton}
      >
        <ChartBox height={350}>
          <Chart
            height="100%"
            width="100%"
            options={chartOptions}
            series={series}
            type="polarArea"
          />
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}
