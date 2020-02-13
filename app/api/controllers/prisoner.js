const dataPath =  'app/api/models/prisoners.json';
const fs = require('fs');


module.exports = {
    // /pid/:PID
    getByPID: function(req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {
                let prisoner = JSON.parse(data).data.filter(({PID}) => PID === parseInt(req.params.pid))
                if (prisoner.length > 0) {
                    res.send(prisoner);
                }
                else {
                    res.sendStatus(404);
                }
                
            }
        });
    },
    // /name/:firstName/:lastName/:dob
    getByName: function(req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {
                let first_name = req.params.firstName[0].toUpperCase() + req.params.firstName.slice(1).toLowerCase()
                let last_name = req.params.lastName[0].toUpperCase() + req.params.lastName.slice(1).toLowerCase()
                let prisoners = JSON.parse(data).data
                    .filter(({firstName}) => firstName === first_name)
                    .filter(({lastName}) => lastName === last_name)
                    .filter(({dob}) => dob === req.params.dob)
                if (prisoners.length > 0) {
                    res.send(prisoners);
                }
                else {
                    res.sendStatus(404);
                }
                
            }
        });
    },
}