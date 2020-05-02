module.exports = (req, res, next) => {
    try{
        next()
    }
    catch(error){
        res.status(500).send(error);
    }
}