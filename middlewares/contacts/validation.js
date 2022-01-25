import Joi from "joi";
import pkg from "mongoose";
const { Types } = pkg;

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

export const validationCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "any.required") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "")}` });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validationUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "object.missing") {
      return res.status(400).json({ message: "missing fields" });
    }

    return res
      .status(400)
      .json({ message: `${err.message.replace(/"/g, "")}` });
  }
  next();
};

export const validationUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "object.missing") {
      return res.status(400).json({ message: "missing fields favorite" });
    }

    return res.status(404).json({ message: "Not found" });
  }
  next();
};

export const validationId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};
