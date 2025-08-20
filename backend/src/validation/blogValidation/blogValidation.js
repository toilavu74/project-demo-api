const blogValidation = (data, file) => {
  const errors = {};
  if (!data.title) {
    errors.title = "vui long nhap tieu de";
  }
  if (!data.description) {
    errors.description = "vui long nhap mo ta";
  }
  if (!data.content) {
    errors.content = "vui long nhap noi dung";
  }
  if (file.length == 0) {
    errors.image = "Vui lòng upload hinh anh";
  } else {
    file.map((value, key) => {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFormats.includes(value.mimetype)) {
        errors.image =
          "Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF";
      }
      const maxSize = 1024 * 1024; // 1MB
      if (value.size > maxSize) {
        errors.image =
          "Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB";
      }
    });
  }
  return errors;
};
module.exports = blogValidation;
