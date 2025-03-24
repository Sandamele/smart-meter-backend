const { addTransactionHistory, getAllTransactionHistory, getTransactionHistory } = require("../controllers/transactionHistory.controllers");
const router = require("express").Router();
router.post("/", addTransactionHistory);
router.get("/", getAllTransactionHistory);
router.get("/:id", getTransactionHistory);
module.exports = router;