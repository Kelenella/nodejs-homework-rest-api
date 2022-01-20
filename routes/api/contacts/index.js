import express from "express";
import {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../../controllers/contacts";

import {
  validationCreate,
  validationUpdate,
  validationId,
  validationUpdateFavorite,
} from "../../../middlewares/validation.js";

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", validationId, getContactById);

router.post("/", validationCreate, addContact);

router.delete("/:id", validationId, removeContact);

router.put("/:id", validationId, validationUpdate, updateContact);

router.patch(
  "/:id/favorite",
  validationId,
  validationUpdateFavorite,
  updateContact
);

export default router;
