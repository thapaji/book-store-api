import ContactSchema from './ContactSchema.js';

export const saveContact = (contactData) => {
    const contact = new ContactSchema(contactData);
    return contact.save();
};

export const getAllContacts = () => {
    return ContactSchema.find().sort({ submittedAt: -1 });
};
