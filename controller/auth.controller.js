const { genJWT } = require('../helpers/gen-jwt');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

let userIdentity = '';
let userName = '';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //veryfing if the email exists
        const user = await User.findOne({ email });
        userIdentity = user._id;
        userName = user.name;
        console.log(userIdentity);
        console.log(userName);
        if (!user) {
            return res.status(400).json({
                msg: "Email is not registered"
            });
        }

        //veryfing if the user is active
        if (!user.state) {
            return res.status(400).json({
                msg: "User is not on the database"
            });
        }

        //veryfing the password
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        console.log(validPassword);
        console.log(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is not valid"
            });
        }

        // if( password !== user.password){
        //     return res.status(400).json({
        //         msg: "Password is not valid"
        //     });
        // }

        const token = await genJWT(user.id);

        res.status(200).json({
            msg: 'Login successfully',
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
}

const getUserIdentity = () => {
    return userIdentity;
}

const getUserName = () => {
    return userName;
}

module.exports = {
    login,
    getUserIdentity,
    getUserName
}