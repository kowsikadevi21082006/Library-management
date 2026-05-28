const express = require("express");
const prisma = require("../prisma/prisma");

const router = express.Router();


// CREATE BOOK
router.post("/", async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET BOOK BY ID
router.get("/:id", async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// UPDATE BOOK
router.put("/:id", async (req, res) => {
  try {
    const book = await prisma.book.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;