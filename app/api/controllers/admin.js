const dataPath =  'app/api/models/prisoners.json';
const fs = require('fs');

// /admin/:location
module.exports = {
    getByLocation: function(req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {
                //allows user to input uppercase or lowercase
                let userLocation =  req.params.location[0].toUpperCase() + req.params.location.slice(1).toLowerCase()
                let prisoners = JSON.parse(data).data.filter(({location}) => location === userLocation)
                if (prisoners.length > 0) {
                    res.send(prisoners);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    }
}