const express = require('express');
const {service} = require('../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const Services = await service.findAll();
    res.status(200).json(Services);
});

router.get(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Services = await service.findByPk(id);
    if (Services == null)
    {
        res.status(464).json({message: 'Service by id not found'})
    }
    else{
        res.status(200).json(Services);
    }
});

router.get(`/byCategory/:category`, async (req,res) => {
    const category = req.params.category;
    if (!category)
    {
        res.status(404).json({message: 'Enter the category please!'})
    }
    else{
        const Services = await service.findAll({where:{category: category}});
    if (Services == null)
    {
        res.status(464).json({message: 'Service by category not found'})
    }
    else{res.status(200).json(Services);}}
});

router.post('/', async (req,res) => {
    const Services = req.body;
    await service.create(Services);
    res.status(200).json(Services);
});

router.put(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    const ServiceBody = req.body;
    const ServiceItem = await service.update(ServiceBody, { where: { service_id: id} });
    if(!id) {
        res.status(404).json({message: 'Service not found'})
    }
    else{
        if (!ServiceItem) {
            res.status(464).json({message: 'Could not update the service'})
        }
        else{
            res.status(200).json(ServiceItem);
        }
    }
});


router.delete(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const Services = await service.destroy({
        where: {service_id: id}})
        if (!Services) {
            res.status(464).json({message: 'Failed to delete service'})
        }
        else{
            res.status(200).json(Services);
        }
});
module.exports = router;