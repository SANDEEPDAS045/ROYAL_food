# ✨ Royal Foods Luxury Hospitality System

A full-stack restaurant & dining room management dashboard with a classy, modern luxury aesthetic ("Luxe Noir").

**Stack:** HTML · Vanilla CSS · JavaScript · Python (Flask) · SQLite

---

## 📁 Project Structure

```
nova/
├── backend/
│   ├── app.py          # Flask REST API
│   ├── schema.sql      # DB schema + seed data
│   └── requirements.txt
└── frontend/
    ├── index.html      # SPA shell
    ├── style.css       # Luxe Noir design system
    ├── app.js          # Router · API · Modal · Toast
    ├── dashboard.js    # Stats + Chart.js chart
    ├── tables.js       # Floor plan + table management
    ├── orders.js       # Order builder + live feed
    ├── menu.js         # Culinary catalogue CRUD
    └── customers.js    # VIP & guest directory
```

---

## 🚀 Quick Start

### 1. Navigate to the project

```bash
cd backend
```

### 2. Run the server

```bash
python app.py
```

You should see:
```
  ✨  Royal Foods Luxury Hospitality Management System
  ✅  Database initialised at: .../restaurant.db
  🌐  Open → http://localhost:5050
```

### 3. Open the app

Visit **http://localhost:5050** in your browser.

> The database is automatically created with seed data (12 tables, 15 menu items,
> 5 customers, and a week of sample order history) on first launch.

---

## 🔌 REST API Reference

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/dashboard/stats   | Revenue, active tables, chart   |
| GET    | /api/customers         | List / search customers         |
| POST   | /api/customers         | Create customer                 |
| GET    | /api/customers/:id     | Customer + order history        |
| PUT    | /api/customers/:id     | Update customer                 |
| DELETE | /api/customers/:id     | Delete customer                 |
| GET    | /api/tables            | All tables with status          |
| PUT    | /api/tables/:id        | Update table status/assignment  |
| GET    | /api/menu              | All menu items                  |
| POST   | /api/menu              | Add menu item                   |
| PUT    | /api/menu/:id          | Update menu item                |
| DELETE | /api/menu/:id          | Delete menu item                |
| GET    | /api/orders            | List orders (filter by status)  |
| POST   | /api/orders            | Create new order                |
| GET    | /api/orders/:id        | Order details + items           |
| PUT    | /api/orders/:id        | Update order status             |

---

## 🎨 Features

### Dashboard
- Live stats (revenue, active tables, today's orders, top item)
- Interactive Chart.js weekly revenue area chart
- Recent orders feed

### Tables
- 12-table grid with color-coded status
  - 🟢 Green = Available
  - 🟣 Purple = Occupied  
  - 🟡 Yellow = Billing Pending
- Click any table to assign customer, place order, generate bill, or mark paid
- Changes instantly update the database

### Orders
- Create orders with multi-item builder
- Link to customer + table
- Filter by status (Active / Billing / Paid)
- Quick actions: request bill, mark paid, cancel

### Menu
- Full CRUD for menu items
- Category filter tabs
- Price, description, category management

### Customers
- Searchable directory
- Full order history per customer
- Total orders and spend tracked

---

## 🛠️ Requirements

- Python 3.8+
- Modern browser (Chrome, Firefox, Edge, Safari)
- No frontend build step needed
