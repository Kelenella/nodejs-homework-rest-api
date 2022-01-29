import { HttpCode } from "../../lib/constants";
import authService from "../../service/auth";
import { EmailService, SenderSendgrid } from "../../service/email";

class AuthControllers {
  async signup(req, res, next) {
    try {
      const { email } = req.body;
      const isUserExist = await authService.isUserExist(email);
      if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
          status: "error",
          code: HttpCode.CONFLICT,
          message: "Email in use",
        });
      }
      const userData = await authService.create(req.body);
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendgrid()
      );
      const isSend = await emailService.sendVerifyEmail(
        email,
        userData.verificationToken
      );
      delete userData.verificationToken;

      res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: { ...userData, isSendEmailVerify: isSend },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { email, password, subscription } = req.body;
    const user = await authService.getUser(email, password);
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    const token = authService.getToken(user);
    await authService.setToken(user.id, token);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { token, user: { email, subscription } },
    });
  }

  async logout(req, res, next) {
    await authService.setToken(req.user.id, (req.user.token = null));

    return res.status(200).json({ code: 200, message: "Logout Success" });
  }

  async current(req, res) {
    const { email, subscription } = req.user;
    const userToken = await req.user.token;
    const userId = await req.user.id;
    if (!userToken || !userId) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  }
}

export default new AuthControllers();
