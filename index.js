const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 3000;

let server = express();

server.use(express.static(path.join(__dirname, "/public")));
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
   extended: true
}));

let users = [
   {
      "id": 1,
      "name": "Pedro",
      "age": "21"
   },
   {
      "id": 2,
      "name": "Jorge",
      "age": "32"
   }
];

server.get("/api/users", (req, res) => {
   res.json(users);
});

server.post("/api/users/create", (req, res) => {
   let user = req.body;

   users.push(user);
   res.send("User added");

});

server.listen(PORT, () => {
   console.log("Server running on port: " + PORT);
});


