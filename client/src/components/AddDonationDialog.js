import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CityAutoComplete from '../components/CityAutoComplete';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const getBase64 = file => {
    return new Promise((resolve, reject) => {
        let baseURL = "";
        let reader = new FileReader();
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
        reader.onerror = (error) => {
            reject('FileReader error: ', error);
        };
        reader.readAsDataURL(file);

    });
};
const LoadingCircle = () => (
    <CircularProgress
        size={24}
        sx={{
            // color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
        }}
    />)
export default function AddDonationDialog({ isOpen, onClose }) {
    const [isLoadingImage, setIsloadingImage] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');

    const resetForm = () => {
        setImageFile(false)
        setTitle(false)
        setDescription(false)
        setCity(false)
    }
    const handleClose = () => {
        onClose(false);
        resetForm();

    };
    const handleImageUpload = async (imageFile) => {
        try {
            setIsloadingImage(true);
            const result = await getBase64(imageFile);
            setImageFile(result);
        } catch (error) {
            console.error(error)
        }
        setTimeout(() => setIsloadingImage(false), 1000)
    }
    const handleSubmit = async () => {
        try {
            await fetch('http://localhost:5001/api/create-donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    city,
                    description,
                    image: imageFile,
                }),
            })
        } catch (error) {
            console.error(error)
        }
        handleClose();
    }

    return (
        <Dialog
            fullWidth={true}
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>הוספת תרומה</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    מלא את פרטי התרומה
                </DialogContentText>
                <Stack>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="שם הפריט"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                    />
                    <CityAutoComplete onChange={setCity} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="תיאור התרומה"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        minRows={4}
                        multiline
                        onChange={e => setDescription(e.target.value)}
                    />
                </Stack>
                <Box display={'flex'} alignItems={'center'}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={isLoadingImage ? <LoadingCircle /> : <CloudUploadIcon />}
                        disabled={isLoadingImage}
                    >
                        העלה תמונה
                        <VisuallyHiddenInput onChange={(e) => {
                            handleImageUpload(e.target.files[0])
                        }} type="file" />
                    </Button>
                    {imageFile && !isLoadingImage && (
                        <img style={{ display: 'block', width: 50, height: 50, objectFit: 'cover', marginRight: 10 }} src={imageFile} />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ביטול</Button>
                <Button onClick={handleSubmit}>שלח</Button>
            </DialogActions>
        </Dialog>
    );
}