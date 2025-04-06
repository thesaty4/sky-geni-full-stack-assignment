# 📊 Data Visualization Dashboard – Assignment Submission

This project is a full-stack data visualization dashboard developed as part of a coding assignment. The objective is to read multiple data slices (provided in JSON format), serve them through an API, and render them using charts on the frontend using React and D3.js.

## 🧾 Assignment Details

**Given Data (from Google Drive):**
- Customer type.json
- Account Industry.json
- Team.json
- ACV Range.json

📂 Google Drive Link: [Assignment Data & Instructions](https://drive.google.com/drive/folders/19JtCavYRn5ImZb9ooLp6vozKAqeP5yU9?usp=sharing)

---


## 📌 Features Implemented

### 🔧 Backend
- Parses and reads all provided JSON data files.
- Organizes and structures the data for frontend consumption.
- Provides a RESTful API with appropriate endpoints for each dataset.

### 💻 Frontend
- Developed using **React** + **TypeScript**.
- Uses **Material UI** for component styling and responsive layout.
- Each data slice is displayed in its own **Card**.
- Charts are created using **D3.js**:
  - Donut Charts
  - Bar Charts

---

## 📁 Folder Structure

```
root/
│
├── backend/    
|   ├── src      # Express.js + MongoDB API
│   |    ├── controllers/      # API logic
│   |    ├── models/           # Schemas or types
│   |    ├── routes/           # API endpoints
│   |    ├── data/             # Files from where we are reading all data.
│   |    ├── services/         # Communicating with database or reading file, all logic written here
│   |    └── shared/           # All shared things will here, types, utils etc
|   └── route.ts # All routes defined here
|   └── server.ts # Entry point (TypeScript)
|
├── frontend/             # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── main.tsx
│   └── vite.config.ts
│
├── docs/                 # API Documentation (Swagger or Markdown)
│
├── .env.example          # Sample environment variables
├── package.json
└── README.md             # You are here!
```

---

## 🛠️ Tech Stack

### Frontend:
- React + TypeScript
- Material UI
- D3.js
- Axios

### Backend:
- Node.js
- Express.js
- TypeScript
- CORS, dotenv

---


## 🔗 API Endpoints

| Endpoint                                                       | Description                |
|----------------------------------------------------------------|----------------------------|
| `/api/v1/customer-type/dashboard?module=customer`              | Returns Customer Type data |
| `/api/v1/customer-type/dashboard?module=account`               | Returns Account Industry data |
| `/api/v1/customer-type/dashboard?module=team`                  | Returns Team data          |
| `/api/v1/customer-type/dashboard?module=acv`                   | Returns ACV Range data     |

---

## 🚀 Running the Project

### 🔙 Backend

```bash
cd backend
npm install
npm run dev
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots


