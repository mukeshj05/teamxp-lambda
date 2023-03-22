const convertObjectArrayToObject = (array, key = "_id") => {
  const object = {};

  for (let i = 0; i < array.length; i++) {
    object[array[i][key]] = array[i];
  }

  return object;
};

module.exports = { convertObjectArrayToObject };
