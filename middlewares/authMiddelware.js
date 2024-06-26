const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // try {
  //   const token = req.headers["authorization"].split(" ")[1];
  //   JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
  //     if (err) {
  //       return res.status(401).send({
  //         success: false,
  //         message: "Auth Failed",
  //       });
  //     } else {
  //       req.body.userId = decode.userId;
  //       next();
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(401).send({
  //     success: false,
  //     error,
  //     message: "Auth Failedd",
  //   });
  // }
  try {
    // Check if the 'authorization' header exists in the request
    if (!req.headers.authorization) {
      throw new Error("Authorization header missing");
    }
  
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];
  
    // Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        // If token verification fails, send a 401 Unauthorized response
        return res.status(401).send({
          success: false,
          message: "Authentication failed",
        });
      } else {
        // If token verification succeeds, attach the userId to the request object and call the next middleware
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    // If an error occurs, log the error and send a 401 Unauthorized response
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
  
};
