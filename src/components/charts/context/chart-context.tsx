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
import dynamic from "next/dynamic";

// Dynamically import ApexCharts only on the client
const ApexChartsPromise = import("apexcharts");

import { IChartContext, IChartProvider, IApexChartExport } from "../interfaces";

export const ChartContext = createContext<IChartContext>({} as IChartContext);

export const ChartProvider: FC<IChartProvider> = ({ id, children }) => {
  const [ApexCharts, setApexCharts] = useState<any>(null);

  useEffect(() => {
    // Ensure ApexCharts is loaded only on client-side
    ApexChartsPromise.then((mod) => setApexCharts(mod.default));
  }, []);

  const downloadSVG = useCallback(() => {
    if (!ApexCharts || typeof window === "undefined") return;
    const chart = ApexCharts.getChartByID(id);
    chart?.exports?.exportToSVG();
  }, [id, ApexCharts]);

  const downloadPNG = useCallback(() => {
    if (!ApexCharts || typeof window === "undefined") return;
    const chart = ApexCharts.getChartByID(id);
    chart?.exports?.exportToPng();
  }, [id, ApexCharts]);

  const downloadCSV = useCallback(() => {
    if (!ApexCharts || typeof window === "undefined") return;
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
