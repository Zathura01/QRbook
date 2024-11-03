import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Style.css';
import { QrcodeResultFormat } from 'html5-qrcode/esm/core';

function New() {
    const [qrpath,setqrpath]=useState('')
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        id: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:2000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Form submitted successfully');
                return response.text(); 
            } else {
                console.error('Failed to submit form');
            }
        })
        .then((qrCodePath) => {
            if (qrCodePath) {
                console.log('Downloading QR code:', qrCodePath);
                setqrpath(qrCodePath)
                
            }
            setFormData({
                fullName: '',
                age: '',
                gender: '',
                id: ''
            });
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
        });
    };
    const handleDownload = () => {
        if (qrpath) {
            const link = document.createElement('a');
            link.href = qrpath;
            link.download = 'qr_code.png'; 
            link.click();
        }
    };

    return (
        <div className='new-content center-content'>
            <Form className='FormNew' onSubmit={handleSubmit}>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullName">Full Name</Form.Label>
                        <Form.Control id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="age">Age</Form.Label>
                        <Form.Control id="age" name='age' value={formData.age} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="gender">Gender</Form.Label>
                        <Form.Control id="gender" name='gender' value={formData.gender} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id">ID</Form.Label>
                        <Form.Control id="id" name='id' value={formData.id} onChange={handleInputChange} />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </fieldset>
            </Form>
            {qrpath && (
                <Button variant="success" onClick={handleDownload}>Download QR Code</Button>
            )}
        </div>
    );
}

export default New;