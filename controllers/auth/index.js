// import repositoryUsers from "../../repository/users";
import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

// const signup = async (req, res, _next) => {
//   const { email } = req.body;
//   const isUserExist = await authService.isUserExist(email);
//   if (isUserExist) {
//     return res.status(HttpCode.CONFLICT).json({
//       status: "error",
//       code: HttpCode.CONFLICT,
//       message: "Email in use",
//     });
//   }
//   const data = await authService.create(req.body);
//   return res
//     .status(HttpCode.CREATED)
//     .json({ status: "success", code: HttpCode.CREATED, data });
// };

// const login = async (req, res, next) => {
//   const { email, password, subscription } = req.body;
//   const user = await authService.getUser(email, password);
//   if (!user) {
//     return res.status(HttpCode.UNAUTORIZED).json({
//       status: "error",
//       code: HttpCode.UNAUTORIZED,
//       message: "Email or password is wrong",
//     });
//   }
//   const token = authService.getToken(user);
//   await authService.setToken(user.id, token);
//   res.status(HttpCode.OK).json({
//     status: "success",
//     code: HttpCode.OK,
//     data: { token, user: { email, subscription } },
//   });
// };

// const logout = async (req, res, next) => {
//   await authService.setToken(req.user.id, null);
//    return res.status(HttpCode.NO_CONTENT).json({
//     status: "success",
//     code: HttpCode.NO_CONTENT,
//     message: "You was Logout",
//   });
// };

// const current = async (req, res) => {
//   const { email, subscription } = req.user;
//   const userToken = await req.user.token;
//   const userId = await req.user.id;
//   if (!userToken || !userId) {
//     return res.status(HttpCode.UNAUTORIZED).json({
//       status: "error",
//       code: HttpCode.UNAUTORIZED,
//       message: "Not authorized",
//     });
//   }

//   res.status(HttpCode.OK).json({
//     status: "success",
//     code: HttpCode.OK,
//     data: {
//       user: {
//         email,
//         subscription,
//       },
//     },
//   });
// };

// export { signup, login, logout, current };

class AuthControllers {
  async signup(req, res, _next) {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const data = await authService.create(req.body);
    return res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.CREATED, data });
  }

  async login(req, res, next) {
    const { email, password, subscription } = req.body;
    const user = await authService.getUser(email, password);
    if (!user) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "error",
        code: HttpCode.UNAUTORIZED,
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
    await authService.setToken(req.user.id, null);
    return res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
      message: "You was Logout",
    });
  }

  async current(req, res) {
    const { email, subscription } = req.user;
    const userToken = await req.user.token;
    const userId = await req.user.id;
    if (!userToken || !userId) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "error",
        code: HttpCode.UNAUTORIZED,
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

export default AuthControllers;
