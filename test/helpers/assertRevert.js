const should = require("chai").should();

module.exports.assertRevert = async function (promise, message) {
  try {
    await promise;
  } catch (error) {
    const withMessage = message ? message : "revert";

    error.message.should.include(
      withMessage,
      `Expected "revert", got ${error} instead`
    );
    return;
  }
  should.fail("Expected revert not received");
};
