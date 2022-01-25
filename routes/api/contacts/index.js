import express from "express";
import ContactControllers from "../../../controllers/contacts/";

import {
  validationCreate,
  validationUpdate,
  validationId,
  validationUpdateFavorite,
} from "../../../middlewares/contacts/validation";

import guard from "../../../middlewares/guard";

const router = express.Router();
const contactControllers = new ContactControllers();

router.get("/", guard, contactControllers.getContacts);

router.get("/:id", [guard, validationId], contactControllers.getContactById);

router.post("/", [guard, validationCreate], contactControllers.addContact);

router.delete("/:id", [guard, validationId], contactControllers.removeContact);

router.put(
  "/:id",
  [guard, validationId, validationUpdate],
  contactControllers.updateContact
);

router.patch(
  "/:id/favorite",
  [guard, validationId, validationUpdateFavorite],
  contactControllers.updateContact
);

export default router;
