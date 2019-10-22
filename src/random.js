const fs = require("fs");
const path = require("path");
const mailLength = 14;
const nameF = path.join(__dirname, "/names.txt");
let fNames = [],
  lNames = [];

  let namesA = fs
  .readFileSync(nameF, { encoding: "utf8" })
  .split("\n")
  .map(val => val.trim())
  .map(val => val.split(" "))
  .map(val => {
    fNames.push(val[0]);
    lNames.push(val[1]);
  });
const fileName = path.join(__dirname, "/free_email_provider_domains.txt");

let emails = fs
  .readFileSync(fileName, { encoding: "utf8" })
  .split("\n")
  .filter(val => val.length < mailLength);

class Range {
  constructor(start, end, startInclusive = true, endInclusive = true) {
    if (isNaN(start)) start = 0;
    this.start = start;
    if (isNaN(end)) end = 0;
    if (end < start) end = start;
    this.end = end;
    this.startInclusive = startInclusive;
    this.endInclusive = endInclusive;
  }
  get array() {
    return intArrayFrom(
      this.start,
      this.end,
      this.startInclusive,
      this.endInclusive
    );
  }
}

const stringRanges = {
  special: [
    new Range(32, 47),
    new Range(58, 64),
    new Range(91, 96),
    new Range(123, 126)
  ],
  number: new Range(48, 57),
  upper: new Range(65, 90),
  lower: new Range(97, 122)
};

function getRandom(start, end, inclusive = true) {
  let locStart = start,
    locEnd = end;
  if (locEnd < locStart) return locEnd;
  if (locStart === locEnd) return locStart;
  if (inclusive === false) {
    locStart += 1;
    locEnd -= 1;
  }
  return Math.round(locStart + Math.random() * (locEnd - locStart));
}

function getRandomFromArray(array = []) {
  const len = array.length;
  if (len === 0) return null;
  if (len === 1) return array[0];
  let ranNum = getRandom(0, len - 1);
  return array[ranNum];
}

function intArrayFrom(start, end, inclusiveStart = true, inclusiveEnd = true) {
  if (end < start) {
    let temp = start;
    start = end;
    end = temp;
  }
  const origStart = start,
    origEnd = end;
  if (!inclusiveStart) start += 1;

  if (!inclusiveEnd) end -= 1;
  let step = end - start + 1;
  if (step < 0) return [];
  if (
    start === end &&
    (inclusiveStart === false && inclusiveEnd === false) &&
    origEnd === origStart
  )
    return [];
  if (start === end) return [start];

  return [...Array(step).keys()].map(val => start + val);
}

function createRandomString(len = 1, start = -1, end = -1) {
  if (end === -1 && start !== end) end = start;
  if (start < 0 || start > 126 || (end < 0 || end > 126)) return "";
  let array = intArrayFrom(start, end);
  return createRandomStringFromArray(len, array);
}

function createRandomStringFromArray(len = 1, array) {
  let str = "";
  if (array.length === 0) return str;
  if (len < 1) return str;
  if (array.length === 1 && len === 1) return String.fromCharCode(array[0]);
  for (let _ = 0; _ != len; _++) {
    let ch = getRandomFromArray(array);
    str += String.fromCharCode(ch);
  }
  return str;
}

function addRanges() {
  let array = [];
  for (let i = 0; i != arguments.length; i++) {
    array = [...array].concat(arguments[i].array);
  }
  return array;
}

function createRandomStringLower(len = 1) {
  //97= a 122 = w
  return createRandomString(
    len,
    stringRanges.lower.start,
    stringRanges.lower.end
  );
}

function createRandomStringUpper(len = 1) {
  //97= a 122 = w
  return createRandomString(
    len,
    stringRanges.upper.start,
    stringRanges.upper.end
  );
}

function createString(len, startFromLower = true, hasSpecial = false) {
  let str = "";
  if (!startFromLower) {
    str = createRandomStringUpper();
  } else {
    str = createRandomStringLower();
  }
  let randomRange = addRanges(
    stringRanges.number,
    stringRanges.upper,
    stringRanges.lower
  );
  if (hasSpecial === true) {
    for (let ar of stringRanges.special)
      randomRange = [...randomRange].concat(ar.array);
  }
  return str + createRandomStringFromArray(len - 1, randomRange);
}

function createUserCredentials(mail = "@mail.com", size = 30) {
  let username = `${getRandomFromArray(fNames)}_${getRandomFromArray(lNames)}`;
  let email = username + mail;
  let pass = createString(getRandom(8, 12), true, true);
  return {
    username: username,
    email: email,
    password: pass
  };
}

function getRandomEmail() {
  let email = "mail.com";

  if (emails.length !== 0) {
    email = emails[getRandom(0, emails.length)];
  }
  return `@${email}`;
}

function createUN() {
  return createUserCredentials(getRandomEmail());
}

module.exports = {
  getRandom: getRandom,
  getRandomFromArray: getRandomFromArray,
  Range: Range,
  intArrayFrom: intArrayFrom,
  createRandomString: createRandomString,
  createRandomStringFromArray: createRandomStringFromArray,
  createString:createString,
  createUserCredentials: createUserCredentials,
  createUN: createUN
};
