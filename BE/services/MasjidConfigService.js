const db = require("../models");

exports.findAll = async () => {
  try {
    const result = await db.masjidconfig.findAll({
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findOne = async () => {
  try {
    const result = await db.masjidconfig.findOne({
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await db.masjidconfig.findByPk(id);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.create = async (data) => {
  try {
    const result = await db.masjidconfig.create(data);
    // console.log('result', result)
    return result;
  } catch (e) {
    throw e;
  }
};

exports.update = async (id, data) => {
  try {
    const result = await db.masjidconfig.update(data, {
      where: { Id: id },
    });
  } catch (e) {
    throw e;
  }
};

exports.delete = async (id) => {
  try {
    const result = await db.masjidconfig.destroy({
      where: { Id: id },
    });
    return result;
  } catch (e) {
    throw e;
  }
};
