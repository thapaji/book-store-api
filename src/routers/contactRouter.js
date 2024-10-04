import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
    saveContact,
    getAllContacts
} from "../model/contact/ContactModal.js";


const router = express.Router();

/*************** Admin Routes ***************/

// Create a contact article (Admin only)
router.post("/", auth, isAdmin, async (req, res, next) => {
    try {
        const contact = await saveContact(req.body);
        contact?._id
            ? res.json({
                status: "success",
                message: "Contact has been added successfully",
                contact
            })
            : res.json({
                status: "error",
                message: "Unable to add contact. Please try again",
            });
    } catch (error) {
        next(error);
    }
});


/*************** Public Routes ***************/

// Get all active contact (Public)
router.get("/", async (req, res, next) => {
    try {
        const contactList = await getAllContacts({ status: "active" });
        res.json({
            status: "success",
            contact: contactList
        });
    } catch (error) {
        next(error);
    }
});

export default router;