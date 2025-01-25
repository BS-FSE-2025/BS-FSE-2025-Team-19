import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import './NavigationBar.css';

const drawerWidth = 240;
const navItems = [{
  text: 'בית',
  route: '/'
},
{
  text: 'התחברות',
  route: '/login'
}];

const protectedNavItems = [
{
  text: 'תרומות',
  route: '/donations'
},
{
  text: 'מפה',
  route: '/map'
}];

function NavigationBar(props) {
  const { window } = props;
  const { userSession, setUserSession } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    handleClose()
    fetch('http://localhost:5001/api/logout', {
      method: 'DELETE',
      credentials: 'include', // Ensure cookies are included
    }).then((res) => {
      if (res.ok) {
        setUserSession({})
      }
    })
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        עונים למפונים
      </Typography>
      <Divider />
      <List>
        {!userSession.email && navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {userSession.email && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon> {`${userSession.firstName} ${userSession.lastName}`}
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar className='nav-bar' component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <VolunteerActivismIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            עונים למפונים
          </Typography>
          {!userSession.email && <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: '#fff' }}>
                <Link to={item.route} >
                  {item.text}
                </Link>
              </Button>
            ))}
          </Box>
          }
          {userSession.email && (
            <>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}>
            {protectedNavItems.map((item) => (
              <Button key={item.text} sx={{ color: '#fff' }} >
                <Link to={item.route} >
                  {item.text}
                </Link>
              </Button>
            ))}
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> {`${userSession.firstName} ${userSession.lastName}`}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  {`${userSession.firstName} ${userSession.lastName}`}
                </MenuItem>
                <Divider />
                <MenuItem onClick={onLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  התנתק
                </MenuItem>
              </Menu>
            </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}


export default NavigationBar;
