// Taken from: https://stackoverflow.com/a/38622545
const random_string = () => {
  let result ='';
  while (!result) {
    result = Math.random().toString(36).substr(2, 5);
  }
  return result
}

module.exports = {
  random_string: random_string,
};