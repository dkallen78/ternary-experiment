function findHighestPower(number, base) {

  for (var power = 0; number >= base ** power; power++) {
  }

  return power - 1;
}

function toTernary(number) {

  number = parseInt(number, 10);

  let power = findHighestPower(number, 3);
  let output = "";

  for (let i = power; i >= 0; i--) {

    let digit = Math.floor(number / (3 ** i)).toString(10);
    output += digit;

    number = number % (3 ** i);
  }

  return output;
}

function toBalancedTernary(number) {
  let unbal = [0];
  for (let i = 0; i < number.length; i++) {
    unbal.push(parseInt(number[i], 10));
  }

  let start = unbal.findLastIndex((x) => x > 0);

  //adding 1s
  let carry = false;
  for (let i = start; i >= 0; i--) {

    if (carry) {
      unbal[i]++;
      carry = false;
    }

    if (i > 0) {
      switch(unbal[i]) {
        case 0:
          unbal[i] = 1;
          break;
        case 1:
          unbal[i] = 2;
          break;
        case 2:
          unbal[i] = 0;
          carry = true;
          break;
        case 3:
          unbal[i] = 1;
          carry = true;
          break;
      }
    }
    
  }

  //taking away 1s
  for (let i = start; i >= 1; i--) {

    switch(unbal[i]) {
      case 0:
        unbal[i] = neg;
        break;
      case 1:
        unbal[i] = zero;
        break;
      case 2:
        unbal[i] = pos;
        break;
    }
  }

  if (unbal[0] === 1) {
    unbal[0] = pos;
  }

  let output = "";
  unbal.forEach((x) => output += x);
  
  return output;
}

function drawGlyphs(time) {
  function drawCircle() {

  }
  function drawUp() {

  }
  function drawDown() {

  }
  for (let i = 0; i < time.length; i++) {
    switch(tritPos[i]) {
      case "1":
        break;
      case "0":
        break;
      case "T":
        break;
    }
  }
}

const neg = "T";
const pos = "1";
const zero = "0";


let dial = document.getElementById("dial");

const ratio = Math.sqrt(3);
const scaleDown = (1 / ratio);
const maxSize = 95;

let timeCheck = "";
let timeInterval = setInterval(function() {
  //This chunk finds the milliseconds that have elapsed in the current day
  //  at the users local time zone
  const {hour, minute, second, millisecond} = Temporal.Now.plainTimeISO();
  let millis = hour * 3_600_000;
  millis += minute * 60_000;
  millis += second * 1_000;
  millis += millisecond;
  //This chunk converts those milliseconds into 3^9 blocks, converts the number
  //  of those blocks into ternary, then converts that number into balanced ternary
  let decimalTSecs = Math.floor(millis / 4389.57);
  let tSecs = toTernary(decimalTSecs);
  let btSecs = toBalancedTernary(tSecs).padStart(10, 0)

  if (timeCheck !== btSecs) {
    dial.innerHTML = `${btSecs}`;
    timeCheck = btSecs;
  }

  
  
}, 100);