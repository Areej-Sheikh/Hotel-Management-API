class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, CustomError);
        }
        this.name = this.constructor.name;
    }
}
