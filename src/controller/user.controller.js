const login = (req, res) => {
    const username = req.body;
    res.status(200).json({username});


}


module.exports = { login };