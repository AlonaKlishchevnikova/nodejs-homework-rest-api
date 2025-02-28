const express = require('express')
const Joi = require("joi");
const contacts = require('../../models/contacts')
const router = express.Router()
const { HttpError } = require("../../helpers");
const addSchema = Joi.object({
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
})
router.get("/", async(req, res, next)=> {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    } 
    catch(error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
  try {

    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contacts with ${id} not found`);
    }
res.json(result);
  }
 catch(error) {
        next(error);
    }
 
})

router.post("/", async(req, res, next)=> {
  try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const result = await contacts.addContact(req.body);
     res.status(201).json({
        status: 'success',
        message: 'Contact created successfully',
       result
      });
    }
    catch(error) {
        next(error);
    }
})
 
router.delete('/:id', async (req, res, next) => {
  try {
        const {id} = req.params;
        const result = await contacts.removeContact(id);
        if(!result) {
            throw HttpError(404, `Contacts with ${id} not found`);
        }
        res.json({
            message: "Delete success"
        })
    }
    catch(error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
  try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await contacts.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, `Contact with ${id} not found`);
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

module.exports = router
