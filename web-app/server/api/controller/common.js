const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Connection = require("../blockchain/Connection");

//Login
exports.login = async (req, res, next) => {
  try {
    await User.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length == 0) {
          res.status(200).json({
            message: "invalid",
          });
          return;
        }
        if (user.length == 1) {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              res.status(500).json({
                message: "error",
              });
            }

            if (result) {
              const token = jwt.sign(
                {
                  username: user[0].username,
                  userId: user[0]._id,
                  role: user[0].role,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "356days",
                }
              );
              console.log({
                message: "successful",
                username: user[0].username,
                role: user[0].role,
                accessToken: token,
              });
              res.status(200).json({
                message: "successful",
                username: user[0].username,
                role: user[0].role,
                accessToken: token,
              });
            } else if (!result) {
              res.status(200).json({
                message: "invalid",
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};



//View Record
exports.get_product_information = async (req, res, next) => {
  try {
    let id = req.body.identifier;
    console.log(id);

    const contract = await Connection.connectToFabric();
    // Use the contract object to interact with the network
    const response = await contract.evaluateTransaction("getProductById", id);

    let result = JSON.parse(response);
    if (result.message == "invalid") {
      res.status(200).json({
        message: "invalid",
      });
    } else {
      console.log(result.product)
      res.status(200).json({
        message: "success",
        result: result.product,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};


