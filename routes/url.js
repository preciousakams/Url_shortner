const express = require('express');
const validUrl = require('valid_url');
const shortid = require('shortid');
const router = express.Router();
const Url = require('../models/');

// The Api base url endpoint
const baseUrl = 'http://localhost:3000'

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    // check if url is valid using the validUrl.isUri method
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('invalid base url')
    }
    // if valid, then create the url code
    const urlCode = shortid.generate();

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        try {
            // check if long url is in the db, else create it
            let url = await Url.findOne ({
                longUrl
            })
            if(url) {
                res.json(url)
            }
            else {
                // join the generated shortcode with the base base url
                const shortUrl = baseUrl + '/' + urlCode

                // save to db
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json('Server error')
        }

    } else{
        res.status(401).json('invalid long url')
    }

})

module.exports = router