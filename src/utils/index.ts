export function encodeQuery(object: { [key: string]: any }): string {
  const kvArray: string[] = [];
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    const kv = encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    kvArray.push(kv);
  }
  return kvArray.join("&");
}

export function RGB2HEX(rgb: string) {
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(rgb)) {
    var aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgb;
    }
    return strHex;
  } else if (reg.test(rgb)) {
    var aNum = rgb.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return rgb;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return rgb;
}
