import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CityAutoComplete from '../components/CityAutoComplete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDonationDialog from '../components/AddDonationDialog';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import DonationItem from '../components/DonationItem';

function Donations() {
    const [isAddDonationOpen, setIsAddDonationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [donations, setDonations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [city, setCity] = useState('');
    console.log(city, searchQuery);
    const queryDonations = async () => {
        setIsLoading(true)
        fetch('http://localhost:5001/api/query-donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city, searchKey: searchQuery }),
        }).then((res) => {
            res.json().then((data) => {
                console.log('data ', data);
                setDonations(data.donations);
                setTimeout(() => setIsLoading(false), 500)
            })
        }).catch((error) => {
            console.log('error ', error)
            setTimeout(() => setIsLoading(false), 500)

        })
    }
    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:5001/api/get-donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({}),
        }).then((res) => {
            res.json().then((data) => {
                console.log('data ', data);
                setDonations(data.donations);
                setTimeout(() => setIsLoading(false), 500)
            })
        }).catch((error) => {
            console.log('error ', error)
            setTimeout(() => setIsLoading(false), 500)
        })
    }, [])
    return (
        <Container sx={{ marginTop: '40px' }}>
            <AddDonationDialog isOpen={isAddDonationOpen} onClose={setIsAddDonationOpen} />
            <Box>
                <Typography variant="h4">
                    חיפוש תרומות
                </Typography>
                <Paper elevation={2} sx={{ padding: '20px', margin: '20px 0' }}>
                    <Stack direction={'row'} justifyContent={'space-between'} flexWrap="nowrap">
                        <Box>
                            <Box
                                display={'flex'}
                                component="form"
                                sx={{
                                    '& > :not(style,button)': { mr: 2, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField onChange={(e) => setSearchQuery(e.target.value)} size='small' label="תיאור" variant="outlined" />
                                <CityAutoComplete onChange={(value) => { setCity(value) }} size={'small'} />
                                <Button onClick={() => queryDonations()} variant="outlined" startIcon={<SearchIcon />}>
                                    חפש
                                </Button>

                            </Box>

                        </Box>
                        <Button onClick={() => { setIsAddDonationOpen(true) }} variant="contained" startIcon={<AddCircleOutlineIcon />}>
                            הוספת תרומה
                        </Button>
                    </Stack>
                </Paper>
                {
                    isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <CircularProgress />
                    </Box>)
                }
                {!isLoading && donations.length > 0 && donations.map(({ title, description, city, image }) => {
                    return (
                        <Box>
                            <DonationItem title={title} city={city} description={description} image={image} />
                        </Box>

                    )
                })}

                {!isLoading && donations.length === 0 &&
                    <Typography align='center' variant="h4">
                        אין תוצאות
                    </Typography>
                }
            </Box>
        </Container>
    )
}

export default Donations;