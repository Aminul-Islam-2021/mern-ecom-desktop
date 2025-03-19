// import files and packages
import app from "./app.js";
import dotenv from "dotenv";

// configure dotenv
dotenv.config();

// initialize the port
const port = process.env.PORT || 3000;

// listen to the port & run the server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
