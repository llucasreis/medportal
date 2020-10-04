import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Dialog = ({ children, ...rest }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <MuiDialog fullScreen={fullScreen} fullWidth scroll="paper" {...rest}>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
