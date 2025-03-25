"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";

export interface ISlopeChartData {
  x: string; // category
  y: number; // value
}

export interface ISlopeChartSeries {
  name: string;
  data: ISlopeChartData[];
}

interface ISlopeGraphControllerResponses {
  getters: {
    chartOptions: ApexOptions;
    title: string;
    series: ISlopeChartSeries[];
    enableButton: boolean;
  };
}

export function SlopeGraphController(): ISlopeGraphControllerResponses {
  const theme: Theme = useTheme();

  // Sample data for the slope chart
  const slopeChartSeries = useMemo<ISlopeChartSeries[]>(() => {
    return [
      {
        name: 'Blue',
        data: [
          { x: 'Category 1', y: 503 },
          { x: 'Category 2', y: 580 },
          { x: 'Category 3', y: 135 },
        ],
      },
      {
        name: 'Green',
        data: [
          { x: 'Category 1', y: 733 },
          { x: 'Category 2', y: 385 },
          { x: 'Category 3', y: 715 },
        ],
      },
      {
        name: 'Orange',
        data: [
          { x: 'Category 1', y: 255 },
          { x: 'Category 2', y: 211 },
          { x: 'Category 3', y: 441 },
        ],
      },
      {
        name: 'Red',
        data: [
          { x: 'Category 1', y: 428 },
          { x: 'Category 2', y: 749 },
          { x: 'Category 3', y: 559 },
        ],
      },
    ];
  }, []);

  const enableButton = !!slopeChartSeries.length;

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        height: 350,
        width: 600,
        type: 'line',
        background: 'transparent',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        line: {
          isSlopeChart: true,
        },
      },
      tooltip: {
        followCursor: true,
        intersect: false,
        shared: true,
      },
      dataLabels: {
        background: {
          enabled: true,
        },
        formatter: function(val, opts) {
          const seriesName = opts.w.config.series[opts.seriesIndex].name;
          return val !== null ? seriesName : '';
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
        },
      },
      xaxis: {
        position: 'bottom',
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
      },
      stroke: {
        width: [2, 3, 4, 2],
        dashArray: [0, 0, 5, 2],
        curve: 'smooth',
      },
      theme: {
        mode: theme.palette.mode === "dark" ? "dark" : "light",
      },
    }),
    [theme]
  );

  const title = "Slope Chart Comparison";

  return {
    getters: { 
      title, 
      chartOptions, 
      series: slopeChartSeries, 
      enableButton 
    },
  };
}
