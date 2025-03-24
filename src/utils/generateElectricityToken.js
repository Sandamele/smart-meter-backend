const generateRandomToken = (length = 20) => {
    let token = '';
    const digits = '0123456789';
    
    for (let i = 0; i < length; i++) {
      token += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    
    return token;
}

module.exports = generateRandomToken;