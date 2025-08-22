const express = require("express");
const cors = require("cors");
const db = require("./firebase"); // เชื่อม Firebase Admin SDK

const app = express();
app.use(cors());
app.use(express.json());
app.post("/users", async (req, res) => {
  console.log("POST /users called", req.body); // ✅ ดูข้อมูล request
  try {
    const { name } = req.body;
    const ref = db.ref("users").push();
    await ref.set({ name, createdAt: new Date().toISOString() });
    console.log("User saved", ref.key); // ✅ ดูว่า save เสร็จหรือไม่
    res.json({ id: ref.key, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
