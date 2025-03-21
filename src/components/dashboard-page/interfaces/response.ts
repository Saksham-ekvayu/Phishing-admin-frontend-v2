import {
  IDynamicKey,
  IDatePayload,
  IPaginationPayload,
  IBotId,
  IGraphData,
} from "@/src/interfaces";

import { IChartResponse, ISurveyHeaderColoumn, ISurveys } from ".";

export interface IMessageCountResponse {
  messages: number;
}

export interface IMetaData {
  isNextPage: boolean;
  totalCount: number;
}

export interface IUniqueUserResponse {
  uniqueUsers: number;
}

export interface ISevenDaysResponse {
  uniqueUserCount: number;
  messagesCount: number;
  averageMessagesPerUser: number;
  botSuccess: number;
  newUserCount: number;
  bmeCount?: number;
  bounceRate?: number;
}

export interface IUnknownJourneyDataResponse {
  time: Date;
  info_intent: string;
  info_uniqueId?: string;
  is_session_start: string;
  message: string;
  messageType: string;
  sender: string;
  sessionId: string;
}

export interface IJourneyData {
  time: string;
  count: number;
  info_intent: string;
  xAxisLabel: string;
}

export interface ITopFiveJourneyResponse {
  top5Journerys: IDynamicKey<IJourneyData[]>;
}
export interface IBarData {
  time: Date;
  count: number;
  day: number;
  month: number;
  year: number;
  xAxisLabel: string;
}

export interface IUnidentifiedUtterances {
  time: Date | string;
  message: string;
  messageType: string;
  sessionId: string;
}

export interface ITotalMessageResponse {
  barData: IBarData[];
}

export interface IJourneysOverview {
  journey: string;
  count: number;
  percent: string;
}

export interface IJourneysOverviewResponse {
  journeyOverview: IJourneysOverview[];
}

export interface INewUserResponse {
  newUsers: number;
}

export interface IUnidentifiedUttrancesResponse {
  data: IBarData[];
}

export interface ISurveyRequest extends IPaginationPayload, IBotId {}

export interface IChartRequest extends IDatePayload, IBotId {
  filter: string;
}

export interface ISurveyResponse {
  surveys: ISurveys[];
  columns: ISurveyHeaderColoumn[];
  metaData: IMetaData;
}

export interface IProductClicked {
  productClicked: IChartResponse[];
}

export interface IProductRecommendation {
  productRecommendation: IChartResponse[];
}

export interface IBmeCountResponse {
  bmeCount: number;
}

export interface IBounceRateResponse {
  bounceRate: number;
}

export interface IAgentMessageExchangeResponse {
  messageCount: number;
}

export interface IChartData {
  color: string;
  label: string;
  data: number;
}

export interface IGraphData<T> {
  time: string;
  count: T;
}

export interface IGraphAndPercentage {
  percentage: number;
  graph: IGraphData<number>[];
}

export interface ILastSevenDayGraphDataResponse {
  messageCount: IGraphAndPercentage;
  uniqueUserCount: IGraphAndPercentage;
  newUserCount: IGraphAndPercentage;
  averageMessageCount: IGraphAndPercentage;
  bmeCount: IGraphAndPercentage;
  bounceRateCount: IGraphAndPercentage;
  agentMessageCount: IGraphAndPercentage;
}
export interface IDashboardGraphs {
  unidentifiedUtterances: boolean;
  totalMessage: boolean;
  top5journey: boolean;
  journeyOverview: boolean;
  bmeCount?: boolean;
  bounceRate?: boolean;
}

export interface IGetDashboardGraphsResponse {
  dashboardGraph: IDashboardGraphs;
  metaData: IMetaData;
}
