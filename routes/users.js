import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];
/**
 * Get all users
 * /users
 */
router.get("/", (req, res) => {
  res.send(users);
});
/**
 * Post user
 * /users
 */
router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`Utilisateur ${user.firstName} a été ajouté`);
});
/**
 * Get unique user
 * users/4 => req.params { id: 4}
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});
/**
 * Delete unique user
 * users/4 => req.params { id: 4}
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`Utilisateur avec id = ${id} a été supprimé`);
});
/**
 * Update user
 * users/4 => req.params { id: 4}
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (age) {
    user.age = age;
  }
  res.send(`Utilisateur avec id = ${id} a été mise à jour`);
});

export default router;
