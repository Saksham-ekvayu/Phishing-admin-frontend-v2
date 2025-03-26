"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";

export interface ILineChartData {
  x: number; // timestamp
  y: number; // value
}

interface ILineGraphControllerResponses {
  getters: {
    chartOptions: ApexOptions;
    title: string;
    series: ILineChartData[];
    enableButton: boolean;
  };
}

export function LineGraphController(): ILineGraphControllerResponses {
  const theme: Theme = useTheme();

  // Generate sample data for the last 6 months
  const lineChartData = useMemo<ILineChartData[]>(() => {
    const data: ILineChartData[] = [];
    const now = new Date();

    // Generate data points for the last 180 days
    for (let i = 180; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);

      data.push({
        x: date.getTime(), // timestamp in milliseconds
        y: Math.floor(Math.random() * 100000000) + 10000000, // Random value between 10M and 110M
      });
    }

    return data;
  }, []);

  const chartData = lineChartData.length;
  const enableButton = !!chartData;

  const series = useMemo(() => lineChartData, [lineChartData]);

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        background: 'transparent',
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: false,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      stroke: {
        curve: 'smooth', // Makes the line smoother
        width: 2, // Reduces line width for cleaner appearance
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      grid: {
        show: false, // Removes the grid lines
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
      theme: {
        mode: theme.palette.mode === "dark" ? "dark" : "light",
      },
    }),
    [theme]
  );

  const title = "Stock Price Movement";

  return {
    getters: { title, chartOptions, series, enableButton },
  };
}
