import User from "../model/user";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const create = async (body) => {
  const user = new User(body);
  return await user.save();
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

const update = async (id, email, password, subscription, avatarURL) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { user: { email, password, subscription, avatarURL } },
    { new: true }
  );
  return result;
};

export default {
  findById,
  findByEmail,
  create,
  updateToken,
  update,
  updateAvatar,
};
