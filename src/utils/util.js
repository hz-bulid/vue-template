// 存储localStorage
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    if (typeof content === "undefined") {
      content = null;
    }
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};
// 获取localStorage
export const getStorage = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};
/**
 *
 */

/**
 * 删除localStorage
 */

export const removeStorage = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export const getFileType = (filePath) => {
  const startIndex = filePath.lastIndexOf(".");
  if (startIndex != -1) {
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
  } else return "";
};
// 下载文件
export const downFile = (url, fileName) => {
  if (!url) {
    return this.$message.warning("请输入正确的url");
  }
  const a = document.createElement("a");
  const body = document.querySelector("#app");
  body.appendChild(a);
  a.href = url;
  a.style.display = "none";
  a.target = "_blank";
  if (fileName) {
    a.download = fileName;
  }
  a.click();
  body.removeChild(a);
};

/**
 * 获取元素的横坐标（相对于窗口）
 * @param {*} event
 */
export const getLeft = (event) => {
  let offset = event.offsetLeft;
  if (event.offsetParent != null) offset += getLeft(event.offsetParent);
  return offset;
};
/**
 * 获取元素的纵坐标（相对于窗口）
 * @param {*} event
 */
export const getTop = (event) => {
  var offset = event.offsetTop;
  if (event.offsetParent != null) offset += getTop(event.offsetParent);
  return offset;
};

/**
 * @Description: 深拷贝
 * @param source 拷贝对象
 */
export const deepClone = (source) => {
  const targetObj = source ? (source.constructor === Array ? [] : {}) : source; // 判断复制的目标是数组还是对象
  if (source) {
    for (const keys in source) {
      // 遍历目标
      if (Object.prototype.hasOwnProperty.call(source, keys)) {
        if (source[keys] && typeof source[keys] === "object") {
          // 如果值是对象，就递归一下
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        } else {
          // 如果不是，就直接赋值
          targetObj[keys] = source[keys];
        }
      }
    }
  }
  return targetObj;
};

/**
 * 验证手机号码、含区号固定电话、不含区号固定电话
 * @param {String} tel
 */
export const checkTel = (tel) => {
  var pattern =
    /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^1[0-9]{10}$)/;
  if (pattern.test(tel)) {
    return true;
  } else {
    return false;
  }
};
/**
 * 验证身份证
 * @param {*} code
 */
export const checkIdCard = (idcode) => {
  // 加权因子
  var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  var check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  var code = idcode + "";
  var last = idcode[17]; // 最后一位

  var seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split("");
  var len = arr.length;
  var num = 0;
  for (var i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i];
  }

  // 获取余数
  var resisue = num % 11;
  var last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
  var idcard_patter =
    /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  var format = idcard_patter.test(idcode);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return !!(last === last_no && format);
};

/**
 * 生成uuid
 */
export const guid = () => {
  const S = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  const date = new Date();
  const timestamp = date.getTime();

  return `hz${timestamp}${S}`;
};

/**
 * 计算两个时间时差
 */
export const timeDifference = (start, end) => {
  const stime = Date.parse(new Date(start));
  const etime = Date.parse(new Date(end));
  // 两个时间戳相差的毫秒数
  const usedTime = etime - stime;
  const day = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出相差天数
  const leave1 = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
  // 分钟
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
  // 秒
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  let timeFn = "";
  if (day > 0) {
    timeFn = `${day}天${hours}小时${minutes}分钟${seconds}秒`;
  } else if (hours > 0) {
    timeFn = `${hours}小时${minutes}分钟${seconds}秒`;
  } else if (minutes > 0) {
    timeFn = `${minutes}分钟${seconds}秒`;
  } else if (seconds > 0) {
    timeFn = `${seconds}秒`;
  } else if (seconds == "0") {
    timeFn = `${seconds}秒`;
  } else {
    timeFn = "暂无数据";
  }
  return timeFn;
};
/**
 * @Description: 计算年龄
 * @param {type}
 */
export const getAge = (birthday) => {
  // 出生时间 毫秒
  var birthDayTime = birthday;
  // 当前时间 毫秒
  var nowTime = new Date().getTime();
  // 一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime - birthDayTime) / 31536000000);
};

/**
 * @Description: 解析地址栏中的参数
 * @param  key 不传则返回所有参数；传key则返回key值对应的参数，若没有key对应大参数则返回undefined
 */
export const analysisUrl = (key) => {
  var afterUrl = window.location.search.substring(1); // (问号以后的字符串)
  const afterEqual = afterUrl.split("&");
  const datas = {};
  for (const item of afterEqual) {
    const arr = item.split("=");
    datas[arr[0]] = arr[1] || undefined;
  }
  if (key) {
    return datas[key];
  } else {
    return datas;
  }
};

/**
 * 删除当前url中指定参数
 * @param names 数组或字符串
 * @returns {string}
 */
export const funcUrlDel = (names) => {
  if (typeof names === "string") {
    names = [names];
  }
  var loca = window.location;
  var obj = {};
  var arr = loca.search.substr(1).split("&");
  // 获取参数转换为object
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("=");
    obj[arr[i][0]] = arr[i][1];
  }
  // 删除指定参数
  for (let i = 0; i < names.length; i++) {
    delete obj[names[i]];
  }
  // 重新拼接url
  var url =
    loca.origin +
    loca.pathname +
    "?" +
    JSON.stringify(obj)
      .replace(/[\"\{\}]/g, "")
      .replace(/\:/g, "=")
      .replace(/\,/g, "&") +
    loca.hash;
  return url;
};

export const deal = (num1, num2, exp) => {
  exp = exp || "+";
  const reg = /^(|\+|-)(\d+|\d+\.\d+)$/;
  const expReg = /([+\-*\/])/;
  if (!expReg.test(exp)) {
    return 0;
  } else if (!reg.test(num1) || !reg.test(num2)) {
    return 0;
  }
  const str1 = num1.toString();
  const str2 = num2.toString();
  const index1 = str1.indexOf(".");
  const index2 = str2.indexOf(".");
  let abs = 1;
  if (index1 === -1 && index2 === -1) {
    abs = 1;
  } else if (str1.length - index1 >= str2.length - index2) {
    abs = Math.pow(10, str1.length - index1 - 1);
  } else {
    abs = Math.pow(10, str2.length - index2 - 1);
  }
  // return eval(`((num1 * abs) ${exp} (num2 * abs)) / abs`)
  if (exp === "+") {
    return (num1 * abs + num2 * abs) / abs;
  } else if (exp === "-") {
    return (num1 * abs - num2 * abs) / abs;
  } else if (exp === "*") {
    return (num1 * abs * (num2 * abs)) / Math.pow(abs, 2);
  } else {
    return (num1 * abs * (num2 * abs)) / abs;
  }
};

export const downloadFiles = (content, filename) => {
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

/**
 * 跨应用路由跳转(打开新界面)
 * @param {String} href url地址
 */
export const openBlank = (href = "/") => {
  window.open(href, "_blank", "noopener");
};

// 传入最大操作区，实际大小。计算出最大化的实际操作区
export const calcMaxArea = (wall, area) => {
  let width = 0;
  let height = 0;
  let scale = 0;
  const areaHeight = area.height;
  const areaWidth = area.width;
  const wallHeight = wall.height;
  const wallWidth = wall.width;
  const heightScale = calcScale(areaHeight / wallHeight);
  const widthScale = calcScale(areaWidth / wallWidth);
  if (widthScale < heightScale) {
    width = calcScale(wallWidth * widthScale);
    height = calcScale(wallHeight * widthScale);
    scale = widthScale;
  } else {
    width = calcScale(wallWidth * heightScale);
    height = calcScale(wallHeight * heightScale);
    scale = heightScale;
  }
  return {
    width,
    height,
    scale: Number.parseFloat(scale),
  };
};
export const calc = (str) => {
  return Number.parseInt(str);
};
export const calcScale = (str) => {
  return Number.parseFloat(str.toFixed(4));
};
export const calcScaleWB = (str) => {
  return Math.floor(str);
};
export const wallToBlock = (sourceInfo, sourceScale) => {
  const info = JSON.parse(JSON.stringify(sourceInfo));
  const scale = calcScale(sourceScale);
  info.width = calcScaleWB(info.width * scale);
  info.height = calcScaleWB(info.height * scale);
  info.xCoordinate = calcScale(info.xCoordinate * scale);
  info.yCoordinate = calcScale(info.yCoordinate * scale);
  return info;
};
export const blockToWall = (sourceInfo, sourceScale) => {
  const info = JSON.parse(JSON.stringify(sourceInfo));
  const scale = calcScale(sourceScale);
  info.width = calc(info.width / scale);
  info.height = calc(info.height / scale);
  info.xCoordinate = calc(info.xCoordinate / scale);
  info.yCoordinate = calc(info.yCoordinate / scale);
  return info;
};

export const calcCenter = (info) => {
  const { left, top, height, width } = info;
  const x = left + width / 2;
  const y = top + height / 2;
  return {
    x,
    y,
  };
};
export const twoOverLap = (div1, div2) => {
  const center1 = calcCenter(div1);

  const center2 = calcCenter(div2);

  const x1 = center1.x;
  const y1 = center1.y;
  const x2 = center2.x;
  const y2 = center2.y;
  const yDistance = Math.abs(y2 - y1);

  const xDistance = Math.abs(x2 - x1);

  const w = div1.width / 2 + div2.width / 2;

  const h = div1.height / 2 + div2.height / 2;

  if (xDistance < w && yDistance < h) {
    return true;
  } else {
    return false;
  }
};

/**
 * @Description: 判断数据类型
 * @param {*} data 要判断的数据
 */
export const isType = (data) => {
  let type = toString.call(data);
  let a = type.substr(0, type.length - 1);
  let arr = a.split(" ");
  return arr[1];
};
/**
 * 颜色混合
 * @param c1 颜色1
 * @param c2 颜色2
 * @param ratio 比值（0-1）
 * @returns 混合颜色
 */
 export const colourBlend = (c1, c2, ratio) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  const r1 = parseInt(c1.substring(1, 3), 16)
  const g1 = parseInt(c1.substring(3, 5), 16)
  const b1 = parseInt(c1.substring(5, 7), 16)
  const r2 = parseInt(c2.substring(1, 3), 16)
  const g2 = parseInt(c2.substring(3, 5), 16)
  const b2 = parseInt(c2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio)
  const r16 = ('0' + (r || 0).toString(16)).slice(-2)
  const g16 = ('0' + (g || 0).toString(16)).slice(-2)
  const b16 = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r16 + g16 + b16
}
