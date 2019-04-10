import bcrypt from 'bcrypt';
<<<<<<< HEAD:server/helperFunctions/hashPassword.js
import '@babel/polyfill'
=======
>>>>>>> fa2f0f65a6b8a5e38b42d1f5e74d14683e9df901:server/helperFunctions/hashPassword.js
const hashPassword = async (password) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export default hashPassword;