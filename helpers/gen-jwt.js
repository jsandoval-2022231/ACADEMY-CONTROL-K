const e = require('express');
const jwt = require('jsonwebtoken');

const genJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h'
            },
            (err, token) => {
                err ? (console.log(err),reject('Token was not generated')) : resolve(token)
            }
        )
    })
}

module.exports = {
    genJWT
}