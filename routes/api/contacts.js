const express = require('express')
const contacts = require('../../models/contacts');
const router = express.Router();

router.get("/", async(req, res, next)=> {
  try { 
    const result = await contacts.listContacts()
  res.status(200).json(result);
 }
    catch(error) {
        next(error);
    }
}
);

router.get('/:id', async (req, res, next) => {
  try {
      const {id} = req.params;
    const result = await contacts.getContactById(id);
    res.json(result);
  }
  catch (error) {
     next(error); 
  }
 
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router;
