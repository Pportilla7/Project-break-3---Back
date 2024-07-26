// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretKey = process.env.PALABRA_SECRETA;

const verifyPassword = async ( password, contraseña) => {
  try {
      const validPassword = await bcrypt.compare(password, contraseña);
      return validPassword;
  } catch (error) {
      console.error('Error verificando la contraseña:', error);
      throw new Error('Error al verificar la contraseña');
  }
};

const generateToken = (profesor) => {
  try {
      const tokenData = {
          id: profesor.id,
          email: profesor.email
      };
      const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });
      return token;
  } catch (error) {
      console.error('Error generando el token JWT:', error);
      throw new Error('Error al generar el token');
  }
};

  
module.exports = { verifyPassword, generateToken };
