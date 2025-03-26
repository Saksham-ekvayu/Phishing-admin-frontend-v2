"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { MathHelper } from "@/helpers/math.helper";

// Define the data structure for phishing entries
export interface IPhishingData {
  id: number;
  email: string;
  status: string;
  date: string;
  risk: string;
}

interface ITableControllerResponses {
  getters: {
    title: string;
    tableData: IPhishingData[];
    enableButton: boolean;
  };
}

export function TableController(): ITableControllerResponses {
  const theme: Theme = useTheme();

  // Generate sample data for the phishing table
  const tableData = useMemo<IPhishingData[]>(() => {
    const data: IPhishingData[] = [];
    const statuses = ["Detected", "Quarantined", "Blocked", "Investigating"];
    const risks = ["High", "Medium", "Low"];
    
    // Generate 10 sample entries
    for (let i = 1; i <= 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - MathHelper.generateRandom(0, 7)); // Random date within last week
      
      data.push({
        id: i,
        email: `suspicious${i}@example${MathHelper.generateRandom(1, 99)}.com`,
        status: statuses[MathHelper.generateRandom(0, statuses.length - 1)],
        date: date.toLocaleDateString(),
        risk: risks[MathHelper.generateRandom(0, risks.length - 1)],
      });
    }

    return data;
  }, []);

  const enableButton = tableData.length > 0;
  const title = "Latest Phishing Attempts";

  return {
    getters: { title, tableData, enableButton },
  };
}
