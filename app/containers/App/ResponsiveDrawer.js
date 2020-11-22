import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBox from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useLocation, withRouter } from 'react-router-dom';
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import { Button } from '@material-ui/core';

export const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: '#181818',
    color: '#fff',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  buttonConnection: {
    position: 'absolute',
    right: '0px',
    marginRight: '20px',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#121212',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
  selectedBand: {
    position: 'absolute',
    height: '100%',
    width: '8px',
    top: 0,
    left: 0,
    backgroundColor: '#1ED760',
  },
  white: {
    color: '#fff',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  selected: {
    color: '#1ED760',
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [location, setLocation] = React.useState();

  const ConnectionButton = props.connected ? <LogoutButton /> : <LoginButton />;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setLocation(props.history.location.pathname);
    props.history.listen((location, action) => {
      setLocation(location.pathname);
    });
  }, []);

  function isCurrentPath(value) {
    return value === 'Home' ? location === '/' : location === `/${value}`;
  }

  const drawer = (
    <div>
      {props.connected && (
        <List>
          {['Home', 'Albums', 'Singles'].map((text, index) => (
            <Link
              to={text === 'Home' ? '/' : `/${text}`}
              style={{ textDecoration: 'none' }}
              onClick={() => setLocation(text)}
            >
              <ListItem key={text}>
                {isCurrentPath(text) && (
                  <span className={classes.selectedBand} />
                )}
                <ListItemIcon
                  className={
                    isCurrentPath(text) ? classes.selected : classes.white
                  }
                >
                  <AccountBox />
                </ListItemIcon>
                <ListItemText
                  className={
                    isCurrentPath(text) ? classes.selected : classes.white
                  }
                  primary={text}
                />
              </ListItem>
            </Link>
          ))}
          )
        </List>
      )}
    </div>
  );

  const container =
    props !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Spotify Activity
          </Typography>
          <div className={classes.buttonConnection}>
          <Button onClick={() => sessionStorage.clear()}>Clear</Button>
          {ConnectionButton}
          </div>
        </Toolbar>
      </AppBar>
      {props.connected && (
        <nav
          className={classes.drawer}
          aria-label="mailbox folders"
          id="drawer"
        >
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
