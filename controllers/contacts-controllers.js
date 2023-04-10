const { ctrlWrapper } = require("../utils");
const contacts = require('../models/contacts');
const { HttpError } = require('../helpers');

const getAllContacts = async (req, res) => {
     const result = await contacts.listContacts();
        res.status(200).json(result);
}

const getContactById = async (req, res) => {
    
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contacts with ${id} not found`);
    }
res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
     res.status(201).json({
        status: 'success',
        message: 'Contact created successfully',
       result
      });
}

const updateContactById = async (req, res) => {
   const {id} = req.params;
        const result = await contacts.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, `Contact with ${id} not found`);
        }
        res.json(result);
}

const deleteContactById = async (req, res) => {
      const {id} = req.params;
        const result = await contacts.removeContact(id);
        if(!result) {
            throw HttpError(404, `Contacts with ${id} not found`);
        }
        res.json({
            message: "Delete success"
        })
}

module.exports = {
    getAllContactss: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    deleteContactById: ctrlWrapper(deleteContactById),
}