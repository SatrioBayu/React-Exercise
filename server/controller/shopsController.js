const { Shop } = require("../models");
const path = require("path");
const fs = require("fs");

const publicDirectory = path.join(__dirname, "../../client/public/images");

const getById = async (req, res) => {
  const item = await Shop.findByPk(req.params.id);
  return res.send(item);
};

const list = async (req, res) => {
  const shops = await Shop.findAll({
    order: [["id", "ASC"]],
  });
  return res.send(shops);
};

const create = async (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.fileName,
    price: req.body.price,
  };
  const item = await Shop.create(data);
  return res.send(item);
};

const update = async (req, res) => {
  const item = await Shop.findByPk(req.params.id);
  const updated = await item.update({
    name: req.body.name,
    description: req.body.description,
    image: req.body.fileName,
    price: req.body.price,
    createdAt: item.createdAt,
    updatedAt: new Date(),
  });
  return res.send(updated);
};

const deleteData = async (req, res) => {
  const car = await Shop.findByPk(req.params.id);
  fs.unlink(publicDirectory + `/${car.image}`, (err) => {
    if (err) throw err;
  });
  await Shop.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.send({ message: "Data deleted" });
};

module.exports = { list, create, deleteData, update, getById };
