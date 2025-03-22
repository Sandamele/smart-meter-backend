const { validationResult } = require("express-validator");
const formatValidationErrors = require("../../../utils/formatValidationErrors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const addBeneficiary = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ data: null, error: formatValidationErrors(errors) });
    }
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }

    const userId = req.user?.id;
    const { firstname, lastname, phoneNumber, meterNumber, municipality } =
      req.body;
    const beneficiary = await prisma.beneficiary.create({
      data: {
        firstname,
        lastname,
        phoneNumber,
        meterNumber,
        municipality,
        userId,
      },
    });
    return res.status(200).json({ data: beneficiary, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const getAllBeneficiary = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const beneficiaries = await prisma.beneficiary.findMany({
      where: { userId },
    });
    const formatBeneficiaries = beneficiaries.map((beneficiary) => {
      delete beneficiary.userId;
      return beneficiary;
    });
    return res.status(200).json({ data: formatBeneficiaries, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const getBeneficiary = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const id = req.params.id;
    const beneficiary = await prisma.beneficiary.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (beneficiary === null) {
      return res
        .status(404)
        .json({ data: "Beneficiary not found", error: null });
    }

    delete beneficiary.userId;
    return res.status(200).json({ data: beneficiary, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const updateBeneficiary = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const id = req.params.id;
    const beneficiaryExist = await prisma.beneficiary.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (beneficiaryExist === null) {
      return res
        .status(404)
        .json({ data: "Beneficiary not found", error: null });
    }
    const { firstname, lastname, phoneNumber, meterNumber, municipality } =
      req.body;
    const beneficiary = await prisma.beneficiary.update({
      where: { id, userId },
      data: { firstname, lastname, phoneNumber, meterNumber, municipality },
    });
    delete beneficiary.userId;
    return res.status(200).json({ data: beneficiary, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const deleteBeneficiary = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const id = req.params.id;
    const beneficiaryExist = await prisma.beneficiary.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (beneficiaryExist === null) {
      return res
        .status(404)
        .json({ data: "Beneficiary not found", error: null });
    }
    await prisma.beneficiary.delete({
      where: {
        id,
        userId,
      },
    });
    return res.status(200).json({ data: { deleted: true }, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
module.exports = {
  addBeneficiary,
  getAllBeneficiary,
  getBeneficiary,
  deleteBeneficiary,
  updateBeneficiary,
};
