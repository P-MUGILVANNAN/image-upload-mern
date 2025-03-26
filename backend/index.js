const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Image = require('./model/ImageModel'); // Import the Image model
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    })

// Multer Configuration (for file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload Route - Save Image to MongoDB
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save to MongoDB
        const newImage = new Image({
            imageName: req.body.imageName,
            imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
        });

        await newImage.save();

        res.json({ message: 'Image uploaded successfully', data: newImage });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

// Get all images
app.get('/photos', async (req, res) => {
    try {
      const photos = await Image.find(); // Fetch all images from MongoDB
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Delete image from DB and server
app.delete('/photos/:id', async (req, res) => {
    try {
        const photo = await Image.findById(req.params.id);
        
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        if (!photo.imageUrl) {
            return res.status(400).json({ message: "Image URL is missing" });
        }

        // Extract filename from imageUrl
        const filename = path.basename(photo.imageUrl); // Gets '1742203204876-naruto.jpg'
        const imagePath = path.join(__dirname, 'uploads', filename); // Constructs correct path

        console.log("Deleting file:", imagePath);

        // Check if file exists before deleting
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log("File deleted successfully.");
        } else {
            console.warn("File not found:", imagePath);
        }

        // Delete from MongoDB
        await Image.findByIdAndDelete(req.params.id);

        res.json({ message: "Photo deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Express app is running');
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
})