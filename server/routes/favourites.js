const express = require('express');
const {favourites} = require('../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const Favourites = await favourites.findAll();
    res.status(200).json(Favourites);
});

router.get(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Favourites = await favourites.findByPk(id);
    if (Favourites == null)
    {
        res.status(464).json({message: 'Favourite service by id not found'})
    }
    else{
        res.status(200).json(Favourites);
    }
});

router.post('/', async (req,res) => {
    const Favourites = req.body;
    await favourites.create(Favourites);
    res.status(200).json(Favourites);
});

router.delete(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Favourites = await favourites.destroy({
        where: {favourite_id: id}})
        if (!Favourites) {
            res.status(464).json({message: 'Failed to delete from favourites'})
        }
        else{
            res.status(200).json(Favourites);
        }
});

module.exports = router;