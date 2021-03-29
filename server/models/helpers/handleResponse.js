'use-strict'

// Send error to client as JSON
const handleJsonError = (res, err) => {
    res.status(400).send({ error: err });
}

// Handle response for all queries
const handleResponse = ( err, res, result ) => {

    try {
        
        if (result.rows.length === 0) {
            // 'PG404' refers to an empty query result
            handleJsonError( res, 'PG404' );
        } else {
            res.status(200).json(result.rows);
        }

    } catch (e) {
        handleJsonError( res, err.code );
    }

}

module.exports = { handleResponse }