import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import { FaUserMd, FaBookMedical, FaHome } from 'react-icons/fa';

const useStyles = makeStyles({
  gutters: {
    paddingLeft: '24px',
  },
});

const SideBarItem = ({ menu, ...rest }) => {
  const classes = useStyles();
  const { text = '', link = '' } = menu;
  return (
    <Link to={link}>
      <ListItem
        classes={{
          gutters: classes.gutters,
        }}
        button
        {...rest}
      >
        <ListItemIcon>
          {text === 'Home' && <FaHome style={{ color: '#008357' }} />}
          {text === 'Médicos' && <FaUserMd style={{ color: '#008357' }} />}
          {text === 'Agendamentos' && (
            <FaBookMedical style={{ color: '#008357' }} />
          )}
        </ListItemIcon>
        <ListItemText primary={text} disableTypography />
      </ListItem>
    </Link>
  );
};

export default SideBarItem;
