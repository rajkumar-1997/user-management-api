const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/addUser', userController.addUser);
router.get('/getUser/:userId', userController.getUser);
router.put('/updateUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
module.exports = router;
