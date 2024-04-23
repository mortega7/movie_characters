import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class character_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    age: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'character_data',
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
        name: 'idx_name',
        fields: ['name'],
      },
      {
        name: 'idx_age',
        fields: ['age'],
      },
      {
        name: 'idx_weight',
        fields: ['weight'],
      },
      {
        name: 'idx_history',
        type: 'fulltext',
        fields: ['history'],
      },
    ]
  });
  }
}
