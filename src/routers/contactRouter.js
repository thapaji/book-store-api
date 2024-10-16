import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { saveContact, getAllContacts, updateContactById, deleteMessageById, getUnreadContacts } from "../model/contact/ContactModal.js";

const router = express.Router();

/*************** Admin Routes ***************/

router.put("/:_id", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const updatedContact = await updateContactById(_id, updateData);
    updatedContact
      ? res.json({
          status: "success",
          message: "Contact has been updated successfully",
          contact: updatedContact,
        })
      : res.status(404).json({
          status: "error",
          message: "Contact not found",
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const news = await deleteMessageById(_id);
    news?._id
      ? res.json({
          status: "success",
          message: "Message deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete message.",
        });
  } catch (error) {
    next(error);
  }
});

/*************** Public Routes ***************/

router.post("/", async (req, res, next) => {
  try {
    const contact = await saveContact(req.body);
    contact?._id
      ? res.json({
          status: "success",
          message: "Message sent successfully",
          contact,
        })
      : res.json({
          status: "error",
          message: "Unable to send message. Please try again",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const contactList = await getAllContacts({ status: "active" });
    res.json({
      status: "success",
      contact: contactList,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/unread", async (req, res, next) => {
  try {
    const unreadContacts = await getUnreadContacts();
    res.json({
      status: "success",
      unreadContacts,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
