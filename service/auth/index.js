import jwt from "jsonwebtoken";
import repositoryUsers from "../../repository/users";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await repositoryUsers.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, email, subscription, avatarURL, verificationToken } =
      await repositoryUsers.create(body);
    return { id, email, subscription, avatarURL, verificationToken };
  }

  async getUser(email, password) {
    const user = await repositoryUsers.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.verify) {
      return null;
    }
    return user;
  }

  async isSubscriptionSame(subscription) {
    const subscriptionUser = await repositoryUsers.update(subscription);
    return !!subscriptionUser;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
    return token;
  }

  async setToken(id, token) {
    await repositoryUsers.updateToken(id, token);
  }
}

export default new AuthService();
