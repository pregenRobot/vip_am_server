const User = require("../models/User.model");
const sha256 = require("simple-sha256");

exports.register = (request, response) => {
    const { email, password, userName, userStatus } = request.body;

    const validationResult = validateRegisterRequest(
        email,
        password,
        userName,
        userStatus
    );

    if (!validationResult["success"]) {
        response.status(400).send(validationResult);
        return;
    }

    User.count({ email: email }).then((count) => {
        if (count > 0) {
            response.status(400).send({
                success: false,
                message: "User with that email already exists",
            });
        } else {
            const user = new User({
                name: userName,
                email: email,
                password: sha256.sync(password),
                status: userStatus,
                isActive: 1,
            });

            user
                .save()
                .then(() => {
                    response.status(200).send({
                        success: true,
                        message: "Account created successfully",
                    });
                    return;
                })
                .catch((err) => {
                    console.log(err);
                    response.status(500).send({
                        success: false,
                        message: "Error while saving user",
                    });
                });
        }
    });
};

const validateRegisterRequest = (email, password, userName, userStatus) => {
    if (!email.includes("@st-andrews.ac.uk")) {
        return {
            success: false,
            message: "Email issued by the university is required",
        };
    }

    if (password.length < 6 || password.length > 40) {
        return {
            success: false,
            message: "Password between 6 and 40 characters is required",
        };
    }

    if (userName.length === 0) {
        return {
            success: false,
            message: "Name field is required",
        };
    }

    if (!["u1", "u2", "u3", "u4", "m1", "m2", "phd", "faculty"].includes(userStatus)) {
        return {
            success: false,
            message: 'Invalid status of your account. The options are: "u1", "u2", "u3", "u4", "m1", "m2", "phd", "faculty"',
        };
    }

    return {
        success: true,
        message: "Correct details",
    };
};