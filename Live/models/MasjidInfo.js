module.exports = (sequelize, Sequelize) => {
    const MasjidInfo = sequelize.define(
      "masjidinfo",
      {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'ID'
        },
        MasjidName: {
          type: Sequelize.STRING,
          field: 'MASJID_NAME'
        },
        MasjidAddress: {
          type: Sequelize.STRING,
          field: 'MASJID_ADDRESS'
        },
        City: {
          type: Sequelize.STRING,
          field: 'CITY'
        },
        Province: {
          type: Sequelize.STRING,
          field: 'PROVINCE'
        },
        BkmPic: {
          type: Sequelize.STRING,
          field: 'BKM_PIC'
        },
        BkmPhone: {
          type: Sequelize.STRING,
          field: 'BKM_PHONE'
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
        tableName: 'MASJID_INFO'
      }
    );
  
    return MasjidInfo;
  };
  