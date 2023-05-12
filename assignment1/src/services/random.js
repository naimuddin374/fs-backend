const randomNumberGenerator = (start, end) => {
  return start + Math.floor(Math.random() * (end - start));
};

module.exports = randomNumberGenerator;
