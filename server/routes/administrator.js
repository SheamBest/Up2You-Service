const express = require('express');
const bcrypt = require('bcrypt')
const {administrator} = require('../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const adminList = await administrator.findAll();
    res.status(200).json(adminList);
});

router.get(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'No id'})
    }
    const User = await administrator.findByPk(id);
    if (User == null)
    {
    res.status(464).json({message: 'user by id not found'})
    }
    else{
        res.status(200).json(User);
    }
});

router.post('/registrationA', async (req,res) => {
    const {second_name, first_name, password,phone_number} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        administrator.create({second_name, first_name,password: hash,phone_number});
    })
    res.status(200).json("Success!");
});

router.post('/loginA', async (req,res) => {
    const {password,phone_number} = req.body;
    console.log(req.body)
    if (!phone_number || !password) 
    {
        res.status(404).json({message: 'Login or Password --- Error'})
    }
    const SearchUser = await administrator.findOne({ where: { phone_number: phone_number} })
    if(!SearchUser)
    {
        res.status(404).json({message: 'such user does not exist'})
    }
    else
    {
    bcrypt.compare(password,SearchUser.password).then((match) =>{
        if(!match)
        {
            res.status(401).json({message: 'password is incorrect'})
        }
        else
        {
        res.status(200).json(SearchUser);
    }
    })
    }
});

router.put(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    const UserBody = req.body;
    const Useritem = await administrator.update(UserBody, { where: { user_id: id} })
    if(!id) {
        res.status(404).json({message: 'user not found'})
    }
    else{
        if (!Useritem) {
            res.status(464).json({message: 'failed to update user'})
        }
        else{
            res.status(200).json(Useritem);
        }
    } 
});

router.delete(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'id not specified'})
    }
    const UserWasDelete = await administrator.destroy({
        where: {user_id: id}})
    if (!UserWasDelete) {
    res.status(464).json({message: 'failed to delete user'})
    }
    else{
        res.status(200).json(UserWasDelete);
    }
});

module.exports = router;