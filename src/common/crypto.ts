import CryptoJS from 'crypto-js';

const KEY = 'CHAT-ROOM-SYSTEM-XTT-0930'

// 加密
export const encrypt = (word: string, keyStr?: string) => {
  if (!keyStr) {
    keyStr = KEY
  }
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted: any = CryptoJS.AES.encrypt(srcs, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
}

// 解密
export const decrypt = (word: string, keyStr?: string) => {
  if (!keyStr) {
    keyStr = KEY
  }
  word = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
  var decrypt = CryptoJS.AES.decrypt(word, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

