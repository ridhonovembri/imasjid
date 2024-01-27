const db = require("../models");

exports.findAll = async () => {
  try {
    const result = await db.masjidmarquee.findAll({
    });

    // console.log('result', result)

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findOne = async () => {
  try {
    const result = await db.masjidmarquee.findOne({
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await db.masjidmarquee.findByPk(id);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.findByName = async (name) => {
  // console.log('service', name)
  try {
    const result = await db.masjidmarquee.findOne(
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
    const result = await db.masjidmarquee.create(data);
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
    const result = await db.masjidmarquee.update(data, {
      where: { Id: id },
    });
  } catch (e) {
    throw e;
  }
};

exports.delete = async (id) => {
//   console.log("destroy==>", id);
  try {
    const result = await db.masjidmarquee.destroy({
      where: { Id: id },
    });
    return result;
  } catch (e) {
    throw e;
  }
};
