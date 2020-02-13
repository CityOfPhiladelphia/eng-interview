const faker = require('faker');
const fs = require('fs')

function generatePrisoners() {

    let prisoners = []

    // Testing User
    prisoners.push({
        "PID": 1,
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    })

    for (let id=2; id <= 50; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    const dates = ["2020-01-02", "2019-02-03", "2018-03-04", "2010-04-05"];
    let dob = dates[Math.floor(Math.random() * dates.length)];
    const locations = ["Philadelphia", "Newark", "Quakertown", "Lansdale", "Bethlehem", "Alcatraz"];
    let location = locations[Math.floor(Math.random() * locations.length)];

    prisoners.push({
        "PID": id,
        "firstName": firstName,
        "lastName": lastName,
        "dob": dob,
        "location": location
    });
    }

    return { "data": prisoners }
}

let dataObj = generatePrisoners();

fs.writeFileSync('./app/api/models/prisoners.json', JSON.stringify(dataObj, null, '\t'));