const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding');

    // Delete existing chef user to start fresh
    await User.deleteMany({ username: 'chef' });

    // Generate and log the hash
    const plainPassword = 'password123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Generated hash for password "' + plainPassword + '":', hashedPassword);

    // Create the user
    const chefUser = new User({
      username: 'chef',
    //   password: hashedPassword,
      password: plainPassword,
      role: 'chef',
    });

    await chefUser.save();
    console.log('Chef user re-seeded successfully');

    mongoose.disconnect();
  })
  .catch(err => console.error('Seeding error:', err));
