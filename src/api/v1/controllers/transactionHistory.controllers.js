const { PrismaClient } = require("@prisma/client");
const calculateElectricityUnits = require("../../../utils/calculateElectricityUnits");
const generateRandomToken = require("../../../utils/generateElectricityToken");
const Vat = require("../../../utils/vat");
const prisma = new PrismaClient();
const addTransactionHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id
    const { beneficiaryId, cost, paymentStatus} = req.body;
    const token = generateRandomToken();
    const vat = cost - Vat(cost);
    const subTotal = cost - vat
    const units = calculateElectricityUnits(subTotal, 2.7110);
    const transactionHistory = await prisma.transactionHisotry.create({
        data: {
            userId,
            beneficiaryId,
            token,
            units,
            cost,
            vat,
            paymentStatus,
        }
    })
    delete transactionHistory.id;
    delete transactionHistory.beneficiaryId;
    delete transactionHistory.userId;
    return res.status(200).json({ data: transactionHistory , error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const getAllTransactionHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const transactionHisotries = await prisma.transactionHisotry.findMany({
      where: { userId },
    });
    const formatTransactionHisotry = transactionHisotries.map((transactionHisotry) => {
      delete transactionHisotry.userId;
      return transactionHisotry;
    });
    return res.status(200).json({ data: formatTransactionHisotry, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
};
const getTransactionHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ data: null, error: { message: "Unauthorized" } });
    }
    const userId = req.user.id;
    const id = req.params.id
    const transactionHisotries = await prisma.transactionHisotry.findUnique({
      where: { userId, id },
    });
    if (transactionHisotries === null) {
      return res
        .status(404)
        .json({ data: "Transaction History not found", error: null });
    }
   

    delete transactionHisotries.userId;
    return res.status(200).json({ data: transactionHisotries, error: null });
  } catch (error) {
    console.error(`❌${error}`);
    return res.status(500).json({ data: null, error: "Internal server error" });
  }
}
module.exports = { addTransactionHistory, getAllTransactionHistory, getTransactionHistory };
