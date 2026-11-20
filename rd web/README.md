# CARS24 Web Application (PHP, JS, CSS)

A high-performance, fully-interactive replica of the **CARS24** certified used-car and brand-new 2026 showroom car marketplace built strictly with **PHP, Vanilla JavaScript, and CSS3** (Zero static HTML files, no npm/Node dependencies required).

---

## 📁 Architecture & File Structure

```
rd web/
├── includes/
│   ├── config.php          # Core configuration, PHP session handler, constants & helper functions
│   ├── header.php          # Modular HTML <head>, meta tags, Google Fonts Inter, stylesheet & auth guard
│   ├── navbar.php          # Responsive sticky navigation, dynamic active tabs, search & city hub selector
│   └── footer.php          # Shared footer columns, customer demo links & core script tags
├── api/
│   ├── cars.php            # PHP REST endpoint for inventory filtering & catalog querying
│   ├── auth.php            # PHP backend session management & admin whitelist verifier
│   └── bookings.php        # PHP test drive & inspection booking endpoint
├── css/
│   └── style.css           # CARS24 theme (Orange #EF6E0B, Navy #0B1A2D, responsive flex/grid)
├── js/
│   ├── app.js              # Catalog filtering, comparison matrix, EMI engine, and admin dashboard logic
│   ├── auth.js             # Client session manager, booking storage & role verification
│   └── cars-data.js        # Comprehensive certified inventory and 2026 brand new car database
├── index.php               # Homepage & certified used car catalog
├── new-cars.php            # Brand new 2026 showroom cars store (0 Km factory fresh models)
├── compare.php             # Multi-car side-by-side comparison matrix
├── emi.php                 # Interactive EMI loan calculator with live donut chart
├── sell.php                # Instant AI vehicle valuation & doorstep inspection booking
├── admin.php               # Authorized dealer management dashboard (inventory CRUD & bookings)
├── admin-login.php         # High-security administrator login portal
└── README.md
```

---

## 🚀 Key Pages & Features

### 1. 🚗 Marketplace & Catalog (`index.php`)
- **Branded Design**: Signature CARS24 theme with vibrant orange accents (`#EF6E0B`), deep automotive navy (`#0B1A2D`), clean card layouts, and certified trust badges.
- **Dynamic Multi-Parameter Filters**:
  - **Search**: Instant live search by title, make, or model.
  - **City Hub Selector**: Filter inventory by hub (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Ahmedabad, Pune).
  - **Budget**: Quick filter pills (Under ₹6 Lakh, ₹6L - ₹10L, ₹10L - ₹15L, Above ₹15L).
  - **Brand**: Maruti Suzuki, Hyundai, Tata, Honda, Mahindra, Kia, Toyota, Volkswagen.
  - **Fuel**: Petrol, Diesel, CNG, Electric.
  - **Transmission**: Automatic & Manual.
  - **Body Type**: SUV, Hatchback, Sedan.
- **Sorting**: Featured & Recommended, Price: Low to High, Price: High to Low, Km Driven: Low to High, and Year: Newest First.
- **Car Cards**:
  - High-res vehicle image with offline SVG fallback.
  - *CARS24 Certified 140-Quality Checks* badge and *7-Day Return* badge.
  - Interactive Wishlist heart button.
  - Direct "Add to Compare" checkbox linked with floating comparison dock.
  - Calculated monthly EMI preview.
  - "View Details" and "Book Test Drive" actions.
- **Comprehensive Car Details Modal**:
  - Full technical specifications (Engine displacement, Max power, Certified ARAI mileage, NCAP safety score, Airbags, Seating).
  - 140-point inspection check score (e.g. 9.4 / 10).
  - Loaded feature list.
  - Doorstep Test Drive scheduler.

---

### 2. ✨ Brand New 2026 Showroom Cars (`new-cars.php`)
- **0 Km Factory Fresh Units**: 2026 official showroom models from Mahindra, Tata, Hyundai, Maruti Suzuki, Toyota, and Kia.
- **Color Palette Selector**: Real-time exterior color swatch switcher for each model.
- **Transparent Pricing**: Detailed on-road price breakdown (Ex-showroom, RTO registration, Insurance, Fastag).
- **100% Refundable Token Booking**: Online reservation with instant confirmation and chassis priority allotment.

---

### 3. ⚖️ Vehicle Comparison Matrix (`compare.php`)
- **Side-by-Side Comparison Matrix**: Compare up to **4 cars** concurrently.
- **Persistent Floating Dock**: Select cars anywhere in the catalog; floating compare dock slides up at the bottom showing vehicle thumbnails and direct "Compare Now" CTA.
- **3-Tier Comparison Matrix**:
  1. **Pricing & Financing**: Ex-hub price, monthly EMI, inspection rating, warranty coverage.
  2. **Technical Specifications**: Fuel type, transmission, km driven, engine cc, power output, certified mileage, body style.
  3. **Safety & Equipment**: Global NCAP star safety rating, airbag count, passenger seating, and equipment package.

---

### 4. 🧮 Interactive EMI Calculator (`emi.php`)
- **Synced Range Sliders & Inputs**:
  - Vehicle Price: ₹1.5 Lakh to ₹40 Lakh.
  - Down Payment: ₹0 (Zero Downpayment loan) to 80% with auto-capped upper limit.
  - Interest Rate: 7.0% to 18.0% p.a.
  - Loan Tenure: Quick toggle pills for 1, 2, 3, 4, 5, or 7 Years.
- **Standard Amortization Formula**: Computes exact monthly installment, total interest payable, and total loan obligation.
- **HTML5 Canvas Donut Chart**: Real-time visual breakdown of Principal Loan vs Total Interest.
- **Live Vehicle Recommendations**: Recommends certified cars matching the user's computed monthly budget.

---

### 5. 💰 Instant Sell Car Valuation (`sell.php`)
- **Resale Valuation Engine**: Instant AI estimation based on Brand, Model, Registration Year, Total Km Run, and Physical Condition.
- **Fair Price Range**: Generates an estimated market valuation range (e.g. ₹6.45 Lakh - ₹7.10 Lakh).
- **Free Doorstep Inspection Booking**: Schedule an appointment for doorstep vehicle evaluation and same-day bank payment.

---

### 6. 🛡️ User & Administrator Security (`admin.php` & `admin-login.php`)
- **Strict Role-Based Access Control**:
  - **Customer / Buyer**: Access to Wishlist, Bookings, Compare, EMI Calculator, and Test Drive scheduling.
  - **Administrator**: Restricted strictly to the 3 whitelisted admin accounts.
- **Authorized Administrator Credentials**:
  1. `sujal@gmail.com` | Password: `123456` (Sujal Kanani)
  2. `harsh@gmail.com` | Password: `123456` (Harsh)
  3. `paras@gmail.com` | Password: `123456` (Paras)
- **Demo Customer Credentials**:
  - `user@cars24.com` | Password: `user123`
- **Admin Dashboard**:
  - **Executive KPI Cards**: Active Inventory, Total Stock Value (in Lakhs/Crore), Test Drive Inquiries, and Sold Vehicles.
  - **Inventory Manager**: Add new cars, toggle Available/Sold, edit pricing/specs, delete cars, reset catalog.
  - **Test Drive & Inquiry Dispatcher**: Real-time customer bookings management with status transitions (`Confirmed`, `Pending`, `Completed`, `Cancelled`).

---

## 🖥️ How to Run

You can run the web application using the built-in PHP development server or any standard PHP environment (Herd, XAMPP, WAMP, Laragon, or Apache/Nginx).

### Option 1: Built-in PHP Development Server (Recommended)

Run the following command in PowerShell inside the project directory:

```powershell
# Start PHP server on port 8000
php -S localhost:8000
```

*(If using Herd Lite PHP binary directly)*:
```powershell
& "$env:USERPROFILE\.config\herd-lite\bin\php.exe" -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: XAMPP / WAMP / Apache
Place the `rd web` folder into your `htdocs` or `www` directory and visit:
```
http://localhost/rd%20web/index.php
```
