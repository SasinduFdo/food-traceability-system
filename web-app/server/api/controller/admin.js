const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../model/user");
const Connection = require("../blockchain/Connection");

//Register Users
exports.register_user = async (req, res, next) => {
  try {
    console.log("register");
    console.log(req.body);
    await bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({
          message: "error",
        });
      } else {
        //creating an user object
        let user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: hash,
          role: "admin",
        });
        //saving the user
        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "saved",
            });
          })
          .catch((error) => {
            console.log(error.message);
            res.status(500).json({
              message: "error",
            });
          });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

//Update Product Safety Message
exports.update_product_safety_message = async (req, res, next) => {
  try {
    let id = req.body.identifier;
    let message = req.body.issue;

    const contract = await Connection.connectToFabric();
    // Use the contract object to interact with the network
    const response = await contract.submitTransaction(
      "updateSafetyMessage",
      id,
      message
    );
    let result = JSON.parse(response);
    console.log(result);

    if (result.message == "saved") {
      res.status(200).json({
        message: "success",
      });
    } else {
      //console.log(result)
      res.status(200).json({
        message: "error",
        result: result,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};
