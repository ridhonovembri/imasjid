module.exports = (sequelize, Sequelize) => {
    const MasjidSlides = sequelize.define(
      "masjidslides",
      {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'ID'
        },
        Sequence: {
          type: Sequelize.INTEGER,
          field: 'SEQUENCE'
        },        
        ImgName: {
          type: Sequelize.STRING,
          field: 'IMG_NAME'
        },
        ImgDesc: {
          type: Sequelize.STRING,
          field: 'IMG_DESC'
        },
        ImgSource: {
          type: Sequelize.STRING,
          field: 'IMG_SOURCE'
        },
        CreatedBy: {
          type: Sequelize.STRING,
          field: 'CREATED_BY'
        },
        ModifiedBy: {
          type: Sequelize.STRING,
          field: 'MODIFIED_BY'
        },
        
      },
      {
        // timestamps: false,
        tableName: 'MASJID_SLIDES'
      }
    );
  
    return MasjidSlides;
  };
  