const express = require('express');
const router = express.Router();
const Url = require('../models/UrlModel');


router.get("/:code", async (req,res) => {
    try {
        const url = await Url.findOne({
            urlCode:req.params.code
        })
        if(url){
            // when valid peform a redirect
            return res.redirect(url.longUrl)
        } else{
            return res.status(401).json("Url not found")
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json('server error')
    }
})

module.exports  = router