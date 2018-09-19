// Taken from: https://stackoverflow.com/a/38622545
const random_string = () => {
  // To protect against the small chance of Math.random() generating 0 
  let result ='';
  while (!result) {
    result = Math.random().toString(36).substr(2, 5);
  };
  return result;
}

const validate_url = (string) => {
  // Regex taken from: https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url

  const regex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const valid = regex.test(string) 
  
  return valid
}

module.exports = {
  random_string: random_string,
  validate_url: validate_url
};