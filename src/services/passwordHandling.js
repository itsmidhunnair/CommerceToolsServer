const bcrypt = require("bcrypt");

/**
 * To HASH PASSWORD
 * @param password - Normal Text password that is to be hashed
 * @returns Hash - Encrypted (hashed) Value
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10).then((hash) => hash);
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
