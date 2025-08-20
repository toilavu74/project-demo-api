const userValidation = (data, file) => {
  const errors = {};
  if (!data.name) {
    errors.name = "vui long nhap ten";
  }
  if (!data.password) {
    errors.password = "vui long nhap mat khau";
  }
  if (!data.email) {
    errors.email = "vui long nhap email";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "email ko dung dinh dang";
    }
  }
  if (!data.phone) {
    errors.phone = "vui long nhap sdt";
  } else {
    if (!/^\d+$/.test(data.phone)) {
      errors.phone = "sdt phai la so";
    }
  }
  if (!data.address) {
    errors.address = "vui long nhap dia chi";
  }
  if (!data.id_country) {
    errors.id_country = "vui long nhap quoc gia";
  }
  if (file.length == 0) {
    errors.avatar = "Vui lòng upload avatar";
  } else {
    file.map((value, key) => {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFormats.includes(value.mimetype)) {
        errors.avatar =
          "Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF";
      }
      const maxSize = 1024 * 1024;
      if (value.size > maxSize) {
        errors.avatar =
          "Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB";
      }
    });
  }
  return errors;
};
module.exports = userValidation;
