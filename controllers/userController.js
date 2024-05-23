const User = require('../models/userModel');

//start region for adding user
exports.addUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age)
      return res.status(400).send({ message: 'Required parameter missing' });

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(409).send({ message: 'email already exists' });
    const createdUser = await User.create({ name, email, age });
    res.status(200).send({ message: 'User created successfully', createdUser });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
//#endregion

//start region for getting user data from db
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId)
      return res.status(400).send({ message: 'Required params missing' });
    const userData = await User.findByPk(userId);
    if (!userData)
      return res.status(404).send({ message: 'User data not found' });
    return res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
//#endregion

//start region for updating user data
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, age, email } = req.body;
    if (!userId || (!name && !age && !email))
      return res.status(400).send({ message: 'Required params missing' });
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send({ message: 'User not found' });
    if (name) user.name = name;
    if (age) user.age = age;
    if (email) user.email = email;

    await user.save();
    res.status(200).send({ message: 'User data updated', user });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
//#endregion

// start region for delete user data
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId)
      return res.status(400).send({ message: 'Required params missing' });
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send({ message: 'User not found' });
    await user.destroy();
    res.status(200).send({ message: 'User deleted  successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
//#endregion
