const express = require("express");
const prisma = require("../prisma/prisma");

const router = express.Router();


// CREATE ISSUANCE
router.post("/", async (req, res) => {
  try {
    const issuance = await prisma.issuance.create({
      data: {
        member_id: req.body.member_id,
        book_id: req.body.book_id,
        issued_date: new Date(req.body.issued_date),
        target_return_date: new Date(req.body.target_return_date)
      }
    });

    res.json(issuance);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET ALL ISSUANCES
router.get("/", async (req, res) => {
  try {
    const issuances = await prisma.issuance.findMany({
      include: {
        member: true,
        book: true
      }
    });

    res.json(issuances);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// UPDATE ISSUANCE
router.put("/:id", async (req, res) => {
  try {
    const issuance = await prisma.issuance.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    });

    res.json(issuance);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;