const calculateRideDuration = (fromPincode, toPincode) => {
  // Simple calculation: absolute difference of pincodes modulo 24
  const fromNum = parseInt(fromPincode) || 0;
  const toNum = parseInt(toPincode) || 0;
  return Math.abs(toNum - fromNum) % 24;
};

module.exports = {
  calculateRideDuration
};