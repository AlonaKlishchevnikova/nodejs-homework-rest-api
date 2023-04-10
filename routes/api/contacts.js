const express = require('express')

const router = express.Router()

const ctrl = require("../../controllers/contacts-controllers");

const {validateBody} = require("../../utils/validateBody");

const schemas = require("../../schemas/contacs");

router.get("/", ctrl.getAllContacts);
router.get('/:id', ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', ctrl.deleteContactById);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateContactById);
module.exports = router
