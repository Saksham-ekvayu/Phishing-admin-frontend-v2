import { Box, Card, styled } from '@mui/material';

export const LastWeekWapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  alignItems: 'center',
  p: {
    fontSize: theme.typography.body1.fontSize,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0, 0.5),
    marginRight: theme.spacing(1.2),
    background: 'rgba(76, 175, 80, 0.1)',
    color: theme.palette.success.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  span: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

export const CardInnerdWrapper = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,

  svg: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '5px',
  },
}));

export const CardHeading = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  p: {
    display: 'flex',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
    paddingBottom: theme.spacing(1),
  },
  h2: {
    display: 'flex',
    marginTop: '0',
    fontSize: theme.typography.h3.fontSize,
  },
}));

export const InfoCard = styled(Card)({
  width: '100%',
});
