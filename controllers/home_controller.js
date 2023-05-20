module.exports.home = async(req, res) => {
    console.log("/ request founded");
    res.send({ page: "home" });
}