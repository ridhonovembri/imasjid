module.exports = (sequelize, Sequelize) => {
    const MasjidConfig = sequelize.define(
      "masjidconfig",
      {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'ID'
        },
        MinutesToAdzanShubuh: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_SHUBUH'
        },
        MinutesToAdzanDzuhur: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_DZUHUR'
        },
        MinutesToAdzanAshar: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_ASHAR'
        },
        MinutesToAdzanMaghrib: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_MAGHRIB'
        },
        MinutesToAdzanIsya: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_ISYA'
        },        
        MinutesToIqomahShubuh: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_IQOMAH_SHUBUH'
        },
        MinutesToIqomahDzuhur: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_IQOMAH_DZUHUR'
        },
        MinutesToIqomahAshar: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_IQOMAH_ASHAR'
        },
        MinutesToIqomahMaghrib: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_IQOMAH_MAGHRIB'
        },
        MinutesToIqomahIsya: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_IQOMAH_ISYA'
        },   
        MinutesToAdzanPrep: {
          type: Sequelize.INTEGER,
          field: 'MINUTES_TO_ADZAN_PREP'
        },     
        LabelShubuh: {
          type: Sequelize.STRING,
          field: 'LABEL_SHUBUH'
        },
        LabelSyuruq: {
          type: Sequelize.STRING,
          field: 'LABEL_SYURUQ'
        },
        LabelDzuhur: {
          type: Sequelize.STRING,
          field: 'LABEL_DZUHUR'
        },
        LabelAshar: {
          type: Sequelize.STRING,
          field: 'LABEL_ASHAR'
        },
        LabelMaghrib: {
          type: Sequelize.STRING,
          field: 'LABEL_MAGHRIB'
        },
        LabelIsya: {
          type: Sequelize.STRING,
          field: 'LABEL_ISYA'
        },
        AdjustShubuh: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_SHUBUH'
        },
        AdjustSyuruq: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_SYURUQ'
        },
        AdjustDzuhur: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_DZUHUR'
        },
        AdjustAshar: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_ASHAR'
        },
        AdjustMaghrib: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_MAGHRIB'
        },
        AdjustIsya: {
          type: Sequelize.INTEGER,
          field: 'ADJUST_ISYA'
        },
        TextBeforeAdzan: {
          type: Sequelize.STRING,
          field: 'TEXT_BEFORE_ADZAN'
        },
        TextBeforeIqomah: {
          type: Sequelize.STRING,
          field: 'TEXT_BEFORE_IQOMAH'
        }, 
        TextDuringSholat1: {
          type: Sequelize.STRING,
          field: 'TEXT_DURING_SHOLAT1'
        }, 
        TextDuringSholat2: {
          type: Sequelize.STRING,
          field: 'TEXT_DURING_SHOLAT2'
        }, 
        Latitude: {
          type: Sequelize.INTEGER,
          field: 'LATITUDE'
        },
        Longitude: {
          type: Sequelize.INTEGER,
          field: 'LONGITUDE'
        },
        BgImgSholat: {
          type: Sequelize.STRING,
          field: 'BG_IMG_SHOLAT'
        }, 
        IconDuringSholat: {
          type: Sequelize.STRING,
          field: 'ICON_DURING_SHOLAT'
        }, 
        IntervalSlide: {
          type: Sequelize.INTEGER,
          field: 'INTERVAL_SLIDE'
        },
        IntervalHadist: {
          type: Sequelize.INTEGER,
          field: 'INTERVAL_HADIST'
        },
        SholatDuration: {
          type: Sequelize.INTEGER,
          field: 'SHOLAT_DURATION'
        },
        SoundLocation: {
          type: Sequelize.STRING,
          field: 'SOUND_LOCATION'
        },
        FontSizeMasjidname: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_MASJIDNAME'
        },
        FontSizeMasjidaddress: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_MASJIDADDRESS'
        },
        FontSizeDate: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_DATE'
        },
        FontSizeClockHourMinute: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_CLOCK_HOUR_MINUTE'
        },
        FontSizeClockSecond: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_CLOCK_SECOND'
        },
        FontSizeHadist: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_HADIST'
        },
        FontSizeMarquee: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_MARQUEE'
        },
        FontSizePrayerlabel: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_PRAYERLABEL'
        },
        FontSizePrayertime: {
          type: Sequelize.INTEGER,
          field: 'FONTSIZE_PRAYERTIME'
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
        timestamps: false,
        tableName: 'MASJID_CONFIG'
      }
    );
  
    return MasjidConfig;
  };
  