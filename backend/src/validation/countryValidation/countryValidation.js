const countryValidation = (data) => {
  const errors = {};
  if (!data.name) {
    errors.name = "vui long nhap ten";
  }
  return errors;
};
module.exports = countryValidation;
