import { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
} from "@mui/material";
import { StringHelper } from "@/helpers/string.helper";
import { TableController } from "./table.controller";
import { ChartContainer, ChartProvider } from "@/components/common/charts";
import { ChartBox } from "../chart-box";

export function LatestData(): ReactElement {
  const { getters } = TableController();
  const { title, tableData } = getters;

  // Function to determine chip color based on risk level
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="Latest phishing data analysis and statistics"
      >
        <ChartBox height={300}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300, overflow: "auto", paddingLeft:0.5 }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Risk</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell
                      sx={{
                        maxWidth: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.risk}
                        color={getRiskColor(row.risk) as any}
                        size="small"
                        sx={{ minWidth: 70 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}
