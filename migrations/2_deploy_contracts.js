var CrowdSourceFactory = artifacts.require("./CrowdSourceFactory");

module.exports = function(deployer) {
  deployer.deploy(CrowdSourceFactory);
};
