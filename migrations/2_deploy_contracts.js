var CrowdFundFactory = artifacts.require("./CrowdFundFactory");

module.exports = function(deployer) {
  deployer.deploy(CrowdFundFactory);
};
