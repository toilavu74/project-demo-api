const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();
const countryValidation = require("../../validation/countryValidation/countryValidation");
const countryModel = require("../../models/countryModel/countryModel");

const createCountry = async (req, res) => {
  const data = req.body;
  const errors = countryValidation(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const country = await countryModel.createCountry(data);
  return res.json(country);
};

const editCountry = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  console.log(data);
  const errors = countryValidation(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const country = await countryModel.editCountry(id, data);
  return res.json(country);
};

const deleteCountry = async (req, res) => {
  const id = parseInt(req.params.id);
  const country = await countryModel.deleteCountry(id);
  return res.json(country);
};

const listCountry = async (req, res) => {
  const country = await countryModel.listCountry();
  return res.json(country);
};

const getCountryById = async (req, res) => {
  const id = parseInt(req.params.id);
  const country = await countryModel.getCountryById(id);
  return res.json(country);
};
module.exports = {
  createCountry,
  editCountry,
  deleteCountry,
  listCountry,
  getCountryById,
};
