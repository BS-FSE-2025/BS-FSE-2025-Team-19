import React, { useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { UserContext } from '../contexts/userContext';
import validator from 'validator'
import { regexPassword } from '../utils'
import Alert from '@mui/material/Alert';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const { setUserSession } = useContext(UserContext)
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        fetchError: false,
        fetchErrorMsg: '',
    })

    const handleChange = (fieldName) => (event) => {
        const currValue = event.target.value
        let isCorrectValue =
            fieldName === 'email'
                ? validator.isEmail(currValue)
                : regexPassword.test(currValue)

        isCorrectValue
            ? setErrors({ ...errors, [fieldName]: false })
            : setErrors({ ...errors, [fieldName]: true })

        setValues({ ...values, [fieldName]: event.target.value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies are included
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                return setErrors({
                    ...errors,
                    fetchError: true,
                    fetchErrorMsg: error.msg,
                })
            }

            const data = await res.json()
            console.log({ data })
            setUserSession(data.userSession)

            // this is just a visual feedback for user for this demo
            // this will not be an error, rather we will show a different UI or redirect user to dashboard
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: data.msg,
            })
            setValues({
                email: '',
                password: '',
                showPassword: false,
            })
            return
        } catch (error) {
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                    'There was a problem with our server, please try again later',
            })
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                התחברות
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="מייל"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange('email')}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמא"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange('password')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    התחבר
                </Button>
            </Box>
            {errors.fetchError && <Alert severity="error"> {errors.fetchErrorMsg}</Alert>
}
        </Box>
    );
}