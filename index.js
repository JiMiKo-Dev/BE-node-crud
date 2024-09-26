require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models/index");
const cors = require("cors");
const { Op } = require("sequelize");

app.use(express.json()); // เพื่อให้รองรับการส่งข้อมูลแบบ JSON
app.use(cors());

// route
app.get("/api/user", async (req, res) => {
  const { query } = req.query;
  try {
    const items = await db.User.findAll({
      order: [["user_id", "ASC"]],
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { first_name: { [Op.iLike]: `%${query}%` } },
          { last_name: { [Op.iLike]: `%${query}%` } },
          { gender: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/create-user", async (req, res) => {
  try {
    const created = await db.User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/edit-user/:id", async (req, res) => {
  try {
    const updated = await db.User.update(req.body, {
      where: { user_id: req.params.id },
    });

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(400).json(`Can not update`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/delete-user/:id", async (req, res) => {
  try {
    const deleted = db.User.destroy({ where: { user_id: req.params.id } });

    if (deleted) {
      res.status(200).json(deleted);
    } else {
      res.status(400).json(`Can not delete`);
    }
  } catch {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
