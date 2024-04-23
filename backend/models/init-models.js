import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _character_data from  "./character_data.js";
import _genre from  "./genre.js";
import _media from  "./media.js";
import _media_character from  "./media_character.js";
import _media_genre from  "./media_genre.js";
import _media_type from  "./media_type.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const character_data = _character_data.init(sequelize, DataTypes);
  const genre = _genre.init(sequelize, DataTypes);
  const media = _media.init(sequelize, DataTypes);
  const media_character = _media_character.init(sequelize, DataTypes);
  const media_genre = _media_genre.init(sequelize, DataTypes);
  const media_type = _media_type.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  character_data.belongsToMany(media, { as: 'media_id_media', through: media_character, foreignKey: "character_id", otherKey: "media_id" });
  genre.belongsToMany(media, { as: 'media_id_media_media_genres', through: media_genre, foreignKey: "genre_id", otherKey: "media_id" });
  media.belongsToMany(character_data, { as: 'character_id_character_data', through: media_character, foreignKey: "media_id", otherKey: "character_id" });
  media.belongsToMany(genre, { as: 'genre_id_genres', through: media_genre, foreignKey: "media_id", otherKey: "genre_id" });
  media_character.belongsTo(character_data, { as: "character", foreignKey: "character_id"});
  character_data.hasMany(media_character, { as: "media_characters", foreignKey: "character_id"});
  media_genre.belongsTo(genre, { as: "genre", foreignKey: "genre_id"});
  genre.hasMany(media_genre, { as: "media_genres", foreignKey: "genre_id"});
  media_character.belongsTo(media, { as: "medias", foreignKey: "media_id"});
  media.hasMany(media_character, { as: "media_characters", foreignKey: "media_id"});
  media_genre.belongsTo(media, { as: "medias", foreignKey: "media_id"});
  media.hasMany(media_genre, { as: "media_genres", foreignKey: "media_id"});
  media.belongsTo(media_type, { as: "media_types", foreignKey: "id_media_type"});
  media_type.hasMany(media, { as: "medias", foreignKey: "id_media_type"});

  return {
    character_data,
    genre,
    media,
    media_character,
    media_genre,
    media_type,
    user,
  };
}
