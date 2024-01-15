const jwt = require('jsonwebtoken');
const User = require('../models/user.models')
const {
    response_500, response_404
} = require('../utils/responseCodes.utils');


async function isAuthorized(req, res, next) {
    const authToken = req.cookies.token || req.token;

    if (!authToken) {
        return response_404(res, 'no token provided');
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await User.findById(decoded);

        if (!user) {
            return response_404(res, "User not found");
        }

        req.body.user = user;
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return response_500(res, 'Failed to authenicate user', error);
    }

}


module.exports = isAuthorized;