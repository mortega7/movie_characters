import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class media extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_media_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'media_type',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    score: {
      type: DataTypes.DOUBLE(4,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'media',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_media_media_type1_idx",
        using: "BTREE",
        fields: [
          { name: "id_media_type" },
        ]
      },
      {
        name: 'idx_title',
        fields: ['title'],
      },
      {
        name: 'idx_creationDate',
        fields: ['creationDate'],
      },
    ]
  });
  }
}
