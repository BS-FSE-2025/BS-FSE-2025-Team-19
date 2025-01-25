import React, { useState, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import validator from 'validator'
import { regexPassword } from '../utils'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../contexts/userContext'
import CityAutoComplete from '../components/CityAutoComplete';
import Alert from '@mui/material/Alert';


const defaultTheme = createTheme();

export default function SignUp() {
    const { setUserSession } = useContext(UserContext)
    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        fetchError: false,
        fetchErrorMsg: '',
    })
    const handleCityChange = (value) => {
        setValues({
            ...values,
            city: value,
        })
    }
    const handleChange = (fieldName) => (event) => {
        console.log('event ', event)
        const currValue = event.target.value
        switch (fieldName) {
            case 'email':
                validator.isEmail(currValue)
                    ? setErrors({ ...errors, email: false })
                    : setErrors({ ...errors, email: true })
                break

            case 'password':
                regexPassword.test(currValue)
                    ? setErrors({ ...errors, password: false })
                    : setErrors({ ...errors, password: true })
                break

            case 'repeatPassword':
                currValue === values.password
                    ? setErrors({ ...errors, repeatPassword: false })
                    : setErrors({ ...errors, repeatPassword: true })
                break
        }
        setValues({ ...values, [fieldName]: event.target.value })
    }

    const handleShowPassword = (showPasswordField) => {
        setValues({
            ...values,
            [showPasswordField]: !values[showPasswordField],
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    city: values.city,
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
            console.log('data ', data)
            setUserSession(data.userSession)
            // this is just a visual feedback for user for this demo
            // this will not be an error, rather we will show a different UI or redirect user to dashboard
            // ideally we also want a way to confirm their email or identity
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: data.msg,
            })
            setValues({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
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
                הרשמה
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="שם פרטי"
                            autoFocus
                            onChange={handleChange('firstName')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="שם משפחה"
                            name="lastName"
                            autoComplete="family-name"
                            onChange={handleChange('lastName')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="phone"
                            label="טלפון"
                            id="phone"
                            autoComplete="phone"
                            onChange={handleChange('phone')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CityAutoComplete onChange={handleCityChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="אימייל"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange('email')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="סיסמא"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={handleChange('password')}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    הרשמה
                </Button>
            </Box>
            {errors.fetchError && <Alert severity="error"> {errors.fetchErrorMsg}</Alert>}
        </Box>
    );
}