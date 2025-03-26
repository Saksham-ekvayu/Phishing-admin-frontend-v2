"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";

export interface IPolarAreaChartControllerResponses {
  getters: {
    chartOptions: ApexOptions;
    title: string;
    series: number[];
    enableButton: boolean;
  };
}

export function PolarAreaGraphController(): IPolarAreaChartControllerResponses {
  const theme: Theme = useTheme();

  // Sample data for the polar area chart
  const polarAreaSeries = useMemo<number[]>(() => {
    return [14, 23, 21, 17, 15, 10, 12, 17, 21];
  }, []);

  const enableButton = !!polarAreaSeries.length;

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'polarArea',
        background: 'transparent',
        toolbar: {
          show: true,
        },
      },
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      theme: {
        mode: theme.palette.mode === "dark" ? "dark" : "light",
      },
      labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F', 'Category G', 'Category H', 'Category I']
    }),
    [theme]
  );

  const title = "Polar Area Chart";

  return {
    getters: { 
      title, 
      chartOptions, 
      series: polarAreaSeries, 
      enableButton 
    },
  };
}
