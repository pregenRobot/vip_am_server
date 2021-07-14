const { application } = require("express");
const User = require("../models/User.model");
const sha256 = require("simple-sha256");

// A request handler for regesitering a user into the User database
// Request body will look like the following:

// {
//     "email": "stuff",
//     "password": "stuff",
//     "userName": "stuff",
//     "userStatus": "stuff"
// }

exports.register = (request, response) => {
    const { email, password, userName, userStatus } = requesy.body;

    if (email.length === 0 || !email.includes("@st-andrews.ac.uk")) {
        response.status(400).json({
            success: false,
            message: "Email issued by the university is required",
        });
        return;
    }

    if (password.length < 6 || password.length > 40) {
        response.status(400).json({
            success: false,
            message: "Email is required",
        });
        return;
    }

    if (userName.length === 0) {
        response.status(400).json({
            success: false,
            message: "Email is required",
        });
        return;
    }

    if (email.length === 0) {
        response.status(400).json({
            success: false,
            message: "Email is required",
        });
        return;
    }
};

// exports.register = (request, response) => {
//     try {
//         ({ email, password, userName, userStatus } = request.body);

//         console.log(request.body);
//         console.log(sha256.sync(password));

//         sameEmailUserCount = User.count({ where: { email: email } })
//             .then((count) => {
//                 if (count > 0) {
//                     response.status(409).send({
//                         message: "User already exists! Could not create new user",
//                     });
//                     return;
//                 } else {
//                     User.create({
//                         id: null,
//                         name: userName,
//                         email: email,
//                         password: sha256.sync(password),
//                         status: userStatus,
//                         isActive: 1,
//                     });
//                     response.status(200).send({
//                         message: "Successfully created new user!",
//                     });
//                     return;
//                 }
//             })
//             .catch((err) => {
//                 response.status(503).send({
//                     message: err,
//                 });
//                 return;
//             });
//     } catch (err) {
//         response.status(503).send({
//             message: err,
//         });
//         return;
//     }
// };