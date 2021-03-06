import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UserContext } from "../context/UserAuthentication";
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sideNav: {
    textDecoration: "none",
    color: "#142850"
  }
}));


export default function NavBar() {
  const { loginStatus, logout } = useContext(UserContext);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{ backgroundColor: "#142850" }} className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img src="https://i.ibb.co/GVtGPXP/logo.png" width="40" alter="logo of the app" style={{ marginRight: "10px" }} />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Programmeow
          </Typography>
          <Hidden smDown>
            <Button href="/" color="inherit">Home</Button>
            <Button href="/visualization" color="inherit">Algorithm Visualizer</Button>
            <Button href="/questionlist" color="inherit">Questions</Button>
            <Button href={loginStatus.isLoggedin ? "/" : "/signin"} color="inherit">{loginStatus.isLoggedin ? `Hi ${loginStatus.username}` : "Sign in"}</Button>
            <Button href="/signup" style={{display: loginStatus.isLoggedin ? "none" : "block"}} color="inherit">Sign Up</Button>
            <Button onClick={logout} style={{ display: loginStatus.isLoggedin ? "block" : "none" }} color="inherit">Logout</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <a href="/" className={classes.sideNav}>
            <ListItem button key="home">
              <ListItemIcon><HomeIcon style={{ color: "#142850" }} /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </a>
          <a href="/visualization" className={classes.sideNav}>
            <ListItem button key="visualization">
              <ListItemIcon><DescriptionOutlinedIcon style={{ color: "#142850" }} /></ListItemIcon>
              <ListItemText primary="Algorithm Visualizer" />
            </ListItem>
          </a>
          <a href={loginStatus.isLoggedin ? "/" : "/signin"} className={classes.sideNav}>
            <ListItem button key="sign in">
              <ListItemIcon><AccountBoxIcon style={{ color: "#142850" }} /></ListItemIcon>
              <ListItemText primary={loginStatus.isLoggedin ? `Hi ${loginStatus.username}` : "Sign in"} />
            </ListItem>
          </a>
          <a href="/signup" style={{ display: loginStatus.isLoggedin ? "none" : "block" }} className={classes.sideNav}>
            <ListItem button key="Sign up">
              <ListItemIcon><GroupAddIcon style={{ color: "#142850" }} /></ListItemIcon>
              <ListItemText primary="Sign up" />
            </ListItem>
          </a>
          <a onClick={logout} style={{ display: loginStatus.isLoggedin ? "block" : "none" }} className={classes.sideNav}>
            <ListItem button key="log out">
              <ListItemIcon><ExitToAppIcon style={{ color: "#142850" }} /></ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </a>
        </List>
      </Drawer>
    </div>
  );
}
