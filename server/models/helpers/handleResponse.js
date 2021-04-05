'use-strict'

// Send response to client as JSON
const handleJsonResponse = (res, number, message) => {
    res.status(number).send( message );
}

// Handle response for all queries
const handleResponse = ( err, res, result ) => {

    try {
        
        const queryValues = ['SELECT'];
        const sqlResult = result.command.trim();

        if (result.rows.length === 0 
        && queryValues.includes( sqlResult )  ) {
            // 'PG404' refers to an empty query result
            handleJsonResponse( res, 400, {error: 'PG404'} );

        } else {

            ( result.rows.length > 0 ) &&
                res.status(200).json(result.rows);

            ( result.rows.length === 0 ) &&
                handleJsonResponse( res, 200, {success: true} );
            
        }

    } catch (e) {
        handleJsonResponse( res, 400, {error: `${ err }` });
    }

}

module.exports = handleResponse;