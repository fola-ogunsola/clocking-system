import Crypto from 'crypto';

export const generateOtp = () => Crypto.randomInt(0, 1000000).toString().padStart(6, '2');

