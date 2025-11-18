# 📦 Companies Directory — React Project

A simple and responsive **Companies Directory** built using **React.js** and **Material UI**, with filtering and sorting features.  
This project is created as part of the **Frontend Developer Assignment – Frontlines Media**.

---

## 🚀 Live Demo  
🔗 **Deployed on Vercel:**  
https://frontlines-task-kohl.vercel.app/

---

## 📁 Project Structure

companies-directory/
├── public/
│ └── companies.json
├── src/
│ ├── components/
│ │ ├── CompanyTable.js
│ │ └── FilterControls.js
│ ├── App.js
│ ├── index.js
├── package.json
└── README.md



---

## 🎯 Features Implemented

### ✅ Frontend (React.js)
- Responsive UI using **Material-UI (MUI)**  
- Displays companies in a clean **table format**  
- **Search filter** (by name / location / industry)  
- **Dropdown filters** for location & industry  
- **Sorting** by:
  - Name  
  - Location  
  - Industry  
  - Ascending / Descending toggle  
- **Reusable components**
  - `CompanyTable.js`
  - `FilterControls.js`
- **State management with React Hooks**

---

## 🔌 API Integration

This project uses a **mock API** using a static JSON file:

📄 `/public/companies.json`

Fetching is done using:
```js
fetch('/companies.json')
No backend is required.

🛠️ How to Run Locally
Clone this repository:


git clone https://github.com/manoja958/frontlines_Task.git
Go into the project folder:

cd frontlines_Task/companies-directory
Install dependencies:

npm install
Start the development server:

npm start
App will run at:

http://localhost:3000/