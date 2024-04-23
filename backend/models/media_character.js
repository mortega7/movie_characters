import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class media_character extends Model {
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
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'character_data',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'media_character',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "media_id" },
          { name: "character_id" },
        ]
      },
      {
        name: "fk_media_has_character_character1_idx",
        using: "BTREE",
        fields: [
          { name: "character_id" },
        ]
      },
      {
        name: "fk_media_has_character_media1_idx",
        using: "BTREE",
        fields: [
          { name: "media_id" },
        ]
      },
    ]
  });
  }
}
