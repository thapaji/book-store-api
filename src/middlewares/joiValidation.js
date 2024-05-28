import Joi from "joi";

const STR = Joi.string();
const STR_REQUIRED = Joi.string().required();
const STR_EMAIL = Joi.string().email({ minDomainSegments: 2 });
const PHONE = Joi.string().allow('', null)

const joiValiValidator = ({ req, res, next, schema }) => {
    try {
        const { error } = schema.validate(req.body);
        error
            ? res.json({
                status: "error",
                message: error.message,
            })
            : next();
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const newUserValidation = (req, res, next) => {

    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        phone: Joi.string().allow("", null),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),
    });

    return joiValiValidator({ req, res, next, schema });
};

export const newBookValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        thumbnail: Joi.string().allow("", null),
        isbn: Joi.string().required(),
        publishedYear: Joi.string().required(),
        description: Joi.string().required(),
    });

    return joiValiValidator({ req, res, next, schema });
};

export const updateBookValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        thumbnail: Joi.string().allow("", null),
        status: Joi.string().required(),
        isbn: Joi.string().required(),
        publishedYear: Joi.number(),
        description: Joi.string().required(),
    });

    return joiValiValidator({ req, res, next, schema });
};

export const idValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
    });

    return joiValiValidator({ req, res, next, schema });
};