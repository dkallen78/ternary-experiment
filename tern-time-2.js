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

function makePaths() {
  for(let i = 9; i >= 0; i--) {
    let tritPath = makeSVG("path", `path-${i}`);
    svgDial.appendChild(tritPath);
  }
}

function makeCircles() {
  let cRad = radius;
  for(let i = 3; i >= 0; i--) {
    //let tritPath = makeSVG("path", `path-${i}`);
    let tritPath = document.getElementById(`path-${i}`);
    /*tritPath.setAttribute("d",  `M ${centerX + cRad} ${centerY} 
                          A ${cRad} ${cRad} 0 1 1 ${centerX - cRad} ${centerY} 
                          A ${cRad} ${cRad} 0 1 1 ${centerX + cRad} ${centerY}`);*/
    
    /*tritPath.setAttribute("d",  `M ${Math.cos(toRad(30) * cRad) + centerX} ${Math.sin(toRad(30) * cRad) + centerY} 
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(90) * cRad) + centerX} ${Math.sin(toRad(90) * cRad) + centerY} 
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(150) * cRad) + centerX} ${Math.sin(toRad(150) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(210) * cRad) + centerX} ${Math.sin(toRad(210) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(270) * cRad) + centerX} ${Math.sin(toRad(270) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(330) * cRad) + centerX} ${Math.sin(toRad(330) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 1 1 ${Math.cos(toRad(30) * cRad) + centerX} ${Math.sin(toRad(30) * cRad) + centerY}`);*/

    tritPath.setAttribute("d",  `M ${(Math.cos(toRad(30)) * cRad) + centerX} ${(Math.sin(toRad(30)) * cRad) + centerY} 
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(90)) * cRad) + centerX} ${(Math.sin(toRad(90)) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(150)) * cRad) + centerX} ${(Math.sin(toRad(150)) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(210)) * cRad) + centerX} ${(Math.sin(toRad(210)) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(270)) * cRad) + centerX} ${(Math.sin(toRad(270)) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(330)) * cRad) + centerX} ${(Math.sin(toRad(330)) * cRad) + centerY}
                          A ${cRad} ${cRad} 0 0 1 ${(Math.cos(toRad(30)) * cRad) + centerX} ${(Math.sin(toRad(30)) * cRad) + centerY}`);
    cRad *= scaleDown;
    //svgDial.appendChild(tritPath);
  }
}

function makeTriangles() {
  let cRad = radius;
  for(let i = 3; i >= 0; i--) {
    const point4 = new Point((Math.cos(toRad(30)) * cRad) + centerX, (Math.sin(toRad(30)) * cRad) + centerY);
    //const point6 = new Point((Math.cos(toRad(90)) * cRad) + centerX, (Math.sin(toRad(90)) * cRad) + centerY);
    const point8 = new Point((Math.cos(toRad(150)) * cRad) + centerX, (Math.sin(toRad(150)) * cRad) + centerY);
    //const point10 = new Point((Math.cos(toRad(90)) * cRad) + centerX, (Math.sin(toRad(90)) * cRad) + centerY);
    const point12 = new Point((Math.cos(toRad(270)) * cRad) + centerX, (Math.sin(toRad(270)) * cRad) + centerY);
    //const point2 = new Point((Math.cos(toRad(90)) * cRad) + centerX, (Math.sin(toRad(90)) * cRad) + centerY);
    const point48 = Point.center(point4, point8);
    const point812 = Point.center(point8, point12);
    const point124 = Point.center(point12, point4);

    let tritPath = document.getElementById(`path-${i}`);
    tritPath.setAttribute("d", `M ${(Math.cos(toRad(30)) * cRad) + centerX} ${(Math.sin(toRad(30)) * cRad) + centerY}
                              A 0 0 0 0 1 ${point48.x} ${point48.y}
                              A 0 0 0 0 1 ${point8.x} ${point8.y}
                              A 0 0 0 0 1 ${point812.x} ${point812.y}
                              A 0 0 0 0 1 ${point12.x} ${point12.y}
                              A 0 0 0 0 1 ${point124.x} ${point124.y}
                              A 0 0 0 0 1 ${point4.x} ${point4.y}`);
    
    cRad *= scaleDown;
  }
}

const neg = "T";
const pos = "1";
const zero = "0";

let svgDial = document.getElementById("svgDial");
let box = svgDial.getBoundingClientRect();

let centerX = box.width / 2;
let centerY = box.height / 2;
let radius = box.height / 2;

/*let cTest = document.getElementById("circle-test");
cTest.setAttribute("cx", centerX);
cTest.setAttribute("cy", centerY);
cTest.setAttribute("r", radius);*/

const ratio = 3 ** (1 / 3);
const scaleDown = (1 / ratio);
const maxSize = 95;

let testState = "triangles";

//makeTriangles();
//makeCircles();
makePaths();
//makeTriangles();

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
    if (testState === "circles") {
      makeTriangles();
      testState = "triangles"
    } else {
      makeCircles();
      testState = "circles";
    }
    dial.innerHTML = `${btSecs}`;
    timeCheck = btSecs;
  }

  
  
}, 100);