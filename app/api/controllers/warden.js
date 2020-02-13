const dataPath =  'app/api/models/prisoners.json';
const fs = require('fs');

// /admin/:location
module.exports = {
    getInmates: function(req, res, next) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {
                //allows user to input uppercase or lowercase
                res.send(JSON.parse(data).data.filter(({location}) => location === req.location));
            }
        });
    }
}