const request = require('supertest');
const app = require('../src/server'); 

describe('Get Users', () => {
  it('responds with a list of users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('dob');
  });

  it('Post Users', async () => {
        const response = await request(app).post('/users',{
        "id":1,
         "name": "Phani",
         "email": "phani@mail.com",
         "dob": "18/07/1999"
     } );
    
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('email');
       expect(response.body[0]).toHaveProperty('dob');
      });

    it('Deleting Users', async () => {
            const response = await request(app).delete('/users/:id');
        
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('email');
           expect(response.body[0]).toHaveProperty('dob');
          });
});
