import React, { ReactElement } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
    <Card
      sx={{
        width: "100%",
        boxShadow: 4,
        borderRadius: 3,
        overflow: "hidden",
        paddingTop:"5px"
      }}
    >
      <CardHeader
        title={
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
        }
        sx={{ py: 0.5, px: 2 }} // Reduced padding
      />
      <CardContent sx={{ py: 1, px: 2, "&:last-child": { pb: 1 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            {data}
          </Typography>
          <Box
            sx={{
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.dark",
              color: "white",
              borderRadius: "10%",
            }}
          >
            <FontAwesomeIcon icon={icon} size="sm" />
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardContent sx={{ py: 1, px: 2, "&:last-child": { pb: 1 } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{
              background: "rgba(76, 175, 80, 0.1)",
              color: "#15B8A6",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {secondaryData}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontWeight: 500 }}
          >
            {secondaryTitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
