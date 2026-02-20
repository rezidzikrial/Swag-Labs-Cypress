# Cypress Automation Testing – Swag Labs

## 📌 Overview
This project is an **End-to-End Automation Testing** using **Cypress** for the Swag Labs web application.  
It covers **positive & negative test scenarios**, implemented using **Page Object Model (POM)**, **Custom Commands**, **Fixtures** etc.

This repository is intended as a **QA Engineer** to demonstrate automation testing best practices.

---

## 🧪 Test Scope
The automation tests cover:

### ✅ Authentication
- Login with valid credentials
- Login with invalid credentials
- Validation for empty username/password

### 🛒 Inventory & Cart
- Add product to cart
- Remove product from cart
- Validate cart badge counter

### 🧾 Checkout
- Validate checkout form elements
- Positive checkout form submission
- Negative checkout scenarios (empty fields)
- Cancel checkout and return to cart

---

## 🛠 Tech Stack
- **Cypress**
- **JavaScript**
- **Page Object Model (POM)**
- **Custom Commands**
- **Fixtures (JSON)**
- **Mocha & Chai Assertion**

---

## ▶️ How to Run the Project

### 1️⃣ Install dependencies
 - **bash**
 - **npm install**
 - **npx cypress open**
 - **npx cypress run**