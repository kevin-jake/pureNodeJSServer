const express = require('express');

const router = express.Router();
const speakerRoute = require('./speakers_route')
const feedbackRoute = require('./feedback_route')

 module.exports = (param) => {
     const { speakerservice } = param;

    router.get('/', async (req, res, next) => {
        try {
            const speakerslist = await speakerservice.getListShort()
            const artwork = await speakerservice.getAllArtwork()
            
            const promises = []
    
            promises.push(speakerservice.getListShort())
            promises.push(speakerservice.getAllArtwork())
    
            const results = await Promise.all(promises);
    
            return res.render('index', {
                page: 'Home',
                speakerslist: results[0],
                artworks: results[1]
            });
        }
        catch (err){
            return next(err)
        }
        
    });

    router.use('/speakers',speakerRoute(param))
    router.use('/feedback', feedbackRoute(param))

    return router;    
};

