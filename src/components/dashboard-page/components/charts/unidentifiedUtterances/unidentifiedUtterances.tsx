"use client";

import React, { ReactElement } from "react";
import CsvDownloader from "react-csv-downloader";
import { Datas } from "react-csv-downloader/dist/esm/lib/csv";

import { Chart, ChartContainer } from "@/components";
import { StringHelper } from "@/helpers";
import {
  ChartsTooltipEnum,
  UnidentifiedUtterancesFilenameEnum,
} from "@/enum";
import ChartProvider from "@/components/charts/context/chart-context";

import { ChartBox } from "./unidentifiedUtterances.style";
import { UnidentifiedUtterancesController } from "./unidentifiedUtterances.controller";

/**
 * Unidentified Uttranced Graph Component
 * @return {ReactElement}
 */
export function UnidentifiedUttrances(): ReactElement {
  const { getters, handlers, ref } = UnidentifiedUtterancesController();
  const { title, chartOptions, series, unidentifedUtternces, enableButton } =
    getters;
  const { downloadDataCSV } = handlers;
  const { unidentifiedUtterancesRef } = ref;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart lists the count of user messages that have not been identified and hence not answered by the bot."
        enableDataDownload
        onDataDownload={downloadDataCSV}
        disableAction={enableButton}
      >
        {unidentifedUtternces && (
          <CsvDownloader
            style={{ display: "none" }}
            filename={UnidentifiedUtterancesFilenameEnum.FILENAME}
            datas={unidentifedUtternces as unknown as Datas}
            ref={unidentifiedUtterancesRef}
          />
        )}
        <ChartBox>
          <Chart
            height={300}
            options={chartOptions}
            series={[
              { name: ChartsTooltipEnum.UNIDENTIFIED_UTTRANCES, data: series },
            ]}
            type="bar"
          />
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}

export default React.memo(UnidentifiedUttrances);
