const notFound = (req,res) =>{
    return res.send('route does not exist');
}

module.exports = notFound;