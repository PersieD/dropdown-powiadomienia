let backgrounds = [];
let currentBackgroundIndex = 0;

let tekst;
let x = 4;
let button;
let invisibleButton;
let closeButton;

function preload() {
  // Wczytujemy tła
  backgrounds[0] = loadImage('background3.png');
  backgrounds[1] = loadImage('background4.png');
  backgrounds[2] = loadImage('background5.png');
   backgrounds[3] = loadImage('background51.png');
  backgrounds[4] = loadImage('background54.png');
  backgrounds[5] = loadImage('background53.png')
  ;
  backgrounds[6] = loadImage('background6.png');
  // ostatnie tło
}

function setup() {
  createCanvas(2388, 1668);

  // Przycisk "X" – zmienia tło
  closeButton = createButton('X');
  closeButton.size(50, 50);
  closeButton.position(width / 7 - 85, height / 5 + 9);
  closeButton.style('background', 'transparent');
  closeButton.style('border', 'none');
  closeButton.style('font-size', '70px');
  closeButton.style('color', 'transparent');
  closeButton.style('cursor', 'pointer');
  closeButton.mousePressed(() => {
    if (currentBackgroundIndex < backgrounds.length - 1) {
      currentBackgroundIndex++;
      console.log("Przełączono tło na indeks:", currentBackgroundIndex);
    } else {
      console.log("Osiągnięto ostatnie tło – brak przełączania.");
    }
  });
}

function draw() {
  image(backgrounds[currentBackgroundIndex], 0, 0, width, height);
}