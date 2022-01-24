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

import guard from "../../../middlewares/guard";

const router = express.Router();

router.get("/", guard, getContacts);

router.get("/:id", [guard, validationId], getContactById);

router.post("/", [guard, validationCreate], addContact);

router.delete("/:id", [guard, validationId], removeContact);

router.put("/:id", [guard, validationId, validationUpdate], updateContact);

router.patch(
  "/:id/favorite",
  [guard, validationId, validationUpdateFavorite],
  updateContact
);

export default router;
