"use client";

import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";

// Import dynamically with SSR disabled
const ApexChartsPromise = import("apexcharts").then(
  (mod) => mod?.default || mod
);

// Define a proper type for ApexCharts
type ApexChartsType = typeof import("apexcharts");

import { IChartContext, IChartProvider } from "../interfaces";

export const ChartContext = createContext<IChartContext>({} as IChartContext);

export const ChartProvider: FC<IChartProvider> = ({ id, children }) => {
  const [ApexCharts, setApexCharts] = useState<ApexChartsType | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== "undefined") {
      ApexChartsPromise.then((Apex) => {
        if (isMounted) setApexCharts(() => Apex);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const downloadSVG = useCallback(() => {
    if (!ApexCharts || !ApexCharts.getChartByID) return;
    const chart = ApexCharts.getChartByID(id);
    chart?.exports?.exportToSVG();
  }, [id, ApexCharts]);

  const downloadPNG = useCallback(() => {
    if (!ApexCharts) return;
    const chart = ApexCharts.getChartByID(id);
    chart?.exports?.exportToPng();
  }, [id, ApexCharts]);

  const downloadCSV = useCallback(() => {
    if (!ApexCharts) return;
    const chart = ApexCharts.getChartByID(id);
    chart?.exports?.exportToCSV();
  }, [id, ApexCharts]);

  const value = useMemo(
    () => ({
      id,
      export: {
        svg: downloadSVG,
        png: downloadPNG,
        csv: downloadCSV,
      },
    }),
    [downloadCSV, downloadPNG, downloadSVG, id]
  );

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};

export default ChartProvider;

export const useChart = () => useContext(ChartContext);
