import { Op } from 'sequelize';

async function getAll(req, res) {
	const {
		character_data,
		media_character,
		media,
		media_type,
		media_genre,
		genre,
	} = req.models;
	const { name, creation, score, type, genre: genreId, order } = req.query;
	let where = {};
	let whereGenre = {};
	let orderInfo = ['id', 'ASC'];

	if (name) where.title = { [Op.like]: `%${name}%` };
	if (creation) where.creationDate = { [Op.eq]: creation };
	if (score) where.score = { [Op.eq]: score };
	if (type) where.id_media_type = { [Op.eq]: type };
	if (genreId) whereGenre.genre_id = genreId;
	if (order) orderInfo = ['creationDate', order === 'ASC' ? 'ASC' : 'DESC'];

	try {
		const medias = await media.findAll({
			where,
			order: [orderInfo],
			include: [
				{
					model: media_character,
					as: 'media_characters',
					include: [
						{
							model: character_data,
							as: 'character',
						},
					],
				},
				{
					model: media_type,
					as: 'media_types',
				},
				{
					where: whereGenre,
					model: media_genre,
					as: 'media_genres',
					include: [
						{
							model: genre,
							as: 'genre',
						},
					],
				},
			],
		});

		res.status(200).json({ medias });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function getById(req, res) {
	const {
		character_data,
		media_character,
		media,
		media_type,
		media_genre,
		genre,
	} = req.models;
	const { id } = req.params;

	try {
		const medias = await media.findOne({
			where: { id },
			include: [
				{
					model: media_character,
					as: 'media_characters',
					include: [
						{
							model: character_data,
							as: 'character',
						},
					],
				},
				{
					model: media_type,
					as: 'media_types',
				},
				{
					model: media_genre,
					as: 'media_genres',
					include: [
						{
							model: genre,
							as: 'genre',
						},
					],
				},
			],
		});

		res.status(200).json({ medias });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function create(req, res) {
	const transaction = await req.sequelize.transaction();

	try {
		const { character_data, media_character, media, media_genre, genre } =
			req.models;
		const { characterInfo, mediaInfo, genreInfo } = req.body;

		//Create the media
		const mediaRecord = await media.create(mediaInfo);

		//Associate the media with every character selected
		if (characterInfo) {
			for (let characterId of characterInfo) {
				const characterRecord = await character_data.findOne({
					where: { id: characterId },
				});

				if (!characterRecord) {
					throw new Error('Character not found.');
				}

				//Create the media_character association
				await media_character.create({
					media_id: mediaRecord.id,
					character_id: characterRecord.id,
				});
			}
		}

		//Associate the media with every genre selected
		if (genreInfo) {
			for (let genreId of genreInfo) {
				const genreRecord = await genre.findOne({
					where: { id: genreId },
				});

				if (!genreRecord) {
					throw new Error('Genre not found.');
				}

				//Create the media_genre association
				await media_genre.create({
					media_id: mediaRecord.id,
					genre_id: genreRecord.id,
				});
			}
		}

		res.status(201).json({ id: mediaRecord.id });
	} catch (err) {
		await transaction.rollback();

		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res.status(400).json({
				error: 'The specified object does not exist or is not valid.',
			});
		} else {
			res.status(500).json({
				error: err.message || 'An error occurred while processing the request.',
			});
		}
	}
}

async function updateById(req, res) {
	const transaction = await req.sequelize.transaction();

	try {
		const { character_data, media_character, media, media_genre, genre } =
			req.models;
		const { id } = req.params;
		const { characterInfo, mediaInfo, genreInfo } = req.body;

		//Update the media
		const mediaRecord = await media.findOne({
			where: { id },
		});

		if (!mediaRecord) {
			throw new Error('Media not found.');
		}

		await mediaRecord.update({ ...mediaInfo });

		//Delete the media_characters
		await media_character.destroy({
			where: { media_id: mediaRecord.id },
		});

		//Create new media_character associations
		if (characterInfo) {
			for (let characterId of characterInfo) {
				const characterRecord = await character_data.findOne({
					where: { id: characterId },
				});

				if (!characterRecord) {
					throw new Error('Character not found.');
				}

				await media_character.create({
					media_id: mediaRecord.id,
					character_id: characterRecord.id,
				});
			}
		}

		//Delete the media_genres
		await media_genre.destroy({
			where: { media_id: mediaRecord.id },
		});

		//Create new media_genre associations
		if (genreInfo) {
			for (let genreId of genreInfo) {
				const genreRecord = await genre.findOne({
					where: { id: genreId },
				});

				if (!genreRecord) {
					throw new Error('Genre not found.');
				}

				await media_genre.create({
					media_id: mediaRecord.id,
					genre_id: genreRecord.id,
				});
			}
		}

		res.status(200).json({ id: mediaRecord.id });
	} catch (err) {
		await transaction.rollback();

		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res.status(400).json({
				error: 'The specified object does not exist or is not valid.',
			});
		} else {
			res.status(500).json({
				error: err.message || 'An error occurred while processing the request.',
			});
		}
	}
}

async function deleteById(req, res) {
	try {
		const { id } = req.params;
		const { media } = req.models;
		const where = { where: { id } };

		//Find the media
		const mediaRecord = await media.findOne(where);

		if (!mediaRecord) {
			throw new Error('Media not found.');
		}

		//Delete the media (soft)
		await media.destroy(where);

		res.status(204).json();
	} catch (err) {
		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res.status(400).json({
				error: 'The specified object does not exist or is not valid.',
			});
		} else {
			res.status(500).json({
				error: err.message || 'An error occurred while processing the request.',
			});
		}
	}
}

export { getAll, getById, create, updateById, deleteById };
