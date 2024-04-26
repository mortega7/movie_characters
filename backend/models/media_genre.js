import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class media_genre extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'media',
        key: 'id'
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'media_genre',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "media_id" },
          { name: "genre_id" },
        ]
      },
      {
        name: "fk_media_has_genre_genre1_idx",
        using: "BTREE",
        fields: [
          { name: "genre_id" },
        ]
      },
      {
        name: "fk_media_has_genre_media1_idx",
        using: "BTREE",
        fields: [
          { name: "media_id" },
        ]
      },
    ]
  });
  }
}
