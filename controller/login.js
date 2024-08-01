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
  console.log(profesor[0]);
  try {
      const tokenData = {
          id: profesor[0].id,
          email: profesor[0].email
      };
      console.log(tokenData);
      const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });
      console.log('este es el token', token);
      console.log('este es el token decodificado', jwt.decode(token,{complete:true}));
      return token;
  } catch (error) {
      console.error('Error generando el token JWT:', error);
      throw new Error('Error al generar el token');
  }
};

  
module.exports = { verifyPassword, generateToken };
