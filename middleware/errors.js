function errorHandler(err, req, res, next){
    let status = 500 || err.status
    let message = err.message || 'internal server error'
    console.log(err);
    switch (err.name){
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = err.errors[0].message
            break;
         case 'RequireInput':
            status = 400
            message = 'email/password is required'
            break;
        case 'InvalidUser':
            status = 401
            message = 'invalid email/password'
            break;
        case 'InvalidToken':
        case 'Forbidden':
        case 'JsonWebTokenError':
            status = 403;
            message = 'Access Denied';
            break;
        case 'NotFound':
            status = 404;
            message = 'Data not found';
            break;
    }

    res.status(status).json({message})
}

module.exports = errorHandler