const db = require("../models");
const sequelize = require('sequelize');

exports.findAll = async () => {
  try {
    const result = await db.masjidhadist.findAll({
    });

    // console.log('result', result)

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findOne = async () => {
  try {
    const result = await db.masjidhadist.findOne({
      // order: db.masjidhadist.random, limit: 1
      // order: sequelize.random
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findRandom = async () => {
  try {
    const result = await db.masjidhadist.findAll({
      order: db.sequelize.random(), limit: 1
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await db.masjidhadist.findByPk(id);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByName = async (name) => {
  // console.log('service', name)
  try {
    const result = await db.masjidhadist.findOne(
      { where: { ImgName: name } }
    );

    // console.log('result', result)
    
    return result;
  } catch (e) {
    throw e;
  }
};

exports.create = async (data) => {
  // console.log('services', data)
  try {
    const result = await db.masjidhadist.create(data);
    // console.log('result', result)
    return result;
  } catch (e) {
    throw e;
  }
};

exports.update = async (id, data) => {

  // console.log('BE service: id', id)
  // console.log('BE: data service', data)

  try {
    const result = await db.masjidhadist.update(data, {
      where: { Id: id },
    });
  } catch (e) {
    throw e;
  }
};

exports.delete = async (id) => {
//   console.log("destroy==>", id);
  try {
    const result = await db.masjidhadist.destroy({
      where: { Id: id },
    });
    return result;
  } catch (e) {
    throw e;
  }
};
