const db = require("../models");

exports.findAll = async () => {
  try {
    console.log('access from client')
    const result = await db.masjidinfo.findAll({
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findOne = async () => {
  try {
    console.log('access from client')
    const result = await db.masjidinfo.findOne({
    });

    // console.log('result', result)
    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await db.masjidinfo.findByPk(id);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.create = async (data) => {
  try {
    const result = await db.masjidinfo.create(data);
    // console.log('result', result)
    return result;
  } catch (e) {
    throw e;
  }
};

exports.update = async (id, data) => {
  // console.log('id', id)
  // console.log('data', data)
  try {
    const result = await db.masjidinfo.update(data, {
      where: { Id: id },
    });
  } catch (e) {
    throw e;
  }
};

exports.delete = async (id) => {
  try {
    const result = await db.masjidinfo.destroy({
      where: { Id: id },
    });
    return result;
  } catch (e) {
    throw e;
  }
};
