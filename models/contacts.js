const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
  const contactsPath = path.join(__dirname, "../models/contacts.json");


const listContacts= async ()=> {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (id)=> {
    const contacts = await listContacts(id);
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.find(item => item.id === id);
    if (index === -1) {
        return null;
    }
      const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;

}

const addContact = async (name, email, phone)=> {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

}
const updateById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
  removeContact,
    updateById
}