const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({

    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message){
    if(!message.username) message.usernam = 'Anonymous';
    const result = schema.validate(message);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports =
    {
        getAll,
        create
    };