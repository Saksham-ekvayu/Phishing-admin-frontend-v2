export interface IBaseRequest {
  botId: string;
  eDate: string;
  sDate: string;
}

export interface IMessageCountRequest extends IBaseRequest {
  totalUsers?: number;
}

export interface IUniqueUserRequest extends IBaseRequest {}

export interface IUnidentifiedUttrancesRequest extends IBaseRequest {}

export interface INewUserRequest extends IBaseRequest {}

export interface IJourneysOverviewRequest extends IBaseRequest {}

export interface IUnknownJourneyDataRequest extends IBaseRequest {}

export interface ITotalMessageRequest extends IBaseRequest {}

export interface ITopFiveJourneyRequest extends IBaseRequest {}

export interface IBmeCountRequest extends IBaseRequest {}

export interface IBounceRateRequest extends IBaseRequest {}

export interface IAgentMessageExchangeRequest extends IBaseRequest {}

export interface IGetDashboardGraphsRequest {
  botId: string;
  settingTypeId: number;
}
