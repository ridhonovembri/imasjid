module.exports = (sequelize, Sequelize) => {
    const MasjidHadist = sequelize.define(
      "masjidhadist",
      {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'ID'
        },
        HadistContent: {
          type: Sequelize.STRING,
          field: 'HADIST_CONTENT'
        },
        HadistFrom: {
          type: Sequelize.STRING,
          field: 'HADIST_FROM'
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
        tableName: 'MASJID_HADIST'
      }
    );
  
    return MasjidHadist;
  };
  