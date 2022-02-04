const connect = require("./config/db.config");
const app = require('./app');
const supertest = require('supertest');


beforeEach(async() => {
    await connect();
  });

  test('GET /', async () => {
    const shorturl = await ShortUrl.create({
      full:
        'https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js',
      short: '3YD7hn5vr',
      
    });
  
    try{
    await supertest(app)
      .get('/:shortUrl')
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check the response data
       
        expect(response.body[0].full).toBe(shorturl.full);
        expect(response.body[0].short).toBe(shorturl.short);
        
      });
    }
    catch (err) {
        expect(err).toBe(err);
      }
  });

  test('POST /shortUrls', async () => {
    const data = {
        full:
        'https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js',
      short: '3YD7hn5vr',
      
    };
  
    try{
    await supertest(app)
      .post('/shortUrls')
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.full).toBe(data.full);
        expect(response.body.short).toBe(data.short);
       
  
        // Check the data in the database
        const Shorturl = await ShortUrl.findOne({ full: response.body.fullUrl });
        expect(Shorturl).toBeTruthy();
        expect(Shorturl.full).toBe(data.full);
        expect(Shorturl.short).toBe(data.short);
        
      });
    } catch (err) {
        expect(err).toBe(err);
      }
  });
  