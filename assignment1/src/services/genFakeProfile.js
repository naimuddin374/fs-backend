const { faker } = require("@faker-js/faker");

const generateFakeProfile = (userProperties) => {
  const generatedProperties = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 18, max: 50 }),
    address: faker.address.streetAddress(),
    avatar: faker.internet.avatar(),
  };
  const person = {};
  userProperties.forEach((property) => {
    if (generatedProperties.hasOwnProperty(property.toLowerCase())) {
      person[property] = generatedProperties[property];
    }
  });

  return person;
};

module.exports = generateFakeProfile;
