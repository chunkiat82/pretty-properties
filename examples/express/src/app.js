import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import compare from './routes/compare';
import json from './routes/json';

const app = express();

// view engine setup
console.log(path.join(__dirname, '../views'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({    
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(cookieParser());
console.log(path.join(__dirname, '../public' ));
app.use(express.static(path.join(__dirname, '../public' )));

app.use('/', index);
app.use('/compare', compare);
app.use('/json', json);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
