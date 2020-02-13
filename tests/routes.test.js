const request = require('supertest')
const app = require('../server')

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE1MTYyMzkwMjJ9.NkOW8HHYMEVa8EUXy7TdlsS3tQRJkWbw7d68ax-f9eA';
const wardenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6IldhcmRlbiIsInJvbGUiOiJ3YXJkZW4iLCJsb2NhdGlvbiI6IkFsY2F0cmF6IiwiaWF0IjoxNTE2MjM5MDIyfQ.dVIceJwZutqWZlnwcwsSujOLI35TPxKoA9jPpD1TAZ4';

const defaultPrisoner = [
    {
        "PID": 1,
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    }
];

describe('Public Prisoner Endpoints', () => {
    it('should return prisoner with PID: 1', async () => {
        const res = await request(app)
            .get('/api/prisoner/pid/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(defaultPrisoner)
    })

    it('should return prisoner with first name: Dorcas, last name: Kozey , and date of birth: 2010-04-05', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/Dorcas/Kozey/2010-04-05')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(defaultPrisoner)
    })

    it('should return prisoner even though variables are not capitalized', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/dorcas/kozey/2010-04-05')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(defaultPrisoner)
    })

    it('should return prisoner even though all variables are capitalized', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/DORCAS/KOZEY/2010-04-05')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(defaultPrisoner)
    })
    
    it('should return 404 because PID Does not exist', async () => {
        const res = await request(app)
            .get('/api/prisoner/pid/100000')
        expect(res.statusCode).toEqual(404)
    })

    it('should return 404 because first name does not exist', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/XXXXXXXXXX/kozey/2010-04-05')
        expect(res.statusCode).toEqual(404)
    })

    it('should return 404 because last name does not exist', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/Dorcas/YYYYYYYYYYY/2010-04-05')
        expect(res.statusCode).toEqual(404)
    })

    it('should return 404 because date does not exist', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/Dorcas/Kozey/2044-04-05')
        expect(res.statusCode).toEqual(404)
    })
    
    it('should return 404 because dob is excluded from request', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/Dorcas/Kozey')
        expect(res.statusCode).toEqual(404)
    })
        
    it('should return 404 because either name field is excluded request', async () => {
        const res = await request(app)
            .get('/api/prisoner/name/Dorcas/2010-04-05')
        expect(res.statusCode).toEqual(404)
    })
})

describe('Private Admin Endpoints', () => {
    it('should return list of prisoners in Philadelphia', async () => {
        const res = await request(app)
            .get('/api/admin/Philadelphia')
            .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body[0].PID).toBe('number')
        expect(typeof res.body[0].firstName).toBe('string')
        expect(typeof res.body[0].lastName).toBe('string')
        expect(typeof res.body[0].dob).toBe('string')
        expect(typeof res.body[0].location).toBe('string')
    })

    it('should return 404 because XXXXX is not a valid location', async () => {
        const res = await request(app)
            .get('/api/admin/XXXXX')
            .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(404)
    })

    it('should return 404 because no location is requested', async () => {
        const res = await request(app)
            .get('/api/admin')
            .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(404)
    })

    it('should return 404 because of missing token', async () => {
        const res = await request(app)
            .get('/api/admin/Philadelphia')
        expect(res.statusCode).toEqual(404)
    })
})

describe('Private Warden Endpoints', () => {
    it('should return list of prisoners in Alcatraz', async () => {
        const res = await request(app)
            .get('/api/warden/inmates')
            .set('Authorization', `Bearer ${wardenToken}`)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body[0].PID).toBe('number')
        expect(typeof res.body[0].firstName).toBe('string')
        expect(typeof res.body[0].lastName).toBe('string')
        expect(typeof res.body[0].dob).toBe('string')
        expect(typeof res.body[0].location).toBe('string')
    })

    it('should return 404 because of missing token', async () => {
        const res = await request(app)
            .get('/api/warden/inmates')
        expect(res.statusCode).toEqual(404)
    })
})