const { addBeneficiary, getAllBeneficiary, getBeneficiary, deleteBeneficiary, updateBeneficiary } = require("../controllers/beneficiary.controllers");
const { addBeneficiaryValidator } = require("../validator/beneficiary.validator");

const router = require("express").Router();

router.post("/", addBeneficiaryValidator, addBeneficiary);
router.get("/", getAllBeneficiary);
router.get("/:id", getBeneficiary);
router.delete("/:id", deleteBeneficiary);
router.put("/:id", updateBeneficiary);
module.exports = router;