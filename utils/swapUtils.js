const axios = require("axios");

/**
 * Get the conversion rate from a given cryptocurrency to USDT
 * @param {string} fromCurrency - The cryptocurrency to convert from (e.g., 'ETH', 'BTC')
 * @param {number} amount - The amount of the cryptocurrency to convert
 * @returns {Promise<number>} - The equivalent amount in USDT
 */
const swapToUSDT = async (amount, fromCurrency) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: fromCurrency.toLowerCase(),
          vs_currencies: "usdt",
        },
      }
    );

    const rate = response.data[fromCurrency.toLowerCase()].usdt;
    return amount * rate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    throw new Error("Failed to fetch conversion rate");
  }
};

module.exports = {
  swapToUSDT,
};
