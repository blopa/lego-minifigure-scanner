import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

// Utils
import {determineMinifigure, isEmptyObject} from './utils';

const MinifigureScanner = () => {
    const [minifigure, setMinifigure] = useState({});
    const [scanning, setScanning] = useState(false);
    const videoRef = useRef(null);
    const codeReader = new BrowserMultiFormatReader();

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
        // Check if the stream is already active to prevent starting it again
        if (videoRef.current && videoRef.current.srcObject && videoRef.current.srcObject.active) {
            console.log('Stream is already active.');
            return;
        }

        setScanning(true);
    };

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
