import React, { useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiDivider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { toast } from 'react-toastify';
// import { icon_navbar, icon_showsonline, icon_logout } from '../../../assets';
import { FaBars, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import AppBar from '../AppBar';
import SideBarItem from '../SideBarItem';
import menus from '../../../routes/menus';
// import { logout } from '../../../services/auth';

const drawerWidth = 250;

const Divider = withStyles({
  root: {
    border: '1px solid #000',
    opacity: '10%',
    height: '0px',
  },
})(MuiDivider);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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
  drawer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: '#F3F3F3',
    zIndex: '1202',
    boxShadow: '0px 9px 18px #00000040',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#F3F3F3',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  openToolbar: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gutters: {
    paddingLeft: '24px',
  },
}));

const SideBar = ({ children }) => {
  const classes = useStyles();
  // const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = useCallback(() => {
    // logout();
    // history.replace('/');
    toast.success('Logout feito com sucesso');
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        // user={userData}
        // user={{ name: 'Lucas', email: 'lucas@gmail.com' }}
      />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {open ? (
          <div className={classes.openToolbar}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                <FaBars style={{ color: '#000' }} />
                {/* <img src={icon_navbar} alt="Navbar" /> */}
              </IconButton>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                fontWeight: 'bold',
                fontSize: '35px',
              }}
            >
              <span
                style={{
                  color: '#008357',
                }}
              >
                med
              </span>
              Portal
              {/* <img src={icon_showsonline} alt="Shows Online" /> */}
            </div>
          </div>
        ) : (
          <div className={classes.toolbar}>
            <div>
              <IconButton onClick={handleDrawerClose}>
                {/* <img src={icon_navbar} alt="Navbar" /> */}
              </IconButton>
            </div>
          </div>
        )}
        <Divider />
        <List>
          {menus.map(menu => (
            <SideBarItem key={menu.text} menu={menu} />
          ))}
        </List>
        <Divider />
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            backgroundColor: '#d9d9d9',
          }}
        >
          <ListItem
            onClick={() => handleLogout()}
            classes={{ gutters: classes.gutters }}
            button
          >
            <ListItemIcon>
              <FaRegArrowAltCircleLeft />
              {/* <img src={icon_logout} alt="logout" /> */}
            </ListItemIcon>
            <ListItemText primary="Fazer Logout" disableTypography />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default SideBar;
