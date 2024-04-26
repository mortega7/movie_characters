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
	const { name, age, movies, history, weight } = req.query;
	let where = {};
	let whereCharacter = {};

	if (name) where.name = { [Op.like]: `%${name}%` };
	if (age) where.age = { [Op.eq]: age };
	if (history) where.history = { [Op.like]: `%${history}%` };
	if (weight) where.weight = { [Op.eq]: weight };
	if (movies) whereCharacter.media_id = { [Op.eq]: movies };

	try {
		const characters = await character_data.findAll({
			where,
			include: [
				{
					where: whereCharacter,
					model: media_character,
					as: 'media_characters',
					include: [
						{
							model: media,
							as: 'medias',
							include: [
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
						},
					],
				},
			],
		});

		res.status(200).json({ characters });
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
		const character = await character_data.findOne({
			where: { id },
			include: [
				{
					model: media_character,
					as: 'media_characters',
					include: [
						{
							model: media,
							as: 'medias',
							include: [
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
						},
					],
				},
			],
		});

		res.status(200).json({ character });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function create(req, res) {
	const transaction = await req.sequelize.transaction();

	try {
		const { character_data, media_character, media } = req.models;
		const { characterInfo, mediaInfo } = req.body;

		//Create the character
		const characterRecord = await character_data.create(characterInfo);

		//Associate the character with every media selected
		if (mediaInfo) {
			for (let mediaId of mediaInfo) {
				const mediaRecord = await media.findOne({
					where: { id: mediaId },
				});

				if (!mediaRecord) {
					throw new Error('Media not found.');
				}

				//Create the media_character association
				await media_character.create({
					media_id: mediaRecord.id,
					character_id: characterRecord.id,
				});
			}
		}

		res.status(201).json({ id: characterRecord.id });
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
		const { character_data, media_character, media } = req.models;
		const { id } = req.params;
		const { characterInfo, mediaInfo } = req.body;

		//Update the character
		const characterRecord = await character_data.findOne({
			where: { id },
		});

		if (!characterRecord) {
			throw new Error('Character not found.');
		}

		await characterRecord.update({ ...characterInfo });

		//Delete the media_characters
		await media_character.destroy({
			where: { character_id: characterRecord.id },
		});

		//Create new media_character associations
		if (mediaInfo) {
			for (let mediaId of mediaInfo) {
				const mediaRecord = await media.findOne({
					where: { id: mediaId },
				});

				if (!mediaRecord) {
					throw new Error('Media not found.');
				}

				await media_character.create({
					media_id: mediaRecord.id,
					character_id: characterRecord.id,
				});
			}
		}

		res.status(200).json({ id: characterRecord.id });
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
		const { character_data } = req.models;
		const where = { where: { id } };

		//Find the character
		const characterRecord = await character_data.findOne(where);

		if (!characterRecord) {
			throw new Error('Character not found.');
		}

		//Delete the character (soft)
		await character_data.destroy(where);

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
