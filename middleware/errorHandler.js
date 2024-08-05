export const errorHandler = (err, req, res) => {
    return res.status(500).json({ message: err.message });
}
