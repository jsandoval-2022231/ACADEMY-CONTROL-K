const { request, response } = require('express');

const isAuthRole = (...roles) => {
    return ( req = request, res = response, next ) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'You want to verify the role without validating the token first'
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            });
        }

        next();
    };  

};


module.exports = {
    isAuthRole
};