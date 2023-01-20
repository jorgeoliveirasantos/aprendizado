const Generate = {
  Key: (pass) => {
    let encoder = new TextEncoder();
    let buffer = [];
    let tmp = encoder.encode(pass);
    let i = 0;
    while (buffer.length < 32) {
      buffer.push(tmp[i]);
      if (i == (tmp.length) - 1) {
        i = 0;
      } else {
        ++i;
      }
    }
    return buffer;
  },
  IV: (pass) => {
    let encoder = new TextEncoder();
    let buffer = [];
    let tmp = encoder.encode(pass);
    let i = 0;
    while (buffer.length < 16) {
      buffer.push(tmp[i]);
      if (i == (tmp.length) - 1) {
        i = 0;
      } else {
        ++i;
      }
    }
    return buffer;
  }
}
//  MÉTODOS DE CRIPTOGRAFIA E HASH:
const EasyCrypto = {
  AESEncrypt: (txt, senha) => {
    //
    let crypto = require("crypto");
    let cypher = crypto.createCipheriv("aes-256-cbc", Buffer.from(Generate.Key(senha)), Buffer.from(Generate.IV(senha)));
    let encrypted = cypher.update(txt, "utf-8", "hex");
    encrypted += cypher.final("hex");
    return encrypted;
  },
  AESDecrypt: (txt, senha) => {
    let crypto = require("crypto");
    let decypher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(Generate.Key(senha)), Buffer.from(Generate.IV(senha)));
    let decrypted = decypher.update(txt, "hex", "utf-8");
    decrypted += decypher.final("utf-8");
    return decrypted;
  },
  SHA256: (txt) => {
    const hash = require("crypto").createHash("sha256");
    hash.update(txt);
    return hash.digest('hex');
  },
}

const EasyEncoding = {
  StringToBase64: (txt) => { return Buffer.from(txt).toString('base64') },
  Base64ToString: (txt) => { return Buffer.from(txt, 'base64').toString() },
  StringToHex: (txt) => { return Buffer.from(txt).toString('hex') },
  HexToString: (txt) => { return Buffer.from(txt, 'hex').toString() },
}

module.exports.EasyCrypto = EasyCrypto;
module.exports.EasyEncoding = EasyEncoding;