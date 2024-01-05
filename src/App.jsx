import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Button, Card, CardContent, Container, Typography, CardMedia } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

// Utils
import { determineMinifigure, isEmptyObject } from './utils';

const codeReader = new BrowserMultiFormatReader();

const MinifigureScanner = () => {
    const [minifigure, setMinifigure] = useState({});
    const [minifigureImage, setMinifigureImage] = useState('');
    const [scanning, setScanning] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Effect to start video stream
        if (scanning) {
            codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current)
                .then(result => {
                    setMinifigure(determineMinifigure(result.text));
                    setScanning(false);
                })
                .catch(err => console.error(err));
        }

        // Clean up function to stop the video stream
        return () => {
            stopStream();
        };
    }, [scanning]);

    const stopStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const handleScan = () => {
        setMinifigure({});
        setScanning(true);
    };

    const generateMinifigureImage = async (imageName) => {
        try {
            const image = await import(`./images/${imageName}`);
            setMinifigureImage(image.default);
        } catch (err) {
            console.error(err);
            return '';
        }
    };

    useEffect(() => {
        if (minifigure?.image) {
            generateMinifigureImage(minifigure.image);
        }
    }, [minifigure.image]);

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Minifigure Scanner
                    </Typography>
                    {!isEmptyObject(minifigure) && (
                        <>
                            <Typography variant="body1">
                                Minifigure: {minifigure.name}
                            </Typography>
                            <CardMedia
                                component="img"
                                image={minifigureImage}
                                alt={minifigure.name}
                                style={{ height: 'auto', maxWidth: '100%', marginTop: '20px' }}
                            />
                        </>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<QrCodeScannerIcon />}
                        onClick={handleScan}
                        disabled={scanning}
                        style={{ marginTop: '20px' }}
                    >
                        Scan Barcode
                    </Button>
                    {scanning && (
                        <video ref={videoRef} style={{ width: '100%' }} />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default MinifigureScanner;
