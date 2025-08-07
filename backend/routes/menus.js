const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

router.get('/', async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
});

module.exports = router;
