const Vat = (amount) => {
    const vatRate = 15 / 100;
    const amountExcludingVAT = amount / (1 + vatRate);
    return amountExcludingVAT.toFixed(2); 
}

module.exports = Vat