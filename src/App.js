import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import {Button, Card, CardContent, Container, Typography} from "@mui/material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

// Utils
import { determineMinifigure } from './utils';

const MinifigureScanner = () => {
    const [minifigure, setMinifigure] = useState('');
    const videoRef = useRef(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        // Clean up function to stop the video stream
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleScan = async () => {
        try {
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current);
            const code = result.text;
            const figure = determineMinifigure(code);

            // Stop video stream after successful scan
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());

            setMinifigure(figure);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Minifigure Scanner
                    </Typography>
                    {minifigure && (
                        <Typography variant="body1">
                            Minifigure: {minifigure}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<QrCodeScannerIcon />}
                        onClick={handleScan}
                        style={{ marginTop: '20px' }}
                    >
                        Scan Barcode
                    </Button>
                    {!minifigure && (
                        <video ref={videoRef} style={{ width: '100%' }} />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default MinifigureScanner;
