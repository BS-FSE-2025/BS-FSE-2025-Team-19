import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100vh - 64px)',
                backgroundImage: 'url(https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>

            <Box
                sx={{
                    width: '100%',
                    height: 'calc(100vh - 64px)',
                    backgroundColor: 'rgba(10, 95, 252, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    backgroundImage: 'linear-gradient(to top, rgba(48,207,208, 0.3) 0%, rgba(51,8,103, 0.3) 100%)',
                }}>
                    <Box>
                <Typography variant="h1" color={'white'}>
                    עונים למפונים
                </Typography>
                <Typography
                    variant="h3" color={'white'} >
                    ביחד למען עתיד טוב יותר
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {navigate('/login')}}
                >
                    להתחברות לחץ כאן
                </Button>
                </Box>
            </Box>
        </Box>
    )
}