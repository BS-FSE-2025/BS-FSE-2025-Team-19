import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginComp from '../components/Login';
import Signup from '../components/Signup';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <ThemeProvider xs={{}} theme={defaultTheme}>
      <Box
        component="main"
        maxWidth="xs"
        sx={{ width: '100%', height: 'calc(100vh - 64px)', display: 'flex', }}
      >
        <Container component="main" maxWidth="xs" sx={{ width: '100%', display: 'flex', marginTop: '10%' }}>

          <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="התחברות" />
              <Tab label="הרשמה" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
             <LoginComp />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Signup/>
            </TabPanel>
          </Box>
        </Container>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: 'url(https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(10, 95, 252, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundImage: 'linear-gradient(to top, rgba(48,207,208, 0.3) 0%, rgba(51,8,103, 0.3) 100%)',
            }}>
            <Typography variant="h1" color={'white'}>
              עונים למפונים
            </Typography>
            <Typography
              variant="h3" color={'white'} >
              ביחד למען עתיד טוב יותר
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider >
  );
}