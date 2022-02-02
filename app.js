 const express = require('express'); 
 const app = express();
 const dotenv = require('dotenv');
dotenv.config();
 const ShortUrl = require('./models/shortUrl')
 const PORT = process.env.PORT || 3000;

const connection = require('./config/db.config');
connection.once('open', () => console.log('DB connected'))
connection.on('error', () => console.log('Error'))

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.set('view engine', 'ejs')


app.get('/', async (req,res)=> {
    try {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls });
    }
    catch (err) {
        console.log(err);
      }
})

app.post('/shortUrls', async (req, res) => {
    try {
        
    await ShortUrl.create({full: req.body.fullUrl})
   res.redirect('/')
    }
    catch (err) {
        console.log(err);
      }

})
app.get('/:shortUrl', async (req, res) => {
    try {
   const shortUrl = await ShortUrl.findOne ({ short: req.params.shortUrl })
   if(shortUrl == null) return res.sendStatus(404)
 
   res.redirect(shortUrl.full)
    }
    catch (err) {
        console.log(err);
      }
})



 app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));