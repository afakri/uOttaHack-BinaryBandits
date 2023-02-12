const express = require("express");
const cors = require("cors");
const User = require("./config");
const firebase = require("firebase");
const app = express();
app.use(express.json());
app.use(cors());

//get all users
//Sort users by steps walked
//Add ranking
app.get("/users", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  list.sort((a, b) => parseInt(b.numberOfSteps) - parseInt(a.numberOfSteps));
  for (let i = 1; i <= list.length; i++) {
    list[i - 1]["ranking"] = i;
  }
  res.send(list);
});

app.get("/user/:id", async (req, res) => {
  const snapshot = await User.doc(req.params.id).get();
  res.send(snapshot.data());
});

app.post("/createuser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const snapshot = await User.add(data).then(function (docRef) {
    res.send({ id: docRef.id });
  });
});

app.post("/updatestepcount", async (req, res) => {
  const snapshot = await User.doc(req.body.id).get();
  const data = snapshot.data();
  data.numberOfSteps = req.body.numberOfSteps;
  await User.doc(req.body.id).update(data);
  res.send({ msg: "Updated" });
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
app.listen(80, () => console.log("Up & Running on port 80"));
