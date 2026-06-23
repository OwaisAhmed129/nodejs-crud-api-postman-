const express = require("express");
const app = express();

app.use(express.json());

// temporary database
let users = [];

/* ========================
   CREATE USER (POST)
======================== */
app.post("/users", (req, res) => {
  const user = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  users.push(user);

  res.json({
    message: "User created",
    user: user
  });
});

/* ========================
   GET ALL USERS
======================== */
app.get("/users", (req, res) => {
  res.json(users);
});

/* ========================
   GET USER BY ID
======================== */
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/* ========================
   DELETE USER
======================== */
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const newUsers = users.filter(u => u.id !== id);

  if (newUsers.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  users = newUsers;

  res.json({
    message: "User deleted",
    users: users
  });
});


app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users[index] = {
    id: id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  res.json({
    message: "User updated successfully",
    user: users[index]
  });
});
/* ========================
   UPDATE USER (FULL REPLACE)
======================== */
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  res.json({
    message: "User updated",
    user: users[index]
  });
});



app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  // update only provided fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.age) user.age = req.body.age;

  res.json({
    message: "User partially updated",
    user: user
  });
});



/* ========================
   SERVER START
======================== */
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});