const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const PORT = 3000;

const pathUsers = path.join(__dirname, "/data/users");

let server = express();

server.use(express.static(path.join(__dirname, "/public")));
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
   extended: true
}));

function readUsers () {
   let data = fs.readFileSync(pathUsers);
   let dataJson = JSON.parse(data);
   return dataJson;
}

function writeUsers (jsonUsers) {
   fs.writeFileSync(pathUsers, JSON.stringify(jsonUsers));
   return true;
}

server.get("/api/users", (req, res) => {

   let dataJson = readUsers();
   res.setHeader("Contet-Type", "application/json");
   res.json(dataJson);
});

server.post("/api/users/create", (req, res) => {
   let user = req.body;
   let dataJson = readUsers();
   dataJson.push(user);
   
   if (writeUsers(dataJson) == true) {
      res.json({
         "message": "User added"
      });

   }
   else {
      res.json({
         "message": "User not added"
      });
   }

});

server.post("/api/users/update/", (req, res) => {
   let user = req.body;
   let dataJson = readUsers();
   for(let i = 0; i < dataJson.length; i++) {
      if(dataJson[i].id == user.id) {
         dataJson.splice(i, 1, user);
         break;
      }
   }

   writeUsers(dataJson);

   res.json({
      "message": "User updated"
   });
});

server.post("/api/users/delete/:id", (req, res) => {
   let idUser = req.params.id;
   let dataJson = readUsers();
   for (let i = 0; i < dataJson.length; i++) {
      if (dataJson[i].id == idUser) {
         dataJson.splice(i, 1);
         break;
      }
   }

   writeUsers(dataJson);
   res.json({
      "message": "User deleted"
   });
});

server.listen(PORT, () => {
   console.log("Server running on port: " + PORT);
});


