// import express, { Request, Response } from 'express';
// import cors from 'cors'
// import 'dotenv/config'

// import connectDB from './configs/db.js';
// import session from 'express-session'
// import MongoStore from 'connect-mongo'
// import AuthRouter from './routes/AuthRoutes.js';
// import ThumbnailRouter from './routes/ThumbnailRoutes.js';
// import UserRouter from './routes/UserRoutes.js';


// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean;
//         userId: string
//     }
// }

// await connectDB()

// const app = express();

// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:3000'],
//     credentials: true
// }))

// app.set('trust proxy', 1)

// app.use(session({
//     secret: process.env.SESSION_SECRET as string,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//         path: '/'
//     }, 
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI as string,
//         collectionName: 'sessions'
//     })
// }))

// app.use(express.json())

// app.get('/', (req: Request, res: Response) => {
//     res.send('Server is Live!');
// });
// app.use('/api/auth', AuthRouter)
// app.use('/api/thumbnail', ThumbnailRouter)
// app.use('/api/user', UserRouter)

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });



import 'dotenv/config'
 
import express, { Request, Response } from 'express';
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
 import ContactRouter from './routes/ContactRoutes.js';
import connectDB from './configs/db.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailRoutes.js';
import UserRouter from './routes/UserRoutes.js';
 
declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string
    }
}
 
await connectDB()
 
// Sanity check: confirm Cloudinary picked up CLOUDINARY_URL correctly.
// If cloud_name/api_key show as undefined, your .env value has a format
// problem (commonly stray quotes around CLOUDINARY_URL).
console.log('Cloudinary config check:', {
    cloud_name: cloudinary.config().cloud_name,
    api_key: cloudinary.config().api_key,
})
 
const app = express();
 
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000','https://thumblify-client-nine.vercel.app'],
    credentials: true
}))
 
app.set('trust proxy', 1)
 
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    }, 
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: 'sessions'
    })
}))
 
app.use(express.json())
 
app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});
app.use('/api/auth', AuthRouter)
app.use('/api/thumbnail', ThumbnailRouter)
app.use('/api/user', UserRouter)
app.use('/api/contact', ContactRouter)
 
const port = process.env.PORT || 3000;
 
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});