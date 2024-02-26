const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        // verify the token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // read the user that corresponds to the uid
        const user = await User.findById(uid);

        // check if the user exists
        if(!user){
            return res.status(401).json({
                msg: 'The user does not exist'
            });
        }

        // check if the user is active
        if(!user.state){
            return res.status(401).json({
                msg: 'The user is not active'
            });
        }

        req.user = user;
        
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
};



module.exports = {
    validJWT
};