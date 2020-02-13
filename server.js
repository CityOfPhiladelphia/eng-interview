const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// require routes
const admin = require('./routes/admin')
const prisoner = require('./routes/prisoner')
const warden = require('./routes/warden')

app.get('/', function(req, res){
    res.json({"live" : "this is live"});
});

app.use('/api/admin', validateAdmin, admin)
app.use('/api/warden', validateWarden, warden)
app.use('/api/prisoner', prisoner)

// export app for jest testing
module.exports = app;

function validateAdmin(req, res, next) {

    // default algorithm is SH256 https://github.com/auth0/node-jsonwebtoken#usage
    let token = extractToken(req) || null;
    if (token) {
        let parsedToken = tokenParser(token);
        if (parsedToken && parsedToken.role === 'Administrator') {
            return next()
        }
        else {
            console.log('ERROR: Not an Admin');
            res.sendStatus(404);
        }
    }
    else {
        console.log('ERROR: No Token Provided');
        res.sendStatus(404);
    }
}

function validateWarden(req, res, next) {

    // default algorithm is SH256 https://github.com/auth0/node-jsonwebtoken#usage
    let token = extractToken(req) || null;
    if (token) {
        let parsedToken = tokenParser(token);
        if (parsedToken && parsedToken.role === 'warden') {
            // adding token location to req in order to only parse token once
            req.location = parsedToken.location
            return next()
        }
        else {
            console.log('ERROR: Not a Warden');
            res.sendStatus(404);
        }
    }
    else {
        console.log('ERROR: No Token Provided');
        res.sendStatus(404);
    }
}

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

function tokenParser (token) {
    try {
        var decoded = jwt.decode(token, 'secret');
        if(decoded && decoded.role) {
            return decoded;
        }
        else {
            return null
        }
    } catch (err) {
        console.log(err)
        console.log('ERROR: Could not connect to the protected route');
        return null
    }
}

app.listen(3000, function(){ console.log('Live at: 3000');});