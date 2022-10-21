require('dotenv').config();
require('express-async-errors')
// NOTE: I use express async errors so all errors within async function (in controllers) 
// are caught and passed to error handling middleware automatically

const express = require('express')
const app = express();

const connectDB = require('./db/connect')
const cloudinary = require('cloudinary')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.set('trust proxy',1); // express rate limit documentation says that this must be done if we wish to deploy on server
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes (milli seconds)
	max: 200, // Limit each IP to 200 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));


app.use(helmet());
app.use(cors({
    origin:["http://localhost:3000",'https://candid-faun-b0307e.netlify.app'],
    credentials:true,
    methods:['GET','POST','PATCH','DELETE']
}));
app.use(xss());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods','POST, GET, PATCH, DELETE') 
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postsRouter)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
})

const port = process.env.PORT || 5000;

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(port,()=>{
            console.log(`Server listening on port ${port}`)
        })
    }catch(err){
        console.log(err);
    }
}
start();