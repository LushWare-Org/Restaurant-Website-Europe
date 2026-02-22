/**
 * Calculate discount amount for a specific offer
 */
export const getDiscountAmount = (price, offer) => {
  if (!offer) return 0;
  
  if (offer.offerType === "percentage") {
    return (price * offer.discountValue) / 100;
  } else if (offer.offerType === "fixed") {
    return Math.min(offer.discountValue, price);
  }
  return 0;
};

/**
 * Calculate discounted price for a specific offer
 */
export const getDiscountedPrice = (price, offer) => {
  return Math.max(0, price - getDiscountAmount(price, offer));
};

/**
 * Get all applicable offers with their calculated values
 */
export const getOffersWithValues = (price, offers) => {
  if (!offers || offers.length === 0) return [];

  return (
    offers
      .map((offer) => {
        const discountAmount = getDiscountAmount(price, offer);
        const discountedPrice = getDiscountedPrice(price, offer);

        return {
          ...offer,
          discountAmount,
          discountedPrice,
          savingPercentage:
            offer.offerType === "percentage"
              ? offer.discountValue
              : ((discountAmount / price) * 100).toFixed(1),
        };
      })
      // Filter and sort: only show "percentage" and "fixed" types, sorted by discount value (highest first)
      .filter((offer) =>
        ["percentage", "fixed"].includes(offer.offerType)
      )
      .sort((a, b) => b.discountAmount - a.discountAmount)
  );
};

/**
 * Get the best (highest value) offer
 */
export const getBestOffer = (price, offers) => {
  const offersWithValues = getOffersWithValues(price, offers);
  return offersWithValues.length > 0 ? offersWithValues[0] : null;
};

/**
 * Calculate totals with discount for cart items
 */
export const calculateCartItemTotal = (quantity, price, offer) => {
  const discountAmount = getDiscountAmount(price, offer);
  const discountedPrice = getDiscountedPrice(price, offer);
  const itemTotal = discountedPrice * quantity;
  const totalSavings = discountAmount * quantity;

  return {
    itemTotal,
    totalSavings,
    discountAmount,
    discountedPrice,
  };
};
