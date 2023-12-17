function rnd(floor, ceiling) {
  /*
  //Generates a random number within a range of numbers //
  //----------------------------------------------------//
  //floor(integer): lower bound of the random number    //
  //ceiling(integer): upper bound of the random number  //
  //----------------------------------------------------//
  //return(integer): random number w/in the range       //
  */

let range = (ceiling - floor) + 1;
return Math.floor((Math.random() * range) + floor);
}

function getRandom() {
  let randomNumber = rnd(1, 1000);
  const numberInput = document.getElementById("number-input");
  numberInput.value = randomNumber;
}

function findHighestPower(input) {

  for (var power = 0; input >= 3 ** power; power++) {
  }

  return power - 1;
}

function convert2tern() {

  console.clear();
  let numberInput = document.getElementById("number-input").value;
  let input = parseInt(numberInput, 10);
  console.log(`toString(): ${input.toString(3)}`);

  let power = findHighestPower(input);
  let output = "";

  for (let i = power; i >= 0; i--) {

    let digit = Math.floor(input / (3 ** i)).toString(10);
    output += digit;

    input = input % (3 ** i);
  }
  console.log(`my function: ${output}`);

  convert2balanced(output);
}

function convert2balanced(number) {
  let unbal = [0];
  for (let i = 0; i < number.length; i++) {
    unbal.push(parseInt(number[i], 10));
  }

  console.log(unbal);

  let start = unbal.findLastIndex((x) => x > 0);
  console.log(start);

  //adding 1s
  let carry = false;
  for (let i = start; i >= 0; i--) {

    console.log(`evaluating index ${i}: ${unbal[i]}`);

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

  console.log(`numbers added: ${unbal}`);

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

  console.log(unbal);

  let output = "";
  unbal.forEach((x) => output += x);
  
  console.log(output);
}

const button = document.getElementById("convert-input");

button.addEventListener("click", convert2tern);

const rndButton = document.getElementById("random-number");

rndButton.addEventListener("click", getRandom);

//let neg = "⥝";
let neg = "T";
//let pos = "⥠";
let pos = "1";
let zero = "0";
