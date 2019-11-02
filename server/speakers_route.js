const express = require('express')

const router = express.Router();

module.exports = (params) => {
    const {speakerservice} = params;
router.get('/', async (req, res, next)=> {
        
    try {
        const promises = []
    
        promises.push(speakerservice.getList())
        promises.push(speakerservice.getAllArtwork())
    
        const results = await Promise.all(promises);
    
        
        return res.render('speakers', {
            page: 'All Speakers',
            speaker: results[0],
            artwork: results[1]
        })
    }
    catch(err){
        return next(err)
    }

})

router.get('/:name', async (req, res, next) => {
    try {
        const promises = []
        const shortname = req.params.name
        promises.push(speakerservice.getSpeaker(shortname))
        promises.push(speakerservice.getArtwork(shortname))
    
        const results = await Promise.all(promises);
    
        
        return res.render('detail', {
            page: shortname,
            speaker: results[0],
            artwork: results[1]

        })
    }
    catch(err){
        return next(err)
    }

})

return router;
}