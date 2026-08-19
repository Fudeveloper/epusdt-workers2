import CryptoJS from 'crypto-js';

export const generateSignature = (data, bizKey) => {
  // 1. Filter out signature and empty values
  const keys = Object.keys(data).filter(key => {
    const value = data[key];
    return key !== 'signature' && value !== null && value !== undefined && value !== '';
  });

  // 2. Sort keys
  keys.sort();

  // 3. Construct query string
  const tempArr = keys.map(key => {
    let value = data[key];
    // Convert numbers to string, similar to Go's strconv logic
    // JS template string handles basic conversion, but we need to be careful with floats if needed.
    // Go's strconv.FormatFloat(ft, 'f', -1, 64) keeps necessary precision.
    // JS String(num) is usually close enough.
    return `${key}=${value}`;
  });

  const signStr = tempArr.join('&');

  // 4. Append bizKey and MD5
  const fullStr = signStr + bizKey;
  return CryptoJS.MD5(fullStr).toString();
};

export const verifySignature = (data, bizKey, signature) => {
  const calculated = generateSignature(data, bizKey);
  return calculated === signature;
};
