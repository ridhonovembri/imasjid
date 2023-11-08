const db = require("../models");

exports.findAll = async () => {
  try {
    const result = await db.masjidslides.findAll({
      orderBy: [["Sequence", "ASC"]],
    });

    // console.log("result", result);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await db.masjidslides.findByPk(id);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByName = async (name) => {
  // console.log('service', name)
  try {
    const result = await db.masjidslides.findOne({ where: { ImgName: name } });

    // console.log('result', result)

    return result;
  } catch (e) {
    throw e;
  }
};

exports.getSlides = async () => {
  try {
    const result = await db.masjidslides.findAll({
      order: [["Sequence", "ASC"]],
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.create = async (data) => {
  // console.log('services', data)
  try {
    const result = await db.masjidslides.create(data);
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
    const result = await db.masjidslides.update(data, {
      where: { Id: id },
    });
  } catch (e) {
    throw e;
  }
};

exports.delete = async (id) => {
  //   console.log("destroy==>", id);
  try {
    const result = await db.masjidslides.destroy({
      where: { Id: id },
    });
    return result;
  } catch (e) {
    throw e;
  }
};
