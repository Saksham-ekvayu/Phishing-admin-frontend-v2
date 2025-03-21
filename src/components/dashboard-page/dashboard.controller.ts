"use client";

import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import useMeasure, { RectReadOnly } from "react-use-measure";
import { DateTime } from "luxon";
import { RoutePathEnum } from "@/enum";
import { IBreadcrumbDisplay } from "@/components";
import { MeasureRefType } from "@/interfaces";

interface IDashboardController {
  getters: {
    breadcrumbs: IBreadcrumbDisplay[];
    ref: MeasureRefType;
    top5Measure: RectReadOnly;
  };
  handlers: {
    handleDate: (date: any) => void;
  };
}

/**
 * Dashboard controller
 * @return {IDashboardController}
 */
export function DashboardController(): IDashboardController {
  const [sDate, setStartDate] = useState<DateTime>(
    DateTime.now().minus({ days: 1 })
  );
  const [eDate, setEndDate] = useState<DateTime>(DateTime.now());
  const [ref, top5Measure] = useMeasure();

  /**
   * handle date function
   * @param {DateTime} startDate
   * @param {DateTime} endDate
   */
  const handleDate = ({ startDate, endDate }: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const breadcrumbs = useMemo(
    () => [
      {
        name: "Dashboard",
        path: RoutePathEnum.NONE,
        forwardParam: false,
      },
    ],
    []
  );

  return {
    handlers: {
      handleDate,
    },
    getters: {
      breadcrumbs,
      ref: ref as MeasureRefType,
      top5Measure,
    },
  };
}
