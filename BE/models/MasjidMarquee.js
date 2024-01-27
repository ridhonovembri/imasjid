module.exports = (sequelize, Sequelize) => {
    const MasjidMarquee = sequelize.define(
      "masjidmarquee",
      {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'ID'
        },
        MarqueeText: {
          type: Sequelize.STRING,
          field: 'MARQUEE_TEXT'
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
        tableName: 'MASJID_MARQUEE'
      }
    );
  
    return MasjidMarquee;
  };
  