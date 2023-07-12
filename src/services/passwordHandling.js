const bcrypt = require("bcrypt");

/**
 * To Generate a random SALT for encrypting password
 */
// const generateSalt = async () => {
//   const salt = await bcrypt.genSalt(10);
//   console.log(salt);
// };

// generateSalt();

/**
 * To HASH PASSWORD
 * @param password - Normal Text password that is to be hashed
 * @returns Hash - Encrypted (hashed) Value
 */
async function hashPassword(password) {
  const hash = await bcrypt
    .hash(password, `${process.env.ENC_SALT}`)
    .then((hash) => hash);
  return hash.replace(process.env.ENC_SALT, "");
}

/**
 * To verify HASH PASSWORD
 * @param email - email received from the client
 * @param password - Normal Text password received from the client
 * @returns Boolean - 'True' if the email is passed is present in DB and Password matches
 */
async function verifyPassword(email, password) {
  console.log(email);
  try {
    // const hash = await getUserPass(email);
    console.log("hash", hash);
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = { hashPassword, verifyPassword };
