const CalculateDelay = (fromCountry, toCountry) => {
  // Basic delay calculation based on countries
  const baseDelay = 10000; // 10 seconds
  const countryMultiplier = {
    "USA": 1,
    "UK": 1.2,
    "AU": 1.5,
    "IN": 2,
    "CA": 1.1,
    "FR": 1.3,
    "DE": 1.4,
    "JP": 1.6,
    "CN": 1.8,
    "BR": 2.5,
    "ZA": 2.2,
    "RU": 2.8,
    "MX": 2.0,
    "ES": 1.7,
    "IT": 1.9,
    "KR": 1.4,
    "NG": 2.3,
    "AR": 2.1,
    "SE": 1.5,
  };

  const fromMultiplier = countryMultiplier[fromCountry] || 1;
  const toMultiplier = countryMultiplier[toCountry] || 1;

  return baseDelay * fromMultiplier * toMultiplier;
};

module.exports = CalculateDelay;
