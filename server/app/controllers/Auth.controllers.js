const User = require("../models/User.model");
const sha256 = require("simple-sha256");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token.model");

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

  User.count({ where: { email: email, isActive: 1 } }).then((count) => {
    if (count > 0) {
      response.status(409).send({
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
            err: err,
          });
        });
    }
  });
};

exports.login = (request, response) => {
  const { email, password } = request.body;

  console.log({ email, password });
  const validationResult = validateLoginRequest(email, password);

  if (!validationResult.success) {
    response.status(400).send(validationResult);
    return;
  }

  User.findOne({ where: { email: email, isActive: 1 } })
    .then((user) => {
      if (!user) {
        response.status(401).send({
          success: false,
          message: "User with the provided email not found",
        });
        return;
      }

      if (user.password != sha256.sync(password)) {
        response.status(400).send({
          success: false,
          message: "Incorrect password for the provided email",
          token: null,
          refreshToken: null,
        });
        return;
      }

      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10h",
        }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_TOKEN_SECRET
      );

      const tokeRec = new Token({
        userId: user.id,
        refreshToken: refreshToken,
      });

      tokeRec
        .save()
        .then(() => {
          console.log("Token created and saved");
        })
        .catch((err) => {
          console.log(err);
          response.status(500).send({
            message: "Could not save refresh token",
          });
        });

      response.status(200).send({
        success: true,
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return;
    })
    .catch((err) => {
      response.status(400).send({
        success: false,
        err: err,
        token: null,
        refreshToken: null,
      });
      console.log(err);
      return;
    });
};

exports.createToken = (request, response) => {
  const refreshToken = request.body.refreshToken;
  const validateTokenResult = validateCreateTokenRequest(refreshToken);
  if (!validateTokenResult.success) {
    response.status(400).send(validateTokenResult);
    return;
  }

  Token.findOne({ where: { refreshToken: refreshToken } })
    .then((token) => {
      if (!token) {
        response.status(401).send({
          success: false,
          message: "Invalid refresh token",
        });
        return;
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decodedUser) => {
          if (err) return response.status(403).send({ err: err });

          const accessToken = jwt.sign(
            decodedUser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          response.status(200).send({
            accessToken: accessToken,
          });
        }
      );
    })
    .catch((err) => {
      response.status(500).send({ err: err });
    });
};

const validateCreateTokenRequest = (refreshToken) => {

	return refreshToken == null ? ({ success: false, message: "A refresh token is required to generate a new one"}) :({success: true});
};

const validateLoginRequest = (email, password) => {
  return email == null || password == null
    ? {
        success: false,
        message: "Email and password and required",
      }
    : {
        success: true,
      };
};

const validateRegisterRequest = (email, password, userName, userStatus) => {
  if (email == null || !email.endsWith("@st-andrews.ac.uk")) {
    return {
      success: false,
      message: "Email issued by the university is required",
    };
  }

  if (password == null || password.length < 6 || password.length > 40) {
    return {
      success: false,
      message: "Password between 6 and 40 characters is required",
    };
  }

  if (userName == null || userName.length === 0) {
    return {
      success: false,
      message: "Name field is required",
    };
  }

  if (
    userStatus == null ||
    !["u1", "u2", "u3", "u4", "m1", "m2", "phd", "faculty"].includes(userStatus)
  ) {
    return {
      success: false,
      message:
        'Invalid status of your account. The options are: "u1", "u2", "u3", "u4", "m1", "m2", "phd", "faculty"',
    };
  }

  return {
    success: true,
    message: "Correct details",
  };
};
