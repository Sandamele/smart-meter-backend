const {body} = require('express-validator');
const addBeneficiaryValidator = [
    body("firstname", "Firstname is required").notEmpty(),
    body("lastname", "Lirstname is required").notEmpty(),
    body("phoneNumber", "Phone number is required").notEmpty(),
    body("meterNumber", "Meter number is required").notEmpty(),
    body("municipality", "Municipality is required",).notEmpty(),
]
module.exports = {addBeneficiaryValidator}