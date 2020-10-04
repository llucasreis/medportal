import React from 'react';
import clsx from 'clsx';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import { icon_navbar, icon_user } from '../../../assets';
import { FaBars } from 'react-icons/fa';
import { AppBarInfo } from './styles';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#F3F3F3',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

const AppBar = ({ open = false, handleDrawerOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <MuiAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      {...rest}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          {/* <img src={icon_navbar} alt="Navbar" /> */}
          <FaBars style={{ color: '#000' }} />
        </IconButton>

        <AppBarInfo>
          <div className="info-wrapper">
            <div className="icon-wrapper">
              {/* <img src={icon_user} width={36} height={36} alt="User" /> */}
            </div>
            <div className="user-wrapper">
              {/* <p>{user && user.name}</p>
              <span>{user && user.email}</span> */}
            </div>
          </div>
        </AppBarInfo>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
