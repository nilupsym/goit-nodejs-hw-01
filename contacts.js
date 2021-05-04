const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contactById = contacts.find(contact => contact.id === contactId);
    const contactsList = JSON.stringify(contactById, null, 2);
    console.log(contactsList);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...contacts], null, 2);
    const parsedList = JSON.parse(contactsList);
    console.table(parsedList);
    await fs.writeFile(contactsPath, contactsList, (err) => { if (err) console.error(err) });

  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const deleteContact = contacts.filter(contact => contact.id !== contactId);
    const contactsList = JSON.stringify(deleteContact, null, 2);
    await fs.writeFile(contactsPath, contactsList, (err) => { if (err) console.error(err) });
    console.table(deleteContact);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};