import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

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
        <div>
            {minifigure && <p>Minifigure: {minifigure}</p>}
            <button onClick={handleScan}>Scan Barcode</button>
            {!minifigure && (
                <video ref={videoRef} style={{width: '100%'}}/>
            )}
        </div>
    );
};

export default MinifigureScanner;
