const User = require("./model/User");
const Role = require("./model/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Ошибка в регистрации", errors});
        }
        

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();

      return res.json({ message: "Пользователь успешно зарегистрирован!!!!!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration Error!!!!!" });
    }
  }

  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login Error!!!!!" });
    }
  }

  async getUsers(req, res) {
    try {
      res.json("server work");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Error getting users" });
    }
  }
}

module.exports = new authController();
