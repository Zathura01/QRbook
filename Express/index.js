const express = require('express');
const mongoose = require('mongoose');
const New = require('./userSchema');
const qr = require('qrcode');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const DateTimeEntry = require('./dateTimeEntrySchema')
const app = express();
const port = 2000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/QRBook')
  .then(() => {
    console.log('Connected to MongoDB');

    app.use(express.json());

    app.post('/api/submit', async (req, res) => {
      try {
        const newUser = new New({
          fullName: req.body.fullName,
          age: req.body.age,
          gender: req.body.gender,
          id: req.body.id
        });

        await newUser.save();
        const qrData = `Name: ${req.body.fullName}\nAge: ${req.body.age}\nGender: ${req.body.gender}\nID: ${req.body.id}`;
        const qrCodePath = path.join(__dirname, 'qr_codes', `${sanitizeFilename(req.body.fullName+req.body.id)}_qr_code.png`);
        await qr.toFile(qrCodePath, qrData);
        console.log(qrCodePath)
        res.status(200).send( qrCodePath );
      } catch (error) {
        console.error('Error saving user information:', error);
        res.status(500).send({ message: "Failed to save user information." });
      }
    });
    app.get('/api/data', async (req, res) => {
      try {
        const data = await New.find(); 
        res.json(data);
      } catch (error) {
        res.status(500).send("Error fetching data");
      }
    });

    app.post('/api/qrData', async (req, res) => {
      const receivedData = req.body;
      const modifiedData = { ...receivedData };
        const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      
      const hourMinute = `${hours}:${minutes}`;
      const date = new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
      });
      modifiedData.time = hourMinute;
      modifiedData.date = date;
        const trimmedData = {};
      Object.keys(modifiedData).forEach(key => {
          const trimmedKey = key.trim().replace(':', '');
          trimmedData[trimmedKey] = modifiedData[key];
      });
      console.log('Received data with custom timestamp and trimmed keys:', trimmedData);
      console.log(trimmedData.ID+' this is ID')
      const existingData = await New.findOne({ id: trimmedData.ID });
      if(!existingData){
        return res.status(404).send({ message: 'ID does not match any records.' });
      }
      console.log(existingData.fullName)
      let status = ''
      let statusUser = existingData.userStatus;
      if (statusUser % 2 == 1) {
        status = 'Good Bye';

    } else {
        status = 'Welcome';
    }

    await New.findOneAndUpdate(
      { id: trimmedData.ID },  
      { $inc: { userStatus: 1 } },  
    );
    
      res.send(status + "  " + existingData.fullName  );
      
const dateEntry = {
  id: trimmedData.ID, 
  date: modifiedData.date,
  time: modifiedData.time,
};
const newEntry = await DateTimeEntry.create(dateEntry);

  console.log('Date entry added:', newEntry);
  });
  

  app.get('/api/getData/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
      const data = await DateTimeEntry.find({ id: id });
      
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
        console.log(data)
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}
