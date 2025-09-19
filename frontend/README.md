# Quick Diagnostics  
AI-powered diagnostics booking platform with secure payments and an integrated RAG-based assistant.  

---

## Overview  
Quick Diagnostics is a full-stack web app for booking medical diagnostic tests.  
Users can search available tests, add patients, select labs and appointment slots, manage addresses, and complete payments.  
An AI assistant is included to answer test-related questions using Retrieval-Augmented Generation (LangChain + Weaviate + Gemini).  

---

## Features  

- **AI Assistant**: Contextual Q&A over test catalog — **Stack: LangChain pipelines + Weaviate (vector DB) + Gemini (chat + embeddings)**  
- **Authentication**: JWT sessions, OTP verification, email reset (Node.js + MongoDB + Nodemailer)  
- **Bookings**: Guided flow (patient → lab → slot → address → review → pay) — React Router + Recoil + Express + MongoDB  
- **Payments**: Secure Razorpay integration with server-side validation (Express + Razorpay SDK)  


---

## Tech Stack  
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Recoil  
- **Backend**: Node.js, Express 5, MongoDB (Mongoose), JWT, Multer, Nodemailer, Cloudinary  
- **AI**: LangChain, Weaviate, Gemini (text-embedding-004 + chat models)  
- **Payments**: Razorpay  