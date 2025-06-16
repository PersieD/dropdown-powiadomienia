let mode = 1; // 1: pierwszy kod, 2: drugi kod
let switchButton;

let bg, dropdowns = [];
let backgrounds = [], currentBackgroundIndex = 0;
let background7, tick;
let closeButton;
let showTickButtons = false;
let tickButtons = [];
let ticksVisible = [false, false];

function preload() {
  // Wspólne zasoby
  bg = loadImage("background2.png");

  // Zasoby drugiego trybu
  backgrounds[0] = loadImage('background3.png');
  backgrounds[1] = loadImage('background4.png');
  backgrounds[2] = loadImage('background5.png');
  backgrounds[3] = loadImage('background51.png');
  backgrounds[4] = loadImage('background54.png');
  backgrounds[5] = loadImage('background53.png');
  backgrounds[6] = loadImage('background6.png');
  background7 = loadImage('background7.png');
  tick = loadImage('tick.png');
}

function setup() {
  createCanvas(2388, 1668);
  imageMode(CORNER);

  // Przycisk przełączania trybów
  switchButton = createButton('kontynuuj');
  switchButton.position(width-400, height-250);
  switchButton.size(200, 60);
  switchButton.mousePressed(switchMode);

  setupMode1();
}

function switchMode() {
  clearUI();
  if (mode === 1) {
    mode = 2;
    switchButton.remove(); // Ukryj przycisk po przełączeniu
    switchButton = null;
    setupMode2();
  } else {
    mode = 1;
    setupMode1();
    // (przycisk nie wraca – jeśli chcesz, możemy go tu przywracać)
  }
}

function clearUI() {
  // Usuwa dropdowny z trybu 1
  if (dropdowns.length > 0) {
    for (let sel of dropdowns) {
      sel.remove();
    }
    dropdowns = [];
  }
  // Usuwa przycisk X z trybu 2
  if (closeButton) {
    closeButton.remove();
    closeButton = null;
  }
}

function setupMode1() {
  let positions = [
    [200, 400],
    [200, 600],
    [200, 800],
    [200, 1000],
    [200, 1200],
    [200, 1400]
  ];

  let optionsList = [
    ["Kategorie", "Sneakersy",,"Trampki","Półbuty","Mokasyny","Lordsy","Baleriny","Sandały","Klapki","Espadryle","Czółenka","Szpilki","Botki","Kozaki","Śniegowce","Kalosze","Buty trekkingowe","Buty do biegania","Buty piłkarskie","Kapcie","Obuwie domowe","T-shirty","Bluzki","Koszule","Koszulki polo","Bluzy","Swetry","Kardigany","Toppi","Body","Golfy","Kamizelki","Kurtki przejściowe","Kurtki puchowe","Kurtki jeansowe","Płaszcze","Marynarki","Ramoneski","Bombery","Parki","Jeansy","Spodnie materiałowe","Chinosy","Spodnie dresowe","Legginsy","Spodenki","Spódnice","Spódniczki mini / midi / maxi","Sukienki codzienne","Sukienki wieczorowe","Sukienki koktajlowe","Kombinezony","Garnitury","Kompletyodzieżowe","Piżamy","Szlafroki","Koszule nocne","Odzież domowa","Onesie","T-shirty sportowe","Legginsy sportowe","Dresy","Kurtki sportowe","Stroje kąpielowe","Stroje treningowe","Koszulki drużynowe","Biustonosze","Majtki","Bokserki","Stringi","Body bieliźniane","Gorsety","Rajstopy","Skarpetki","Pończochy","Koszulki bieliźniane","Komplety bielizny","Torebki (shopperki, listonoszki, kopertówki)","Plecaki","Torby sportowe","Saszetki","Nerki","Walizki i torby podróżne","Portfele","Paski","Czapki z daszkiem","Bejsbolówki","Czapki zimowe","Szaliki","Kominy","Rękawiczki","Okulary przeciwsłoneczne","Parasolki","Etui na telefon","Biżuteria (kolczyki, bransoletki, naszyjniki)","Zegarki","Spinki do mankietów","Muchy i krawaty"],
    ["Marka", "A.BOCCA",, "A.S.98", "ACBC", "adidas", "adidas by Stella McCartney", "adidas Golf", "adidas Neo", "adidas Originals","adidas Performance", "adidas Sportswear", "Adidas Terrex", "Adieu", "ADOLFO DOMINGUEZ", "Ahluwalia", "Aigle","AIGNER", "aim’n®", "Albano", "ALDO", "Alexandre Birman", "Allrounder", "AllSaints", "Alma Blue", "Alma en Pena","ALOHAS", "Alviero Martini", "Ancuta Sarca", "Andrea Conti", "ÁNGEL ALARCÓN", "Anna Field", "Anna Field Wide Fit","Apepazza", "Apple of Eden", "ara", "Arcopedico", "ARIZONA LOVE", "ARKK Copenhagen", "Armani", "Armani Exchange","Art Bella", "ASICS", "ASICS SportStyle", "ASPORTUGUESAS", "AUS WOOLI AUSTRALIA", "Australia Luxe Collective","Azarey", "Baabuk", "Back70", "BALAGAN", "Ballop", "Bally", "BALR.", "Barbie", "Barbour", "Bata", "BATES", "Bearpaw","Befado", "Bershka", "Betsy", "Bettina Vermillon", "Bianco", "Big Star", "Billabong", "Billi Bi", "Birkenstock","BIZUU", "Björn Borg", "Blackstone", "Blauer", "Blount & Pool", "Blowfish Malibu", "Blue by Betsey Johnson","Blundstone", "Boccato", "Bogner", "BOSS", "Brandit", "British Knights", "Bronx", "BRUBECK", "Bruno Premi","brx by BRONX", "bStore", "Buffalo", "Buffalo London", "bugatti", "Bullboxer", "Burtan Obuwie Taneczne / Burtan Dance Shoes","Butigo", "By Byblos", "BY FAR", "By Malene Birger", "Ca'Shott", "CAFèNOIR", "CALANDO", "Call it Spring","Calvin Klein", "Calvin Klein Jeans", "camano", "camel active", "Camper", "CAMPERLAB", "Candice Cooper", "Caprice","Carhartt WIP", "Carinii", "Carmela", "Carmens", "Carvela", "Casadei", "Castañer", "Cath Kidston", "Cesare Gaspari","Champion", "Champion Rochester", "Chelsea Paris", "CHIARA FERRAGNI", "Chie Mihara", "Chloé", "Clae", "Clarks","Clarks Originals", "Clarks Unstructured", "Claudie Pierlot", "CLOSED", "Club4Brands", "CMP", "COACH", "Coccinelle","Colmar", "Colmar Originals", "Colors of California", "Columbia", "Converse", "Copenhagen Shoes", "Copenhagen Studios","Cortefiel", "Cosmos Comfort", "Cras", "Crickit", "Crime London", "Crocs", "Crosby", "Cult", "Custommade", "DACCORI","Felmini Wide Fit", "Fila", "Filippa K", "Filippo", "Filling Pieces", "Fiorucci", "FitFlop", "Flamingos' Life", "Floris van Bommel", "Flower Mountain", "Fluchos", "Fly London", "Fred de la Bretoniere", "FRED MARTIN COLLECTION", "Friendly Shoes", "Friends Like These", "Furla", "FURNIQ UK", "G-STAR", "Gabor", "Gabor Comfort", "GAeLLE", "Gaimo", "GANT", "GAP", "GARDINI SPIRIT", "GARMONT", "Gattinoni", "GCDS", "GEDEBE", "Genesis Footwear", "Geox", "Gerry Weber", "GIABORGHINI", "Gianfranco Ferré", "GIANMARCO SORELLI", "Giesswein", "Gioseppo", "Giuseppe Zanotti", "Glerups", "GmbH", "GOE for shoes", "Gola", "Gold&Gold", "Gooce", "Gottstein", "Grünland", "Guess", "Haflinger", "HALO", "Hanwag", "HASSIA", "Havaianas", "Head", "HEGO'S Milano", "Helly Hansen", "Henrik Vibskov", "HEYDUDE", "HI-TEC HTS74", "Hispanitas", "HOFF", "HOGAN", "Högl", "HOKA", "HotSquash", "HUB", "HUGO", "Hummel", "Hunter ORIGINAL", "Hush Puppies", "Icepeak", "IGI&CO", "IGOR", "Ilio Smeraldo", "Ilse Jacobsen", "IMAC", "Inblu", "INUIKII", "Inuovo", "InWear", "Ioannes", "Ipanema", "Iro", "Isabel Bernard", "IZIA", "J.LINDEBERG", "J.LINDEBERG Sports", "Jack Wolfskin", "Jacques Soloviere", "Jana", "JEEP", "Jeffrey Campbell", "Jerelyn Creado", "John Richmond", "Joma", "JOOP!", "Jordan", "Josef Seibel", "Juicy Couture", "Just Cavalli", "K-SWISS", "K1X", "Kamik", "Kampol", "KangaROOS", "Kaotiko", "Kappa", "Kaps", "Karl Kani", "KARL LAGERFELD", "Karl Lagerfeld Jeans", "Kate Spade", "kate spade new york", "Kawasaki", "Kazar", "Kazar Studio", "Keddo", "Keen", "Kennel + Schmenger", "Keys", "Kickers", "Kitsuné", "Koi Footwear", "Koroshi", "Kubota", "Kurt Geiger London", "L37", "La Sportiva", "La Strada", "Lacoste", "Lacoste Sport", "Lakai", "LAMODA", "LASCANA", "LÄST", "Last Resort AB", "LAURA VITA", "Lauren Ralph Lauren", "Lazamani", "le coq sportif", "Le Temps Des Cerises", "Lee", "Lee Cooper", "Legero", "Lemigo", "Les Tropeziennes par M Belarbi", "Levi's®", "Lipsy", "Little Bird", "LIU JO", "Living Kitzbühel", "Lloyd", "Loeffler Randall", "LOLA CASADEMUNT", "Long Tall Sally", "LORENZO-MARI", "Lotto", "Loungeable", "Love & Roses", "Love Moschino", "Lowa", "Luhta", "Luin Living", "Luisa Spagnoli", "Madden by Steve Madden", "Madden Girl", "Magicfelt", "Magnum Boots", "Maison Kitsuné", "Maison Margiela", "Maje", "Mammut", "Mango", "Mango Kids", "Marc Cain", "MARC JACOBS", "Marc Jacobs", "Marc O'Polo", "Marco Shoes", "Marco Tozzi", "Marco Tozzi by Guido Maria Kretschmer", "MARINE SERRE", "Marni", "Massimo Dutti", "Mattel", "Max Mara Beachwear", "MAX&Co.", "MBT", "MCM", "Meindl", "Melissa", "Melvin & Hamilton", "Meröhe", "Napapijri", "NAPAPIJRI x Fiorucci", "Naturino", "NeroGiardini", "New Balance", "New Look", "New Rock", "Newline", "Next", "NIK", "Nike", "Nike Performance", "Nike Sportswear", "No Name", "Noa Harmon", "Nobrand", "Noclaim", "Noisy May", "Nome Footwear", "Nordikas", "Northwave", "Nosiness", "Novesta", "Nubikk", "NUDE OF SCANDINAVIA", "Nuuwai", "Oakley", "Oasis", "O’Neill", "On", "Onitsuka Tiger", "Only", "Only & Sons", "ONLY Carmakoma", "ONLY PLAY", "ONLY SHOES", "ONLY Tall", "On Running", "Openwalk", "OpéraSPORT", "Orange Label","ORÉE", "Otto Kern", "OXS", "P448", "Paco Gil", "Paco Rabanne", "Palladium", "Panama Jack", "Pantofola d’Oro", "Papillio", "Parfois", "Paris Texas", "Patrizia Pepe", "Paul Green", "Paul Smith", "Pepe Jeans", "Peter Kaiser", "Philippe Model Paris", "Philipp Plein", "Pieces", "Pier One", "Pierre Hardy", "Pikolinos", "Pinko", "Piola", "Plakton", "PLDM by Palladium", "Plein Sport", "Plumex", "Pollini", "Polo Ralph Lauren", "POMPEII", "Pretty Ballerinas", "Primigi", "PRIMURY", "Primy", "Prince Oliver", "PRIVÉ REVAUX", "PRO-Keds", "Progetto", "Puma", "Puma x AMI", "Puma x PERKS AND MINI", "Pura López", "Pure White", "R.M.Williams", "Rabeanco", "Rag & Bone", "Rains", "Ralph Lauren", "Ralph Lauren Home", "Ralph Lauren Kids", "Ravel", "Ray-Ban", "Re/done", "Red-Rag", "Red Valentino", "Red Wing Shoes", "Reebok", "Reebok Classic", "Reebok Performance", "Refresh", "Regatta", "Relife", "Remonte", "Replay", "Reserved", "Retrosuperfuture","Vizzano", "Voile Blanche", "Volcom", "Vty", "Waldläufer", "WALK IN THE CITY", "Walk London", "WALKMAXX", "WANNA", "WEEKEND MaxMara", "WENZ", "Westland", "Wojas", "Womsh", "Wonders", "Woolrich", "Wrangler", "Xti", "Zaxy", "Ziener"],
    ["Model", "Stan Smith", "Superstar", "Samba", "Gazelle", "Campus 00s", "Forum Low / High", "NMD_R1", "Ultraboost", "Yeezy Boost 350 / 500 / 700 (współpraca z Kanye Westem)", "ZX 750 / ZX 8000", "OZWEEGO", "SL 72", "Response CL", "327", "530", "574", "550", "990v3 / v4 / v5 / v6", "converse platform","converse platform","crocs sandals","crocs g-string","salomon x5", "Isabel Marant bekket","993", "2002R", "1906R", "9060", "610", "Suede Classic", "RS-X", "Future Rider", "CA Pro", "Slipstream", "Mayze", "Palermo", "Wild Rider", "Club C 85", "Classic Leather", "Workout Plus", "Instapump Fury", "Zig Kinetica", "Nano X", "DMX Series", "GEL-Kayano 14", "GEL-Lyte III", "GEL-Nimbus", "GEL-1130", "GEL-Quantum 360", "EX89", "Novab"],
    ["Rozmiar", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "66", "68", "70", "72", "74", "76", "78", "80", "82", "84", "86", "88", "90", "92", "94", "96", "98", "100", "102", "104", "106", "108", "110", "112", "114", "116", "122", "128", "134", "140", "146", "152", "158", "164", "170", "176", "24/30", "26/30", "28/30", "29/30", "30/30", "31/30", "32/30", "33/30", "34/30", "36/30", "40/30", "42/30", "24/32", "26/32", "28/32", "29/32", "30/32", "31/32", "32/32", "33/32", "34/32", "36/32", "40/32", "42/32", "24/34", "26/34", "28/34", "29/34", "30/34", "31/34", "32/34", "33/34", "34/34", "36/34", "40/34", "42/34", "32/36", "32/36", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "31-32", "32", "32-33", "33", "33-34", "34", "34-35", "35", "35.5", "35-36", "36", "36.5", "36-37", "37", "37.5", "37-38", "38", "38.5", "38-39", "39", "39.5", "40", "40.5", "40-41", "41", "41.5", "42", "42.5", "43", "43.5", "44", "44.5", "45", "45.5", "46", "46.5", "47", "47.5", "48", "48.5", "49", "49.5", "50", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70"],
    ["Kolor", "biały", "czarny", "czerwony", "granatowy", "niebieski", "zielony", "żółty", "pomarańczowy", "fioletowy", "różowy", "szary", "brązowy", "beżowy", "kremowy", "turkusowy", "cyjan", "indygo", "bordowy", "liliowy", "lawendowy", "morelowy", "malinowy", "morski", "szmaragdowy", "oliwkowy", "musztardowy", "miodowy", "ceglasty", "khaki", "jasnoszary", "ciemnoszary", "jasnoniebieski", "ciemnoniebieski", "jasnozielony", "ciemnozielony", "jasnoczerwony", "ciemnoczerwony", "brzoskwiniowy", "śmietankowy", "morski błękit", "jasny turkus", "kobaltowy", "jasnofioletowy", "fuksja", "amarantowy", "herbaciany", "mietowy", "miętowy", "szafirowy", "piaskowy", "sepia", "błękit paryski", "szaroniebieski", "opalizujący", "grafitowy", "perłowy", "cytrynowy", "pastelowy róż", "neonowy zielony", "neonowy róż", "neonowy pomarańcz", "neonowy żółty", "czerwono-pomarańczowy", "cynamonowy", "rutynowy", "brudny róż", "brudny niebieski", "brudny zielony", "lawendowo-różowy", "żółtozielony", "stalowy", "tlenkowy", "winny", "malinowy", "agrestowy", "dżinsowy", "granatowy marynarski", "miedziany", "złoty", "srebrny", "platynowy", "antracytowy", "jasny brąz", "ciemny brąz", "marmurkowy", "szklisty", "opalowy", "lodowy niebieski", "niebiesko-szary", "jasny kremowy", "różowo-złoty", "karmelowy", "orzechowy", "konwaliowy", "arabski błękit", "amaranth", "amarantowy róż", "afrykański pomarańcz", "amarantowy czerwony", "ciemny liliowy", "śnieżnobiały", "szkarłatny", "czerwono-brązowy", "turkus morski", "jasny fiolet", "lawendowy błękit", "tytanowy", "jasny złoty", "pomarańczowo-czerwony", "zielono-żółty", "brudny żółty", "pudrowy róż", "fioletowo-niebieski", "piaskowy beż", "miodowo-brązowy", "jasny szmaragdowy", "ciemny fiolet", "petrol", "zgaszony zielony", "kakaowy", "konfitura malinowa", "ciemnobrązowy", "chabrowy", "żurawinowy", "morska zieleń", "morski błękit", "jasny miedziany", "seledynowy", "niebieskozielony", "granatowy atramentowy", "rubinowy", "jadeitowy", "leśny zielony", "kremowy biały", "pastelowy żółty", "piaskowy róż", "truskawkowy", "miedziany czerwony", "głęboki fiolet", "lawendowy szary", "kolor szafiru", "pomarańczowo-brązowy"],
    ["Materiał", "bawełna", "len", "jedwab", "wełna", "kaszmir", "mikrofibra", "poliester", "akryl", "nylon", "wiskoza", "modal", "len z konopi", "dzianina", "koronka", "satyna", "welur", "aksamit", "skóra naturalna", "skóra ekologiczna", "denim", "tkanina techniczna", "sztruks", "flanela", "tiul", "organza", "polar", "lycra", "gumka", "frotte", "sztuczne futro", "naturalne futro", "alpaka", "moher", "płótno", "juta", "len konopny", "szyfon", "tafta", "raszla", "krepa", "batyst", "dżersej", "softshell", "cordura", "piel", "gumowany materiał", "lateks", "filc", "bawełna organiczna", "len bawełniany", "wełna merino", "tweed", "gabardyna", "popelin", "gaza", "lyocell", "cupro", "ramia", "hemp", "bambus", "mikro polar", "polar sherpa", "microfleece", "poliakryl", "poliuretan", "elastan", "minky", "dzianina jersey", "dzianina interlock", "softshell membranowy", "tkanina wodoodporna", "taffeta", "laminat", "neopren", "materiał refleksyjny", "materiał odblaskowy", "mata silikonowa", "metalizowany materiał", "tkanina impregnowana", "tkanina membranowa", "materiał termoizolacyjny", "koronka elastyczna", "szyfon haftowany", "tafta matowa", "tafta błyszcząca", "brokat", "tkanina żakardowa", "organza brokatowa", "muślin", "tkanina dwuwarstwowa", "kordonet", "sztuczny zamsz", "naturalny zamsz", "tkanina membranowa Gore-Tex", "tkanina Coolmax", "materiał bambusowy", "len czesany", "bawełna egipska", "materiał lyocell", "tkanina poliamidowa", "softshell ocieplany", "tkanina aksamitna", "tkanina pluszowa", "taśma bawełniana", "tkanina jutowa", "materiał elastyczny", "tkanina mesh", "poliester z recyklingu", "tkanina powlekana", "tkanina z mikrofibry", "włókno węglowe", "tkanina izolacyjna", "tkanina odporna na ogień", "materiał antybakteryjny", "materiał oddychający", "tkanina antyalergiczna", "materiał antyelektrostatyczny", "tkanina hydrofobowa", "tkanina olejoodporna", "tkanina z jonami srebra", "tkanina z włókien naturalnych", "tkanina bawełniano-poliestrowa", "tkanina lniano-bawełniana", "tkanina polipropylenowa", "dzianina polarowa", "tkanina softshellowa", "tkanina ripstop", "materiał skórzany licowy", "materiał skórzany zamszowy", "tkanina neoprenowa", "materiał bambusowy bambus", "materiał techniczny", "tkanina z mikrowłókien", "tkanina winylowa", "tkanina poliestrowa", "tkanina nylonowa", "dzianina sportowa", "materiał izolacyjny termiczny", "tkanina stretch", "tkanina dżersejowa", "dzianina bawełniana", "tkanina polarowa ocieplana", "tkanina filcowa", "materiał plamoodporny", "tkanina paroprzepuszczalna", "materiał termoaktywny", "tkanina o właściwościach antybakteryjnych", "tkanina powlekana poliuretanem", "tkanina membranowa wodoodporna", "tkanina żakardowa tłoczona", "tkanina satynowa", "tkanina matowa", "materiał żeglarski", "tkanina poliestrowa z recyklingu", "materiał ekologiczny", "tkanina elastyczna z lycrą", "tkanina outdoorowa", "tkanina sportowa", "materiał odpornościowy", "tkanina odporna na rozdarcia", "materiał z włókien węglowych", "tkanina wodoodporna z membraną", "tkanina antywirusowa", "materiał odpornościowy na UV", "tkanina na odzież roboczą", "materiał techniczny do butów", "tkanina antyodorowa", "materiał z włókien naturalnych organicznych", "tkanina do odzieży dziecięcej", "materiał do obuwia sportowego", "tkanina z powłoką PTFE", "tkanina termiczna do zimy", "tkanina elastyczna do sportu"]
  ];

  for (let i = 0; i < positions.length; i++) {
    let sel = createSelect();
    sel.position(positions[i][0], positions[i][1]);
    sel.size(500, 100);
    for (let option of optionsList[i]) {
      sel.option(option);
    }
    sel.changed(() => {
      console.log(`Dropdown ${i + 1}: ${sel.value()}`);
    });
    dropdowns.push(sel);
  }
}

function setupMode2() {
  currentBackgroundIndex = 0;
  showTickButtons = false;
  ticksVisible = [false, false];

  closeButton = createButton('X');
  closeButton.size(50, 50);
  closeButton.position(width / 7 - 85, height / 5 + 9);
  closeButton.style('background', 'transparent');
  closeButton.style('border', 'none');
  closeButton.style('font-size', '70px');
  closeButton.style('color', 'transparent');
  closeButton.style('cursor', 'pointer');
  closeButton.mousePressed(() => {
    if (!showTickButtons && currentBackgroundIndex < backgrounds.length - 1) {
      currentBackgroundIndex++;
    } else if (!showTickButtons && currentBackgroundIndex === backgrounds.length - 1) {
      showTickButtons = true;
      setupTickButtons();
    }
  });
}

function setupTickButtons() {
  let btnWidth = 108;
  let btnHeight = 108;

  tickButtons = [
    {
      x: 535 * 4,
      y: 226 * 4,
      w: btnWidth,
      h: btnHeight,
      onClick: () => {
        ticksVisible[0] = !ticksVisible[0];
      }
    },
    {
     x: 535 * 4,
      y: 330 * 4,
      w: btnWidth,
      h: btnHeight,
      onClick: () => {
        ticksVisible[1] = !ticksVisible[1];
        setTimeout(()=>{
        window.open("https://kalar-png.github.io/regulamin-robot/","_self");
      },2000);
    }
  ];
}

function draw() {
  if (mode === 1) {
    background(bg);
  } else {
    if (!showTickButtons) {
      image(backgrounds[currentBackgroundIndex], 0, 0, width, height);
    } else {
      image(background7, 0, 0, width, height);
      if (ticksVisible[0]) image(tick, 535 * 4, 230 * 4, 108, 108);
      if (ticksVisible[1]) image(tick, 535 * 4, 335 * 4, 108, 108);
    }
  }
}

function mousePressed() {
  if (mode === 2 && showTickButtons) {
    for (let btn of tickButtons) {
      if (
        mouseX > btn.x &&
        mouseX < btn.x + btn.w &&
        mouseY > btn.y &&
        mouseY < btn.y + btn.h
      ) {
        btn.onClick();
      }
    }
  }
}
