const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    }).catch((err) => {
      console.log(`mongod failed to connect with server: ${err.message}`);
    });
};

module.exports = connectDatabase;
