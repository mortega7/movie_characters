async function getAll(req, res) {
	const { genre } = req.models;

	try {
		const genres = await genre.findAll();
		res.status(200).json({ genres });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export { getAll };
