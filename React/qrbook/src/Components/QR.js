import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useState, useEffect } from 'react';
import './App.css';
import './Style.css';
import axios from 'axios';

function QR() {
    const [scanResult, setScanResult] = useState(null);
    const [stato, setStato]=useState(false);
    const [keyValuePairs, setKeyValuePairs] = useState({});
    const [showQRComponent, setShowQRComponent] = useState(true);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 400,
                height: 300,
            },
            fps: 5,
        });

        scanner.render(success);

        function success(result) {
            scanner.clear();
            setScanResult(result);
            setStato(true);
        }

        function error(err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (scanResult) {
            convertToJson(scanResult);
        }
    }, [stato]);

    const convertToJson = async (scannedResult) => {
        const parts = scannedResult.split(/\s/);
        const parsedKeyValuePairs = {};

        for (let i = 0; i < parts.length; i += 2) {
            const key = parts[i].trim();
            const value = parts[i + 1] ? parts[i + 1].trim() : '';
            parsedKeyValuePairs[key] = value;
        }

        setKeyValuePairs(parsedKeyValuePairs);
        console.log(parsedKeyValuePairs);
        await sendDataToBackend(parsedKeyValuePairs);
    };


    const sendDataToBackend = async (data) => {
        try {
            const response = await axios.post('http://localhost:2000/api/qrData', data);
            console.log('Data sent successfully:', data, response.data);
            alert(response.data);
            setShowQRComponent(false);
        } catch (error) {
            console.error('Error sending data:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                if (error.response.status === 404) {
                    alert('ID does not match any records.');
                } else {

                    alert('An error occurred. Please try again.');
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response from server. Check your network connection.');
            } else {
                console.error('Error message:', error.message);
                alert('Error in sending request.');
            }
        }
    };


    return (
        <div className="App">
            <h1>SCAN QR</h1>
            <div id="reader" style={{ width: '500px', height: '500px', margin: 'auto' }}></div>
            {
                scanResult && <QR />
            }
        </div>
    );
}

export default QR;
