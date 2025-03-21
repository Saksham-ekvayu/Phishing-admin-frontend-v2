import React, { ReactElement } from "react";
import { Card, Divider, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  LastWeekWapper,
  CardInnerdWrapper,
  CardHeading,
} from "./infoCard.style";

interface IInfoCardProps {
  icon: IconDefinition;
  data: number;
  title: string;
  secondaryData?: number;
  secondaryTitle?: string;
}

/**
 * InfoCard Component
 * @param {IInfoCardProps} props
 * @return {ReactElement}
 */
export function InfoCard(props: IInfoCardProps): ReactElement {
  const { icon, data, title, secondaryData, secondaryTitle } = props;

  return (
    <Card>
      <CardInnerdWrapper>
        <CardHeading>
          <Typography color="textSecondary" variant="body2">
            {title}
          </Typography>
          <Typography variant="h2">{data}</Typography>
        </CardHeading>
        <FontAwesomeIcon icon={icon} />
      </CardInnerdWrapper>
      <Divider />
      <LastWeekWapper>
        <Typography>{secondaryData}</Typography>
        <Typography component="span">{secondaryTitle}</Typography>
      </LastWeekWapper>
    </Card>
  );
}
