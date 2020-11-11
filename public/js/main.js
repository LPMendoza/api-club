const API_URL = "http://localhost:3000/api/";
const endpoint_add_user = "http://localhost:3000/api/users/create";

window.onload = () => {
   let tbody = document.getElementById("tblBody");
   tbody.innerHTML = "";

   fetch(API_URL + "users")
   .then((response) => response.json())
   .then((users) => {
      users.forEach((usuario, index) => {
         let tr = document.createElement("tr");

         let tdId = document.createElement("td");
         tdId.textContent = usuario.id

         let tdName = document.createElement("td");
         tdName.textContent = usuario.name

         let tdAge = document.createElement("td");
         tdAge.textContent = usuario.age
         tr.appendChild(tdId);
         tr.appendChild(tdName);
         tr.appendChild(tdAge);

         tbody.appendChild(tr);
      });
   });
}
document.getElementById("btnSave").onclick = () => {
   let id = document.getElementById("txtId").value;
   let name = document.getElementById("txtName").value;
   let age = document.getElementById("txtAge").value;

   let jsonUser = {
      "id": id,
      "name": name,
      "age": age
   }

   fetch(endpoint_add_user, {
      method: "POST",
      body: JSON.stringify(jsonUser),
      headers: {
         "Content-Type": "application/json"
      }
   })
   .then((response) => response.json())
   .then((data) => console.log(data));
}