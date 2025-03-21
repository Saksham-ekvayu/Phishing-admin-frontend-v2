import { RecommendationTypeEnum } from '@/src/enum';
import { IDynamicKey } from '@/src/interfaces';

export * from './response';
export * from './request';

export interface ISerise {
  name: string;
  color: string;
  data: number[];
}

export interface ITop5GraphDisplayData {
  serise: ISerise[];
  labels: string[] | undefined;
}

export interface IRecommendations {
  productId: string;
  productName: string;
  isClicked: boolean;
  surveyId: string;
  recommendationType: RecommendationTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISurveyAnswer {
  answer: string;
}

export interface IInnerSurvey {
  surveyId: string;
  answer: IDynamicKey<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISurveyHeaderColoumn {
  id: string;
  name: string;
  hidden: boolean;
  type: number;
}

export interface ISurveys {
  survey: IInnerSurvey;
  recommendations: IRecommendations[];
}

export interface IChartResponse {
  product: string;
  percent: string;
  count: number;
}
