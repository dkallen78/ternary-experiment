function findHighestPower(number, base) {

  for (var power = 0; number >= base ** power; power++) {
  }

  return power - 1;
}

function toRad(deg) {
	//----------------------------------------------------//
	//Converts an angle in degrees to an angle in radians	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to radians				//
	//----------------------------------------------------//
	//return(float): converted degrees in radians					//
	//----------------------------------------------------//

	return deg * (Math.PI / 180);
}

function toDeg(rad) {
	//----------------------------------------------------//
	//Converts an angle in radians to an angle in degrees	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to degrees				//
	//----------------------------------------------------//
	//return(float): converted radians in degrees					//
	//----------------------------------------------------//

	return rad * (180 / Math.PI);
}

function midPoint(x1, y1, x2, y2) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return {
    x: midX,
    y: midY
  };
}

class Point {
	//----------------------------------------------------//
	//A data structure to make managing and representing	//
	//	Cartesian points easier														//
	//----------------------------------------------------//
	//x(float): x coordinate of the point									//
	//y(float): y coordinate of the point									//
	//----------------------------------------------------//

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static center(p1, p2) {
		//----------------------------------------------------//
		//Finds the center point between p1 and p2						//
		//----------------------------------------------------//
		//p1, p2(Point): points to find the center of					//
		//----------------------------------------------------//
		//return(Point): the point at the midpoint between the//
		//	original two points																//
		//----------------------------------------------------//

		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;
		const newCenter = new Point(midX, midY);
		return newCenter;
	}

  static distance(p1, p2) {
    /*----------------------------------------------------//
    //Finds the  distance between two points on a         //
    //  cartesian plane using the Pythagorean theorem     //
    //----------------------------------------------------//
    //p1(Point): first point                              //
    //p2(Point): second point                             //
    //----------------------------------------------------//
    //return(float): distance between two points          //
    //----------------------------------------------------*/
  
    return (Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2))).toFixed(4);
  }

	static vector(p1, p2) {
		//----------------------------------------------------//
		//Finds the vector from p1 to p2											//
		//----------------------------------------------------//
		//p1, p2(Point): points on the vector to be found			//
		//----------------------------------------------------//
		//return(Point): the vector from p1 to p2							//
		//----------------------------------------------------//

		const vecX = (p1.x - p2.x);
		const vecY = (p1.y - p2.y);
		const newVector = new Point(vecX, vecY);
		return newVector;
	}
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

function makeSVG(type, id, ...classes) {
  //----------------------------------------------------//
  //Returns an SVG element of the type indicated        //
  //----------------------------------------------------//
  //type(string): type of SVG element to create         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element       //
  //----------------------------------------------------//
  //return(element): SVG element                        //
  //----------------------------------------------------//

  let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (typeof id === "string") {svg.id = id}
  classes.forEach(x => svg.classList.add(x));
  return svg;
}

function makePaths() {
  for(let i = 0; i < scale + 1; i++) {
    let tritPath = makeSVG("path", `path-${i}`);
    tritPath.setAttribute("stroke-width", `${scale + 1 - i}`);
    svgDial.appendChild(tritPath);
  }
}

function drawCurves(rad, id) {
  function findControl(p1, p2, a1, a2) {
    const l = 0.3573;
    const c1 = new Point(p1.x - (l * rad * Math.sin(toRad(a1))), p1.y + (l * rad * Math.cos(toRad(a1))));
    const c2 = new Point(p2.x + (l * rad * Math.sin(toRad(a2))), p2.y - (l * rad * Math.cos(toRad(a2))));
    return [c1, c2];
  }

  const point4 = new Point((Math.cos(toRad(30)) * rad) + centerX, (Math.sin(toRad(30)) * rad) + centerY);
  const point6 = new Point((Math.cos(toRad(90)) * rad) + centerX, (Math.sin(toRad(90)) * rad) + centerY);
  const point8 = new Point((Math.cos(toRad(150)) * rad) + centerX, (Math.sin(toRad(150)) * rad) + centerY);
  const point10 = new Point((Math.cos(toRad(210)) * rad) + centerX, (Math.sin(toRad(210)) * rad) + centerY);
  const point12 = new Point((Math.cos(toRad(270)) * rad) + centerX, (Math.sin(toRad(270)) * rad) + centerY);
  const point2 = new Point((Math.cos(toRad(330)) * rad) + centerX, (Math.sin(toRad(330)) * rad) + centerY);

  const [c1_4to6, c2_4to6] = findControl(point4, point6, 30, 90);
  const [c1_6to8, c2_6to8] = findControl(point6, point8, 90, 150);
  const [c1_8to10, c2_8to10] = findControl(point8, point10, 150, 210);
  const [c1_10to12, c2_10to12] = findControl(point10, point12, 210, 270);
  const [c1_12to2, c2_12to2] = findControl(point12, point2, 270, 330);
  const [c1_2to4, c2_2to4] = findControl(point2, point4, 330, 30);

  let tritPath = document.getElementById(`path-${id}`);
  tritPath.setAttribute("d", `M ${point4.x} ${point4.y} 
                        C ${c1_4to6.x} ${c1_4to6.y} ${c2_4to6.x} ${c2_4to6.y} ${point6.x} ${point6.y}
                        C ${c1_6to8.x} ${c1_6to8.y} ${c2_6to8.x} ${c2_6to8.y} ${point8.x} ${point8.y}
                        C ${c1_8to10.x} ${c1_8to10.y} ${c2_8to10.x} ${c2_8to10.y} ${point10.x} ${point10.y}
                        C ${c1_10to12.x} ${c1_10to12.y} ${c2_10to12.x} ${c2_10to12.y} ${point12.x} ${point12.y}
                        C ${c1_12to2.x} ${c1_12to2.y} ${c2_12to2.x} ${c2_12to2.y} ${point2.x} ${point2.y}
                        C ${c1_2to4.x} ${c1_2to4.y} ${c2_2to4.x} ${c2_2to4.y} ${point4.x} ${point4.y} Z`);
}

function drawTriUp(rad, id) {
  const point4 = new Point((Math.cos(toRad(30)) * rad) + centerX, (Math.sin(toRad(30)) * rad) + centerY);
  const point8 = new Point((Math.cos(toRad(150)) * rad) + centerX, (Math.sin(toRad(150)) * rad) + centerY);
  const point12 = new Point((Math.cos(toRad(270)) * rad) + centerX, (Math.sin(toRad(270)) * rad) + centerY);
  const point48 = Point.center(point4, point8);
  const point812 = Point.center(point8, point12);
  const point124 = Point.center(point12, point4);

  let tritPath = document.getElementById(`path-${id}`);
  tritPath.setAttribute("d", `M ${point4.x} ${point4.y}
                            C ${point4.x} ${point4.y} ${point48.x} ${point48.y} ${point48.x} ${point48.y}
                            C ${point48.x} ${point48.y} ${point8.x} ${point8.y} ${point8.x} ${point8.y}
                            C ${point8.x} ${point8.y} ${point812.x} ${point812.y} ${point812.x} ${point812.y}
                            C ${point812.x} ${point812.y} ${point12.x} ${point12.y} ${point12.x} ${point12.y}
                            C ${point12.x} ${point12.y} ${point124.x} ${point124.y} ${point124.x} ${point124.y}
                            C ${point124.x} ${point124.y} ${point4.x} ${point4.y} ${point4.x} ${point4.y} Z`);
}

function drawTriDown(rad, id) {
  const point6 = new Point((Math.cos(toRad(90)) * rad) + centerX, (Math.sin(toRad(90)) * rad) + centerY);
  const point10 = new Point((Math.cos(toRad(210)) * rad) + centerX, (Math.sin(toRad(210)) * rad) + centerY);
  const point2 = new Point((Math.cos(toRad(330)) * rad) + centerX, (Math.sin(toRad(330)) * rad) + centerY);
  const point610 = Point.center(point6, point10);
  const point102 = Point.center(point10, point2);
  const point26 = Point.center(point2, point6);

  let tritPath = document.getElementById(`path-${id}`);
  tritPath.setAttribute("d", `M ${point26.x} ${point26.y}
                            C ${point26.x} ${point26.y} ${point6.x} ${point6.y} ${point6.x} ${point6.y}
                            C ${point6.x} ${point6.y} ${point610.x} ${point610.y} ${point610.x} ${point610.y}
                            C ${point610.x} ${point610.y} ${point10.x} ${point10.y} ${point10.x} ${point10.y}
                            C ${point10.x} ${point10.y} ${point102.x} ${point102.y} ${point102.x} ${point102.y}
                            C ${point102.x} ${point102.y} ${point2.x} ${point2.y} ${point2.x} ${point2.y}
                            C ${point2.x} ${point2.y} ${point26.x} ${point26.y} ${point26.x} ${point26.y} Z`);
}

const neg = "T";
const pos = "1";
const zero = "0";


let ratio = 3 ** (1 / 3);
ratio = 1.3333333;
const scaleDown = (1 / ratio);
const scale = 11;
const secSize = 86_400_000 / (3 ** scale);

let svgDial = document.getElementById("svgDial");
let box = svgDial.getBoundingClientRect();

let centerX = box.width / 2;
let centerY = box.height / 2;
let radius = (box.height / 2) - scale;


//Makes the <path> elements used for the "digits"
makePaths();

//Creates the state variable with scale + 1 characters
let btCheck = "x".padStart(scale + 1, "x");
//The gears of the clock
let timeInterval = setInterval(function() {
  //This chunk finds the milliseconds that have elapsed in the current day
  //  at the users local time zone
  const {hour, minute, second, millisecond} = Temporal.Now.plainTimeISO();
  let millis = hour * 3_600_000;
  millis += minute * 60_000;
  millis += second * 1_000;
  millis += millisecond;
  //This chunk converts those milliseconds into 3^scale blocks, converts the number
  //  of those blocks into ternary, then converts that number into balanced ternary
  let decimalTSecs = Math.floor(millis / secSize);
  let tSecs = toTernary(decimalTSecs);
  let btSecs = toBalancedTernary(tSecs).padStart(scale + 1, 0)

  //This if checks to see if the time has changed
  if (btCheck !== btSecs) {
    //Raw display of btSecs
    dial.innerHTML = `${btSecs}`;
    //Sets the initial value of the radius
    let cRad = radius;
    //Loops through the btSecs string checking for changes
    for (let i = 0; i < btSecs.length; i++) {
      if (btSecs[i] !== btCheck[i]) {
        switch (btSecs[i]) {
          case "1":
            drawTriUp(cRad, i);
            break;
          case "0":
            drawCurves(cRad, i);
            break;
          case "T":
            drawTriDown(cRad, i);
            break;
        }
      }
      //Scales the radius down by the set amount
      cRad *= scaleDown;
    }
    //Sets the state variable to the current btSecs
    btCheck = btSecs;
  }
}, 100);