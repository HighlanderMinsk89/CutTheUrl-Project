const { Router } = require("express");
const Link = require("../models/Link");
const authMiddleware = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");
const router = Router();

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    console.log("REQ.BODY", req);
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong with logging" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong with logging" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong with logging" });
  }
});

module.exports = router;
