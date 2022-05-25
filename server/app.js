const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 5000;
const controller = require("./controller");

// Configure Upload Files
const publicDirectory = path.join(__dirname, "../client/public/images");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, publicDirectory);
  },
  filename: (req, res, cb) => {
    const uniqueSuffix = Date.now() + path.extname(res.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/shops", controller.shops.list);
app.post("/api/shops/upload", upload.single("file"), (req, res) => {
  res.send(req.file.filename);
});
app.post("/api/shops", controller.shops.create);
app.get("/api/shops/:id", controller.shops.getById);
app.delete("/api/shops/:id", controller.shops.deleteData);
app.put("/api/shops/:id", controller.shops.update);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
