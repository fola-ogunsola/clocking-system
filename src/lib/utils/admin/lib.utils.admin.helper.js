import Crypto from 'crypto';

export const generateOtp = () => Crypto.randomInt(0, 1000000).toString().padStart(6, '2');

export const calculatePages = (total, limit) => {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  };

