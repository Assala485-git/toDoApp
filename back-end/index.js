import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import tasks from './routes/tasks.js';
import users from './routes/users.js'
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/erreur.js';
import cookieParser from 'cookie-parser';
import path from 'path';

connectDB();
const app=express();
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/api/tasks',tasks);
app.use('/api/users',users);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    /*app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    }  );*/
  } else{
    app.get('/', (req, res) => {
        res.send('API IS RUNNING....');
    });
  }

//middleware functions
app.use(notFound);
app.use(errorHandler);

const PORT =process.env.PORT || 5000
app.listen(PORT,()=>console.log(`app is running on port ${PORT}`));  