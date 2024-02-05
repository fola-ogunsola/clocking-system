import bcrypt from 'bcrypt';

const compareData = (data, hash) => bcrypt.compareSync(data, hash);
const Hash = {
    hashPassword(password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      if (hash && salt) {
        return { hash, salt };
      }
      return false;
    },
}

function hashPassword(req, res){
    var password = req.body.password;
    var hashed = Hash.hashPassword(password)
    console.log(hashed)
    return res.json({message : "Password Encrypted", hashed})
}


module.exports = {hashPassword, compareData};
