import { HttpCode } from "../../lib/constants";
import repositoryUsers from "../../repository/users";
import {
  UploadFileStorage,
  LocalFileStorage,
} from "../../service/file-storage";

import { EmailService, SenderNodemailer } from "../../service/email";

class UserControllers {
  async uploadAvatar(req, res, next) {
    const uploadFileStorage = new UploadFileStorage(
      LocalFileStorage,
      req.file,
      req.user
    );
    const avatarUrl = await uploadFileStorage.updateAvatar();
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
  }

  async verifyUser(req, res, next) {
    const verifyToken = req.params.token;
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);

    if (userFromToken) {
      await repositoryUsers.updateVerify(userFromToken.id, true);

      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { message: "Verification successful!" },
      });
    }
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: { message: "User not found!" },
    });
  }

  async repeatEmailForVerifyUser(req, res, next) {
    const { email } = req.body;
    const user = await repositoryUsers.findByEmail(email);

    if (user) {
      const { email, verificationToken } = user;
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderNodemailer()
      );
      const isSend = await emailService.sendVerifyEmail(
        email,
        verificationToken
      );
      if (isSend) {
        return res.status(HttpCode.OK).json({
          status: "success",
          code: HttpCode.OK,
          data: { message: "Verification email sent!" },
        });
      }
      return res.status(HttpCode.SU).json({
        status: "error",
        code: HttpCode.SU,
        data: { message: "Service Unavailable!" },
      });
    }

    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: { message: "Verification has already been passed!" },
    });
  }
}

export default new UserControllers();
