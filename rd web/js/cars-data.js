window.DEFAULT_CAR_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20640%20360%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230b1a2d%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23162a45%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22640%22%20height%3D%22360%22%20fill%3D%22url(%23g)%22%2F%3E%3Cpath%20d%3D%22M140%20240%20L190%20150%20L410%20150%20L480%20210%20L510%20240%20L510%20270%20L140%20270%20Z%22%20fill%3D%22%23ef6e0b%22%20opacity%3D%220.9%22%2F%3E%3Ccircle%20cx%3D%22220%22%20cy%3D%22270%22%20r%3D%2230%22%20fill%3D%22%23060e18%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%226%22%2F%3E%3Ccircle%20cx%3D%22440%22%20cy%3D%22270%22%20r%3D%2230%22%20fill%3D%22%23060e18%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%226%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2280%22%20font-family%3D%22system-ui%2C%20sans-serif%22%20font-size%3D%2222%22%20font-weight%3D%22bold%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221%22%3ECARS24%20CERTIFIED%3C%2Ftext%3E%3C%2Fsvg%3E";

const DEFAULT_CARS = [
  {
    id: "c24-101",
    title: "2021 Hyundai Creta SX (O) 1.5 Petrol",
    brand: "Hyundai",
    model: "Creta",
    year: 2021,
    price: 1385000,
    originalPrice: 1680000,
    km: 28400,
    fuel: "Petrol",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Mumbai",
    rto: "MH-02",
    bodyType: "SUV",
    color: "Polar White",
    mileage: "16.9 kmpl",
    engine: "1497 cc",
    power: "113 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "4 Star (Global NCAP)",
    inspectionScore: "9.4 / 10",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    featured: true,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "Panoramic Sunroof",
      "Bose 8-Speaker Audio System",
      "Ventilated Front Seats",
      "Wireless Smartphone Charger",
      "Electronic Parking Brake with Auto Hold",
      "10.25-inch HD Touchscreen with Apple CarPlay & Android Auto",
      "Rear Parking Camera with Sensors",
      "Cruise Control"
    ]
  },
  {
    id: "c24-102",
    title: "2020 Maruti Suzuki Swift ZXI+",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2020,
    price: 645000,
    originalPrice: 830000,
    km: 36200,
    fuel: "Petrol",
    transmission: "Manual",
    ownership: "1st Owner",
    city: "Delhi NCR",
    rto: "DL-04",
    bodyType: "Hatchback",
    color: "Solid Fire Red",
    mileage: "23.2 kmpl",
    engine: "1197 cc",
    power: "88.5 bhp",
    seating: 5,
    airbags: 2,
    safetyRating: "3 Star (Global NCAP)",
    inspectionScore: "9.2 / 10",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "SmartPlay Studio 7-inch Touchscreen",
      "LED Projector Headlamps with DRLs",
      "Push Button Engine Start/Stop",
      "Automatic Climate Control",
      "Precision-Cut Alloy Wheels",
      "Reverse Parking Camera"
    ]
  },
  {
    id: "c24-103",
    title: "2022 Tata Nexon Fearless Plus S (Dark)",
    brand: "Tata",
    model: "Nexon",
    year: 2022,
    price: 1120000,
    originalPrice: 1390000,
    km: 19800,
    fuel: "Diesel",
    transmission: "Manual",
    ownership: "1st Owner",
    city: "Bengaluru",
    rto: "KA-05",
    bodyType: "SUV",
    color: "Atlas Black (Dark Edition)",
    mileage: "24.0 kmpl",
    engine: "1497 cc",
    power: "113.4 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Global NCAP)",
    inspectionScore: "9.6 / 10",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    featured: true,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "5 Star Global NCAP Safety Rating",
      "Voice Assisted Electric Sunroof",
      "Harman 8-Speaker Sound System",
      "Drive Modes: Eco, City, Sport",
      "Air Purifier with AQI Display",
      "Tire Pressure Monitoring System (TPMS)"
    ]
  },
  {
    id: "c24-104",
    title: "2019 Honda City 1.5 V i-VTEC",
    brand: "Honda",
    model: "City",
    year: 2019,
    price: 795000,
    originalPrice: 1140000,
    km: 44000,
    fuel: "Petrol",
    transmission: "Manual",
    ownership: "1st Owner",
    city: "Mumbai",
    rto: "MH-01",
    bodyType: "Sedan",
    color: "Golden Brown Metallic",
    mileage: "17.4 kmpl",
    engine: "1498 cc",
    power: "117.3 bhp",
    seating: 5,
    airbags: 4,
    safetyRating: "4 Star (ASEAN NCAP)",
    inspectionScore: "9.1 / 10",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "Cruise Control",
      "Electric Sunroof with One-Touch Operation",
      "Touch Panel Automatic AC",
      "Digipad 2.0 Infotainment",
      "Diamond Cut Alloy Wheels",
      "Spacious 510 Litre Boot Space"
    ]
  },
  {
    id: "c24-105",
    title: "2021 Mahindra Thar LX 4x4 Hard Top Diesel",
    brand: "Mahindra",
    model: "Thar",
    year: 2021,
    price: 1475000,
    originalPrice: 1780000,
    km: 24500,
    fuel: "Diesel",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Delhi NCR",
    rto: "HR-26",
    bodyType: "SUV",
    color: "Napoli Black",
    mileage: "15.2 kmpl",
    engine: "2184 cc",
    power: "130 bhp",
    seating: 4,
    airbags: 2,
    safetyRating: "4 Star (Global NCAP)",
    inspectionScore: "9.5 / 10",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    featured: true,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "4x4 Real Shift-On-Fly Mechanism with Low Range",
      "Convertible/Moulded Hard Top",
      "7-inch Touchscreen with Adventure Stats",
      "Roll Cage & ESP with Rollover Mitigation",
      "All-Terrain Tires on 18-inch Deep Silver Alloys"
    ]
  },
  {
    id: "c24-106",
    title: "2020 Kia Seltos HTX 1.5 Diesel",
    brand: "Kia",
    model: "Seltos",
    year: 2020,
    price: 1190000,
    originalPrice: 1520000,
    km: 41000,
    fuel: "Diesel",
    transmission: "Automatic",
    ownership: "2nd Owner",
    city: "Hyderabad",
    rto: "TS-09",
    bodyType: "SUV",
    color: "Glacier White Pearl",
    mileage: "18.0 kmpl",
    engine: "1493 cc",
    power: "113.4 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "3 Star (Global NCAP)",
    inspectionScore: "9.0 / 10",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "10.25-inch HD Touchscreen",
      "UV Cut Solar Glass",
      "LED Crown Jewel Headlamps with Sweeping Indicators",
      "Smart Pure Air Purifier with Perfume Diffuser",
      "Bose Premium Sound System"
    ]
  },
  {
    id: "c24-107",
    title: "2018 Toyota Fortuner 2.8 4x2 AT",
    brand: "Toyota",
    model: "Fortuner",
    year: 2018,
    price: 2490000,
    originalPrice: 3450000,
    km: 68000,
    fuel: "Diesel",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Ahmedabad",
    rto: "GJ-01",
    bodyType: "SUV",
    color: "Attitude Black",
    mileage: "14.2 kmpl",
    engine: "2755 cc",
    power: "174.5 bhp",
    seating: 7,
    airbags: 7,
    safetyRating: "5 Star (ANCAP)",
    inspectionScore: "9.3 / 10",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    featured: true,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "7 Seater Full-Size Luxury SUV",
      "Automatic Powered Tailgate with Memory",
      "7 Airbags & Vehicle Stability Control (VSC)",
      "Paddle Shifters & Cruise Control",
      "Leather Upholstery with 8-way Power Driver Seat"
    ]
  },
  {
    id: "c24-108",
    title: "2023 Maruti Suzuki Baleno Alpha 1.2 AMT",
    brand: "Maruti Suzuki",
    model: "Baleno",
    year: 2023,
    price: 865000,
    originalPrice: 990000,
    km: 12500,
    fuel: "Petrol",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Pune",
    rto: "MH-12",
    bodyType: "Hatchback",
    color: "Celestial Blue",
    mileage: "22.9 kmpl",
    engine: "1197 cc",
    power: "88.5 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "4 Star (Global NCAP)",
    inspectionScore: "9.7 / 10",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "Heads-Up Display (HUD)",
      "360-Degree HD View Camera",
      "Surround Sense Sound tuned by ARKAMYS",
      "SmartPlay Pro+ 9-inch Display",
      "Auto-Dimming IRVM & UV Cut Glasses"
    ]
  },
  {
    id: "c24-109",
    title: "2020 Volkswagen Polo GT TSI",
    brand: "Volkswagen",
    model: "Polo",
    year: 2020,
    price: 810000,
    originalPrice: 1040000,
    km: 31000,
    fuel: "Petrol",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Bengaluru",
    rto: "KA-01",
    bodyType: "Hatchback",
    color: "Flash Red",
    mileage: "18.2 kmpl",
    engine: "999 cc Turbo",
    power: "108.6 bhp",
    seating: 5,
    airbags: 4,
    safetyRating: "4 Star (Global NCAP)",
    inspectionScore: "9.3 / 10",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "TSI Turbocharged Performance Engine",
      "6-Speed Torque Converter AT",
      "German Build Quality & Laser Welded Roof",
      "Cruise Control & Flat-Bottom Leather Steering",
      "Rain Sensing Wipers"
    ]
  },
  {
    id: "c24-110",
    title: "2021 MG Hector Sharp 2.0 Diesel",
    brand: "MG",
    model: "Hector",
    year: 2021,
    price: 1490000,
    originalPrice: 1980000,
    km: 37000,
    fuel: "Diesel",
    transmission: "Manual",
    ownership: "1st Owner",
    city: "Delhi NCR",
    rto: "DL-01",
    bodyType: "SUV",
    color: "Burgundy Red",
    mileage: "15.8 kmpl",
    engine: "1956 cc",
    power: "168 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (ASEAN NCAP)",
    inspectionScore: "9.2 / 10",
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "10.4-inch Portrait Touchscreen with i-SMART Connected Tech",
      "Infinity 8-Speaker Audio System with Subwoofer",
      "Panoramic Dual-Pane Sunroof",
      "360 Degree Parking Camera",
      "Heated ORVMs & Electric Tailgate"
    ]
  },
  {
    id: "c24-111",
    title: "2022 Tata Punch Creative AMT",
    brand: "Tata",
    model: "Punch",
    year: 2022,
    price: 780000,
    originalPrice: 920000,
    km: 18000,
    fuel: "Petrol",
    transmission: "Automatic",
    ownership: "1st Owner",
    city: "Mumbai",
    rto: "MH-04",
    bodyType: "SUV",
    color: "Tropical Mist Dual Tone",
    mileage: "18.9 kmpl",
    engine: "1199 cc",
    power: "85 bhp",
    seating: 5,
    airbags: 2,
    safetyRating: "5 Star (Global NCAP)",
    inspectionScore: "9.5 / 10",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "5 Star Global NCAP Safety Rating",
      "90-Degree Opening Doors",
      "Auto Headlamps and Rain Sensing Wipers",
      "7-inch TFT Instrument Cluster",
      "Cooled Glovebox & Cruise Control"
    ]
  },
  {
    id: "c24-112",
    title: "2019 Maruti Suzuki Dzire VXI CNG",
    brand: "Maruti Suzuki",
    model: "Dzire",
    year: 2019,
    price: 560000,
    originalPrice: 760000,
    km: 52000,
    fuel: "CNG",
    transmission: "Manual",
    ownership: "1st Owner",
    city: "Ahmedabad",
    rto: "GJ-27",
    bodyType: "Sedan",
    color: "Magma Grey",
    mileage: "31.1 km/kg",
    engine: "1197 cc",
    power: "76 bhp",
    seating: 5,
    airbags: 2,
    safetyRating: "3 Star (Global NCAP)",
    inspectionScore: "8.9 / 10",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    featured: false,
    sold: false,
    warranty: "12 Months Warranty + 7 Days Return",
    features: [
      "Company Fitted S-CNG Kit",
      "Ultra High Fuel Efficiency 31.1 km/kg",
      "Rear AC Vents with 12V Socket",
      "Dual Airbags & ABS with EBD",
      "Keyless Central Locking"
    ]
  }
];

const CARS_STORAGE_KEY = 'cars24_inventory_v1';

class CarsDataManager {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(CARS_STORAGE_KEY)) {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(DEFAULT_CARS));
    }
  }

  getAllCars() {
    try {
      const data = localStorage.getItem(CARS_STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_CARS;
    } catch (e) {
      console.error("Error reading cars catalog:", e);
      return DEFAULT_CARS;
    }
  }

  getCarById(id) {
    const cars = this.getAllCars();
    const found = cars.find(c => c.id === id);
    if (found) return found;
    return this.getNewCarById(id);
  }

  saveAllCars(cars) {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars));
    window.dispatchEvent(new CustomEvent('carsUpdated', { detail: { cars } }));
  }

  addCar(carData) {
    const cars = this.getAllCars();
    const newCar = {
      id: 'c24-' + Date.now().toString().slice(-6),
      featured: false,
      sold: false,
      inspectionScore: "9.3 / 10",
      warranty: "12 Months Warranty + 7 Days Return",
      features: carData.features && carData.features.length ? carData.features : [
        "140 Points Quality Checked",
        "Air Conditioning with Heater",
        "Power Steering & Power Windows",
        "Anti-lock Braking System (ABS)",
        "Music Infotainment System"
      ],
      ...carData
    };

    // Calculate default price formatting helper if needed
    newCar.price = Number(newCar.price);
    newCar.year = Number(newCar.year);
    newCar.km = Number(newCar.km);

    cars.unshift(newCar);
    this.saveAllCars(cars);
    return newCar;
  }

  updateCar(id, updatedFields) {
    const cars = this.getAllCars();
    const index = cars.findIndex(c => c.id === id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...updatedFields };
      if (updatedFields.price) cars[index].price = Number(updatedFields.price);
      if (updatedFields.km) cars[index].km = Number(updatedFields.km);
      if (updatedFields.year) cars[index].year = Number(updatedFields.year);
      this.saveAllCars(cars);
      return cars[index];
    }
    return null;
  }

  deleteCar(id) {
    let cars = this.getAllCars();
    const countBefore = cars.length;
    cars = cars.filter(c => c.id !== id);
    if (cars.length !== countBefore) {
      this.saveAllCars(cars);
      return true;
    }
    return false;
  }

  toggleSold(id) {
    const car = this.getCarById(id);
    if (car) {
      return this.updateCar(id, { sold: !car.sold });
    }
    return null;
  }

  resetToDefault() {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(DEFAULT_CARS));
    window.dispatchEvent(new CustomEvent('carsUpdated', { detail: { cars: DEFAULT_CARS } }));
  }

  // ================= NEW CARS MANAGEMENT =================
  getAllNewCars() {
    try {
      const data = localStorage.getItem('cars24_new_inventory_v1');
      return data ? JSON.parse(data) : DEFAULT_NEW_CARS;
    } catch (e) {
      return DEFAULT_NEW_CARS;
    }
  }

  getNewCarById(id) {
    const list = this.getAllNewCars();
    return list.find(c => c.id === id) || null;
  }

  saveAllNewCars(cars) {
    localStorage.setItem('cars24_new_inventory_v1', JSON.stringify(cars));
    window.dispatchEvent(new CustomEvent('newCarsUpdated', { detail: { cars } }));
  }

  addNewCarListing(carData) {
    const cars = this.getAllNewCars();
    const newCar = {
      id: 'nc-' + Date.now().toString().slice(-5),
      isNew: true,
      tokenAmount: 10000,
      warranty: "3 Years / 1,00,000 km Manufacturer Warranty",
      waitingPeriod: "2 - 4 Weeks",
      safetyRating: "5 Star (Bharat NCAP)",
      colors: ["Midnight Black", "Glacier White", "Graphite Grey", "Royal Red"],
      features: [
        "Brand New Showroom Delivery",
        "Factory Fresh 0 Km Odometer",
        "Full Manufacturer 3-Year Warranty",
        "CARS24 Best Price & Quick Allocation Guarantee"
      ],
      ...carData
    };
    newCar.exShowroomPrice = Number(newCar.exShowroomPrice);
    newCar.onRoadPrice = Number(newCar.onRoadPrice || Math.round(newCar.exShowroomPrice * 1.15));
    cars.unshift(newCar);
    this.saveAllNewCars(cars);
    return newCar;
  }

  deleteNewCar(id) {
    let cars = this.getAllNewCars();
    cars = cars.filter(c => c.id !== id);
    this.saveAllNewCars(cars);
    return true;
  }

  // Formatting helpers
  static formatPrice(amount) {
    if (!amount || isNaN(amount)) return "₹0";
    const num = Number(amount);
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakh`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  }

  static formatKm(km) {
    if (!km || isNaN(km)) return "0 km";
    return `${Number(km).toLocaleString('en-IN')} km`;
  }

  static calculateMonthlyEMI(principal, annualRate = 9.5, tenureMonths = 60) {
    if (!principal || principal <= 0) return 0;
    const monthlyRate = (annualRate / 12) / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  }
}

// Default Seed Catalog for Brand New 2025/2026 Launches
const DEFAULT_NEW_CARS = [
  {
    id: "nc-201",
    title: "2026 Mahindra Thar ROXX (5-Door)",
    brand: "Mahindra",
    model: "Thar ROXX",
    year: 2026,
    isNew: true,
    exShowroomPrice: 1299000,
    onRoadPrice: 1515000,
    tokenAmount: 10000,
    fuel: "Diesel / Petrol",
    transmission: "Automatic & Manual",
    bodyType: "SUV",
    waitingPeriod: "3 - 5 Weeks",
    mileage: "15.2 kmpl",
    engine: "2184 cc mHawk Turbo",
    power: "175 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Bharat NCAP)",
    warranty: "3 Years / 1,00,000 km Warranty",
    colors: ["Stealth Black", "Everest White", "Deep Forest", "Tango Red"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    features: [
      "Panoramic Skyroof (Largest in Segment)",
      "Level 2 ADAS (Advanced Driver Assistance)",
      "Harman Kardon 9-Speaker Audio System",
      "Dual 10.25-inch Digital Screens",
      "Ventilated Front Seats & 4x4 Shift-On-Fly"
    ]
  },
  {
    id: "nc-202",
    title: "2026 Tata Curvv SUV Coupe",
    brand: "Tata",
    model: "Curvv",
    year: 2026,
    isNew: true,
    exShowroomPrice: 999000,
    onRoadPrice: 1145000,
    tokenAmount: 10000,
    fuel: "Petrol / Diesel",
    transmission: "Manual & DCA Automatic",
    bodyType: "SUV",
    waitingPeriod: "2 - 4 Weeks",
    mileage: "18.5 kmpl",
    engine: "1.2L Hyperion GDI Turbo",
    power: "125 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Bharat NCAP)",
    warranty: "3 Years / 1,00,000 km Warranty",
    colors: ["Gold Essence", "Flame Red", "Daytona Grey", "Pristine White"],
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    features: [
      "Dynamic Coupe Silhouette & Sloping Roofline",
      "Powered Tailgate with Gesture Sensor",
      "Arcade.ev App Suite with OTT streaming",
      "Flush Door Handles with Welcome Light",
      "12.3-inch Cinematic Touchscreen by HARMAN"
    ]
  },
  {
    id: "nc-203",
    title: "2026 Hyundai Creta Facelift",
    brand: "Hyundai",
    model: "Creta",
    year: 2026,
    isNew: true,
    exShowroomPrice: 1099000,
    onRoadPrice: 1285000,
    tokenAmount: 10000,
    fuel: "Petrol / Diesel",
    transmission: "Automatic (IVT/DCT) & Manual",
    bodyType: "SUV",
    waitingPeriod: "1 - 3 Weeks",
    mileage: "17.4 kmpl",
    engine: "1.5L Turbo GDi / 1.5L MPi",
    power: "160 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Bharat NCAP)",
    warranty: "3 Years / Unlimited km Warranty",
    colors: ["Robust Emerald Pearl", "Atlas White", "Abyss Black", "Ranger Khaki"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    features: [
      "Level 2 SmartSense ADAS with 19 Features",
      "Seamless Dual 10.25-inch Curved Displays",
      "Bose Premium 8-Speaker Audio System",
      "Voice Enabled Smart Panoramic Sunroof",
      "Dual Zone Fully Automatic Temperature Control"
    ]
  },
  {
    id: "nc-204",
    title: "2026 Maruti Suzuki Swift (4th Gen)",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2026,
    isNew: true,
    exShowroomPrice: 649000,
    onRoadPrice: 742000,
    tokenAmount: 5000,
    fuel: "Petrol",
    transmission: "Manual & 5-Speed AMT",
    bodyType: "Hatchback",
    waitingPeriod: "1 - 2 Weeks",
    mileage: "24.8 kmpl (Ultra High Mileage)",
    engine: "1197 cc Z-Series 3-Cylinder",
    power: "82 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "4 Star (Global NCAP)",
    warranty: "3 Years / 1,00,000 km Warranty",
    colors: ["Luster Blue", "Novel Orange", "Sizzling Red", "Splendid Silver"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    features: [
      "All-New Z-Series Engine with 24.8 kmpl Economy",
      "6 Airbags Standard Across All Variants",
      "9-inch SmartPlay Pro+ Touchscreen with Arkamys Audio",
      "Wireless Apple CarPlay & Android Auto",
      "Rear AC Vents & Type-C Fast Chargers"
    ]
  },
  {
    id: "nc-205",
    title: "2026 Toyota Innova Hycross Hybrid",
    brand: "Toyota",
    model: "Innova Hycross",
    year: 2026,
    isNew: true,
    exShowroomPrice: 1977000,
    onRoadPrice: 2320000,
    tokenAmount: 25000,
    fuel: "Strong Hybrid Electric",
    transmission: "e-CVT Automatic",
    bodyType: "SUV",
    waitingPeriod: "4 - 6 Weeks",
    mileage: "23.24 kmpl (Hybrid)",
    engine: "1987 cc 2.0L TNGA Hybrid",
    power: "184 bhp Combined",
    seating: 7,
    airbags: 6,
    safetyRating: "5 Star (ANCAP)",
    warranty: "8 Years / 1,60,000 km Hybrid Battery Warranty",
    colors: ["Blackish Ageha Glass Flake", "Platinum White Pearl", "Silver Metallic"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    features: [
      "Self-Charging Strong Hybrid Electric Powertrain",
      "Powered Ottoman Second Row Captain Seats",
      "Toyota Safety Sense (TSS 3.0 ADAS Suite)",
      "Panoramic Sunroof with Mood Lighting",
      "Dual Zone Climate Control Front & Rear"
    ]
  },
  {
    id: "nc-206",
    title: "2026 Kia Seltos Facelift X-Line",
    brand: "Kia",
    model: "Seltos",
    year: 2026,
    isNew: true,
    exShowroomPrice: 1089000,
    onRoadPrice: 1270000,
    tokenAmount: 10000,
    fuel: "Petrol / Diesel",
    transmission: "7-Speed DCT / 6-Speed AT",
    bodyType: "SUV",
    waitingPeriod: "2 - 3 Weeks",
    mileage: "18.0 kmpl",
    engine: "1.5L Smartstream T-GDi Petrol",
    power: "160 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Bharat NCAP)",
    warranty: "3 Years / Unlimited km Warranty",
    colors: ["Matte Graphite X-Line", "Imperial Blue", "Glacier White", "Aurora Black"],
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    features: [
      "Exclusive Matte Finish Body Exterior",
      "Dual Panoramic Displays with Navigation",
      "Level 2 ADAS with Autonomous Emergency Braking",
      "Dual Zone Fully Automatic AC",
      "Bose 8-Speaker Sound System"
    ]
  },
  {
    id: "nc-207",
    title: "2026 Mahindra XUV 3XO AX7L",
    brand: "Mahindra",
    model: "XUV 3XO",
    year: 2026,
    isNew: true,
    exShowroomPrice: 749000,
    onRoadPrice: 865000,
    tokenAmount: 10000,
    fuel: "Petrol / Diesel",
    transmission: "6-Speed AISIN Automatic & Manual",
    bodyType: "SUV",
    waitingPeriod: "3 - 4 Weeks",
    mileage: "20.1 kmpl",
    engine: "1197 cc mStallion TGDi Turbo",
    power: "130 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Global NCAP)",
    warranty: "3 Years / 1,00,000 km Warranty",
    colors: ["Citrine Yellow", "Dune Beige", "Nebula Blue", "Everest White"],
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    features: [
      "Segment-First Panoramic Skyroof",
      "Level 2 ADAS with 10 Active Safety Features",
      "Harman Kardon Premium Sound with 7 Speakers",
      "Dual-Zone Climate Control",
      "Electronic Parking Brake with Auto Hold"
    ]
  },
  {
    id: "nc-208",
    title: "2026 Honda Elevate ZX ADAS",
    brand: "Honda",
    model: "Elevate",
    year: 2026,
    isNew: true,
    exShowroomPrice: 1191000,
    onRoadPrice: 1395000,
    tokenAmount: 10000,
    fuel: "Petrol",
    transmission: "7-Speed CVT with Paddle Shifters",
    bodyType: "SUV",
    waitingPeriod: "1 - 2 Weeks",
    mileage: "16.92 kmpl",
    engine: "1498 cc i-VTEC DOHC",
    power: "121 bhp",
    seating: 5,
    airbags: 6,
    safetyRating: "5 Star (Bharat NCAP)",
    warranty: "3 Years / Unlimited km Warranty",
    colors: ["Phoenix Orange Pearl", "Obsidian Blue Pearl", "Platinum White Pearl"],
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    features: [
      "Honda SENSING Camera-Based ADAS Tech",
      "Class-Leading 220mm High Ground Clearance",
      "Huge 458 Litres Cargo Boot Capacity",
      "10.25-inch High-Definition Touchscreen",
      "LaneWatch Blindspot Camera"
    ]
  }
];

// Global instance
window.carsDB = new CarsDataManager();

