const { Router } = require('express');
const router = Router();
const { Diet } = require('../db');



let diets = [{ name: 'gluten free' }, { name: 'ketogenic' }, { name: 'vegetarian' }, { name: 'lacto-vegetarian' },
{ name: 'lacto ovo vegetarian' }, { name: 'vegan' }, { name: 'pescatarian' }, { name: 'paleolithic' }, { name: 'primal' },
{ name: 'whole 30' }];
module.exports = {
    diets
};

router.get('/', async (req, res) => {

    try {

        diets.forEach(e => {
            Diet.findOrCreate({
                where: { name: e.name }
            })
        })

        const dieti = await Diet.findAll();
        dieti.length ?
            res.send(dieti) :
            res.send('error al traer dietas');


    } catch (error) {

       console.error(error);

    }


})

module.exports = router;