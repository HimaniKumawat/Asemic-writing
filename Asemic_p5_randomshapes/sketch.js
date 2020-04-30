var serial;                                   // variable to hold an instance of the serialport library
var portName = 'COM9';                        // fill in your serial port name here
var inData;                                    // variable to hold the input data from Arduino

var ax;                                       // X coordinate of the letter
var ay;                                      // Y coordinate of the letter
var letter;                                  // Selected letter
let font,                                    //Font and size of the letter
  fontsize = 10;


function setup() {
  //set up canvas
  createCanvas(windowWidth, windowHeight);

  // setup the font details
  noStroke();
  textFont('Georgia');
  textSize(fontsize);

  //set up communication port
  serial = new p5.SerialPort();                // make a new instance of the serialport library
  serial.on('list', printList);                // set a callback function for the serialport list event
  serial.on('connected', serverConnected);     // callback for connecting to the server
  serial.on('open', portOpen);                 // callback for the port opening
  //serial.on('data', serialEvent);            // callback for when new data arrives
  serial.on('error', serialError);             // callback for errors
  serial.on('close', portClose);               // callback for the port closing
  serial.list();                               // list the serial ports
  serial.open(portName);                       // open a serial port

  frameRate(5);
                   bezierDetail(2);                             // Reducing the frameRate to look at the letters properly.
  background(255);
}


function draw() {
  serial.on('data', serialEvent);             // Trying to call the event, get new values everytime this loop runs (Live data).
  console.log(inData);                        // only to test the data entry.

  if (inData > 211)                           // If frequency is more than 211
  {
    fill(0, 0, inData,80);                   // purple- ish shade. Normal- low volume

    let x1 = random(0,width),
    x2 = x1 + random(-50,50),
    x3 = x1 - random(-190,190),
    x4 =  x1 +random(10,100);

    let y1 =  random(0,height),
    y2 = y1 + random(-100,40),
    y3 = y1 + random(10,150),
    y4 = y1 + random(-90,35);
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);                         // Printing the letter
  }
  else if ((inData < 211) && (inData > 150))       // If frequency is in between 211 - 150
  {
    fill(inData, inData, 0, 90);     //Green - yellow - ish shade.

    let x1 = random(0 , width),
    x2 = x1 + random(-100, 100),
    x3 = x1 - random(-50, 80),
    x4 = x1 + random(-20, 20);

    let y1 =  random(0 , height),
    y2 = y1 - random(30, 140),
    y3 = y1 + random(-140, 90),
    y4 = y1 - random(-50, 10);
    bezier(x1, y1, x2, y2, x3, y3, x4, y4,);
  }
  else if ((inData < 150) && (inData > 0))              // If frequency is in between 150 - 0
  {
    fill(inData+100, 0, 0,95);    // Red-ish (High volume)

    let x1 = random(0 , width),
    x2 = x1 + random(-1, 100),
    x3 = x1 + random(-100, 160),
    x4 = x1 + random(-30, 10);

    let y1 =  random(0 , height),
    y2 = y1 + random(-50, 80),
    y3 = y1 - random(-80, 120),
    y4 = y1 + random(110,180);
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
  if(inData == 0){background(255,255,255,99.5);}          // When the volume reaches the maximum, Then layering the screen with white faded background.
// }
}

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
  //print(inData);    // Checking the input numbers.
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
