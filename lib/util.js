module.exports = {

  // Taken from: https://stackoverflow.com/a/38622545
  random_string: () => {
    // To protect against the small chance of Math.random() generating 0 
    let result = '';
    while (!result) {
      result = Math.random().toString(36).substr(2, 5);
    };
    return result;
  },

};

