const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

//get all users
app.get("/users", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

/*app.get("/user/:id", async (req, res) => {
  const snapshot = await User.doc(req.params.id).get();
  //const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(snapshot);
});*/

app.post("/createuser", async (req, res) => {
  const data = req.body;
  console.log(data);
  await User.add(data);
  res.send({ msg: "User Added" });
});

app.post("/updateuser", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/deleteuser", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});
app.listen(80, () => console.log("Up & RUnning *4000"));
