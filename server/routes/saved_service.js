const express = require('express');
const {saved_service} = require('../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const Saved = await saved_service.findAll();
    res.status(200).json(Saved);
});

router.get(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Saved = await saved_service.findByPk(id);
    if (Saved == null)
    {
        res.status(464).json({message: 'Saved service by id not found'})
    }
    else{
        res.status(200).json(Saved);
    }
});

router.post('/', async (req,res) => {
    const Saved = req.body;
    await saved_service.create(Saved);
    res.status(200).json(Saved);
});

router.delete(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Saved = await saved_service.destroy({
        where: {saved_id: id}})
        if (!Saved) {
            res.status(464).json({message: 'Failed to delete from saved'})
        }
        else{
            res.status(200).json(Saved);
        }
});

module.exports = router;