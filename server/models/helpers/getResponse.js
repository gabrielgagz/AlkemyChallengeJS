// Handle response for all queries
const handleResponse = ( err, res, resl ) => {

    if (err) { throw err }
    res.status(200).json(resl.rows);

}

module.exports = { handleResponse }