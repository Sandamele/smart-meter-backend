const calculateElectricityUnits = (amount, ratePerUnit) => {
    if (amount <= 0 || ratePerUnit <= 0) {
        throw new Error("Amount and rate per unit must be greater than zero");
    }
    const units = amount / ratePerUnit;
    return units;
}

module.exports = calculateElectricityUnits