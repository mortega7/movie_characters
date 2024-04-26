async function getAll(req, res) {
	const { genre } = req.models;

	try {
		const genres = await genre.findAll();
		res.status(200).json({ genres });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function getById(req, res) {
	const { genre, media_genre, media } = req.models;
	const { id } = req.params;

	try {
		const genres = await genre.findOne({
			where: { id },
			include: [
				{
					model: media_genre,
					as: 'media_genres',
					include: [
						{
							model: media,
							as: 'medias',
						},
					],
				},
			],
		});

		res.status(200).json({ genre: genres });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export { getAll, getById };
