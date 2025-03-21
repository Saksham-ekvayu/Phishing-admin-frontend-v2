"use client";

import { RefObject, useMemo, useRef, useState } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import CsvDownload from "react-csv-downloader";
import { ChartsCsvHeaderEnum } from "@/enum";
import { ThemeEnum } from "@/theme";

interface IBarData {
  count: number;
  xAxisLabel: string;
}

interface IUnidentifiedUtterances {
  time: string;
  message: string;
  messageType: string;
  sessionId: string;
}

interface IUnidentifiedUtterancesControllerResponses {
  getters: {
    chartOptions: ApexOptions;
    unidentifedUtternces: Array<IUnidentifiedUtterances>;
    title: string;
    series: number[];
    enableButton: boolean;
  };
  handlers: {
    downloadDataCSV: () => void;
  };
  ref: {
    unidentifiedUtterancesRef: RefObject<CsvDownload>;
  };
}

export function UnidentifiedUtterancesController(): IUnidentifiedUtterancesControllerResponses {
  const theme: Theme = useTheme();

  const staticUtterances: Array<IUnidentifiedUtterances> = [
    {
      time: "2024-01-01 10:00:00",
      message: "Sample message 1",
      messageType: "text",
      sessionId: "session-001",
    },
    {
      time: "2024-01-01 11:00:00",
      message: "Sample message 2",
      messageType: "text",
      sessionId: "session-002",
    },
    {
      time: "2024-01-01 12:00:00",
      message: "Sample message 3",
      messageType: "text",
      sessionId: "session-003",
    },
  ];

  const staticGraphData: IBarData[] = [
    { count: 10, xAxisLabel: "Jan" },
    { count: 20, xAxisLabel: "Feb" },
    { count: 15, xAxisLabel: "Mar" },
    { count: 25, xAxisLabel: "Apr" },
    { count: 30, xAxisLabel: "May" },
    { count: 22, xAxisLabel: "Jun" },
  ];

  const [unidentifedUtternces] =
    useState<Array<IUnidentifiedUtterances>>(staticUtterances);
  const chartData = unidentifedUtternces.length;
  const enableButton = !!chartData;
  const unidentifiedUtterancesRef = useRef<CsvDownload>(null!);

  const series = useMemo(
    () => staticGraphData.map((data: IBarData) => data.count),
    [staticGraphData]
  );

  const columns = useMemo(
    () => staticGraphData.map((data: IBarData) => data.xAxisLabel),
    [staticGraphData]
  );

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        background: theme.palette.background.paper,
        stacked: true,
        toolbar: {
          show: false,
          export: {
            csv: {
              headerCategory: ChartsCsvHeaderEnum.TIME_PERIOD,
            },
          },
        },
      },
      colors: [
        theme.palette.info.light,
        theme.palette.info.main,
        theme.palette.info.dark,
      ],
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true,
          left: 2,
          top: 2,
          opacity: 0.5,
        },
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      states: {
        active: {
          filter: {
            type: "none",
          },
        },
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: ["transparent"],
        show: true,
        width: 2,
      },
      theme: {
        mode:
          theme.palette.mode === ThemeEnum.DARK
            ? ThemeEnum.DARK
            : ThemeEnum.LIGHT,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: columns,
        labels: {
          style: {
            colors: theme.palette.text.primary,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.primary,
          },
        },
      },
    }),
    [columns, theme]
  );

  const title = "Unidentified Utterances";

  const downloadDataCSV = () => {
    if (unidentifiedUtterancesRef && unidentifiedUtterancesRef.current) {
      unidentifiedUtterancesRef.current.handleClick();
    }
  };

  return {
    getters: {
      title,
      chartOptions,
      series,
      unidentifedUtternces,
      enableButton,
    },
    handlers: { downloadDataCSV },
    ref: {
      unidentifiedUtterancesRef,
    },
  };
}
