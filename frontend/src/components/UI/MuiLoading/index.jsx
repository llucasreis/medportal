import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  colorPrimary: {
    color: '#bfbfbf',
  },
});

const MuiLoading = () => {
  const classes = useStyles();

  return <CircularProgress classes={{ colorPrimary: classes.colorPrimary }} />;
};

export default MuiLoading;
