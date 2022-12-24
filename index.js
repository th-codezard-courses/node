import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { serve } from './routes/index.js';

const app = express();
const port = process.env.PORT || 5_000;

await mongoose.connect(process.env.DATABASE_URL);
mongoose.set('toJSON', {
  virtuals: true,
  transform: (_doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const uploadDir = 'uploads/products';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
serve(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
