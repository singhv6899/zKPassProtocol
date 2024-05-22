const UserValidation = artifacts.require("UserValidation");

module.exports = function(deployer) {
  deployer.deploy(UserValidation);
};