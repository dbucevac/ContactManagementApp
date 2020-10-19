const express = require('express');
const {contactValidationRules, validate} = require('./validator')
const router = express.Router();

//Contact Model

const Contact = require('../../models/Contact');

//@route GET api/contacts
//@desc Get all contacts
//@access Public

router.get('/', (req,res)=>{
    Contact.find()
           .sort({name: "asc"})
           .then(contacts => res.json(contacts))
})

//@route GET api/contacts/:id
//@desc Get a contact
//@access Public

router.get('/:id', (req,res)=>{
    Contact.findById(req.params.id)
           .then(contact => res.json(contact))
})

//@route POST api/contacts/add
//@desc Create a contact
//@access Public

router.post('/add',  contactValidationRules(), validate, (req,res)=>{

    const newContact = new Contact({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });
    newContact.save()
              .then(contact => res.json(contact));
})

//@route POST api/contacts/edit/:id
//@desc Modify a contact
//@access Public

router.post('/edit/:id', contactValidationRules(), validate, (req,res)=>{
    let contact = {};
    
    contact.name= req.body.name;
    contact.phoneNumber= req.body.phoneNumber;
    contact.email= req.body.email;

    let query = {_id:req.params.id}
    
    Contact.update(query, contact)
            .then(contact => res.json(contact))
           .catch(err=>res.status(404))
})

//@route DELETE api/contacts/:id
//@desc Delete a contact
//@access Public

router.delete('/:id', (req,res)=>{
    Contact.findById(req.params.id)
           .then(contact => contact.remove().then(()=>res.json({success: true})))
           .catch(err => res.status(404).json({success: false}))
})

module.exports = router;