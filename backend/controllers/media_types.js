async function getAll(req, res) {
	const { media_type } = req.models;

	try {
		const media_types = await media_type.findAll();
		res.status(200).json({ media_types });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export { getAll };
