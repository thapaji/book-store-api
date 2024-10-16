import ContactSchema from "./ContactSchema.js";

export const saveContact = (contactData) => {
  const contact = new ContactSchema(contactData);
  return contact.save();
};

export const getAllContacts = () => {
  return ContactSchema.find().sort({ submittedAt: -1 });
};

export const getUnreadContacts = async () => {
  return await ContactSchema.find({ status: "unread" });
};

export const updateContactById = async (_id, updateData) => {
  try {
    const updatedContact = await ContactSchema.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    throw new Error("Error updating contact: " + error.message);
  }
};

export const deleteMessageById = (_id) => {
  return ContactSchema.findByIdAndDelete(_id);
};
