/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/constants";
import { UploadFileService, LocalFileStorage } from "../../service/fileStorage";

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvatar();
  res.status(HttpCode.OK).json({
    status: "Success",
    code: HttpCode.OK,
    data: { avatarUrl },
  });
};

export { uploadAvatar };
