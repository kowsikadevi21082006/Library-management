const express = require("express");
const prisma = require("../prisma/prisma");

const router = express.Router();


// CREATE MEMBER
router.post("/", async (req, res) => {
  try {
    const member = await prisma.member.create({
      data: req.body
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET ALL MEMBERS
router.get("/", async (req, res) => {
  try {
    const members = await prisma.member.findMany();

    res.json(members);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET MEMBER BY ID
router.get("/:id", async (req, res) => {
  try {
    const member = await prisma.member.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// UPDATE MEMBER
router.put("/:id", async (req, res) => {
  try {
    const member = await prisma.member.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;