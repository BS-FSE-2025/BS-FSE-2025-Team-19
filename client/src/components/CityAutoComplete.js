import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CityAutoComplete({ onChange, size }) {
    const [cities, setCities] = useState([]);
    const getCities = async (query) => {
        try {
            const res = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=50&q=${query}`);
            const data = await res.json();
            const mapedCities = data.result.records.map((item) => ({ label: item['שם_ישוב'].trim() }))
            setCities(mapedCities)
        } catch (error) {
            console.error('error ==> ', error)
        }
    }
    return (
        <Autocomplete
            disablePortal
            size={size}
            onChange={(event, newValue) => {
                const callback = onChange ? onChange : (() => { })
                callback(newValue.label.trim())
            }}
            id="city-dropdown"
            options={cities}
            getOptionLabel={(option) => option.label}
            noOptionsText={"אין תוצאה"}
            renderInput={(params) => (
                <TextField
                    onChange={(e) => {
                        getCities(e.target.value)
                    }}
                    size={size}
                    required
                    fullWidth
                    {...params}
                    label="עיר" />)}

        />
    )
}