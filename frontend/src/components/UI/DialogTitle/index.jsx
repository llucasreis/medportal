import React from 'react';
import { Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const DialogTitle = ({ title, styleTitle, children, ...rest }) => (
  <MuiDialogTitle disableTypography {...rest}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        variant="h6"
        style={{
          color: '#008357',
          fontSize: '28px',
          fontWeight: '500',
          ...styleTitle,
        }}
      >
        {title}
      </Typography>
      {children}
    </div>
  </MuiDialogTitle>
);

export default DialogTitle;
