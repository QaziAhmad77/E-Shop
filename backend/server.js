const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

// The "uncaughtException" event is emitted when an exception is thrown but not caught within a try-catch block anywhere in the code.
// Handling uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`shutting down the server for handling uncaught exception`);
// });

// Function to handle cleanup
const cleanup = () => {
  console.log('Performing cleanup...');
  // Close the database connection
  mongoose.connection.close(() => {
    console.log('Database connection closed.');
    // Stop the server
    server.close(() => {
      console.log('Server stopped.');
      process.exit(1); // Exit the process with a non-zero status code to indicate an error
    });
  });
};

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down the server for handling uncaught exception');
  cleanup();
});


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// connect db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// This event is emitted when a promise is rejected and no catch handler is attached to it. The callback function receives the reason for the rejection and the promise itself as arguments.
// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});


