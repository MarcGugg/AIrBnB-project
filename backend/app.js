const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const { environment } = require('./config')
const isProduction = environment === 'production';
//above statement is
//effectively same as |
//------------------  |
//------------------  |
//------------------ \/

// let isProduction;
// const { environment } = require('./config')
// if (environment.process.env.NODE_ENV === 'production') {
//     isProduction = true
// } else {
//     isProduction = false
// }

const app = express();
app.use(morgan('dev')); //middleware for logging info
                        //about requests and responses
app.use(cookieParser());
app.use(express.json())

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
);
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

app.use(routes)

module.exports = app;