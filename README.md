# 🩺 Quick Diagnostics
**AI-Powered Medical Diagnostics Platform | Full-Stack + RAG Implementation**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://quickdiagnostics.vercel.app/) [![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-blue)](#tech-stack)

> **Built a comprehensive healthcare platform with AI-powered diagnostic recommendations using Retrieval-Augmented Generation (RAG)**

---

## 🚀 **Why This Project Stands Out**

**Problem Solved**: Medical diagnostic booking is fragmented across multiple platforms with no intelligent assistance.

**My Solution**: Built an end-to-end platform where users can:
- Book diagnostic tests through an intuitive multi-step flow
- Get instant answers about tests through an **AI chatbot powered by RAG**
- Complete payment flow with Razorpay integration (test mode)

**Technical Achievement**: Demonstrates full-stack development skills with modern AI integration.

---

## 🤖 **AI Features**

### **Intelligent RAG-Based Assistant**
```
User: "What are the prices for blood tests and how long do reports take?"
AI: "Here are our popular blood tests with pricing and report times:

• Complete Blood Count (CBC) - ₹350, Report: 6 hours
• Lipid Profile - ₹450, Report: 12 hours  
• Thyroid Function Test (TSH, T3, T4) - ₹650, Report: 24 hours
• Liver Function Test - ₹550, Report: 8 hours
• HbA1c (Diabetes) - ₹400, Report: 4 hours

All tests include free home sample collection. Book now for 20% discount!"
```

**Technical Implementation**:
- **Vector Database**: Pinecone
- **Embeddings**: Google's text-embedding-004 
- **LLM**: Gemini 1.5 Flash for contextual responses
- **RAG Pipeline**: LangChain for document retrieval and response generation

---

## 🏗️ **Architecture & Technical Highlights**

### **Frontend Architecture**
- **State Management**: Recoil for global state Management
- **Routing**: React Router with protected routes and navigation guards
- **UI/UX**: Custom Tailwind components with responsive design

### **Backend Design**
- **Authentication**: JWT with Access Token and refresh token
- **File Handling**: Cloudinary integration for document uploads
- **Email System**: Automated OTP with nodemailer

### **Payment Integration**
- **Payment Gateway**: Razorpay SDK integration (test environment)
- **Order Management**: Complete booking flow 
- **Validation**: Server-side payment verification and order tracking

---

## 📊 **Development Achievements**

- **📱 Responsive**: Works seamlessly on mobile, tablet, desktop
- **🔒 Security**: Implements JWT, CORS, input sanitization
- **💳 Payment Flow**: Complete Razorpay integration (test mode)
- **🤖 AI Integration**: Functional RAG system with contextual responses
- **📈 Scalable**: MongoDB Atlas, cloud vector database architecture

---

## 🛠️ **Tech Stack**

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Recoil |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose |
| **Gen Ai** | LangChain, Pinecone, Google Gemini |
| **Authentication** | JWT, Nodemailer, OTP verification |
| **Payments** | Razorpay SDK (test mode) |
| **Storage** | Cloudinary, MongoDB Atlas |
| **Deployment** | Render (Backend), Vercel (Frontend) |

---

## 🚦 **Quick Start**

```bash
# Clone and setup
git clone https://github.com/asrarali21/Diagnostics.git
cd Diagnostics

# Backend setup
cd backend && npm install
cp .env.example .env  # Add your API keys
npm run dev

# Frontend setup (new terminal)
cd frontend && npm install
npm run dev

# AI Setup - Populate vector database
cd backend && node src/utils/ingest.js
```

**Live Demo**: [quickdiagnostics](https://quickdiagnostics.vercel.app/) | **Payment**: Test mode with Razorpay test cards

---

## 💡 **What I Learned & Technical Skills Demonstrated**

### **Technical Growth**
- **RAG Implementation**: Built AI system with vector embeddings and semantic search
- **Full-Stack Integration**: Seamless frontend-backend communication
- **Payment Systems**: Integrated Razorpay with proper validation flow
- **Vector Databases**: Implemented Pinecone

### **Development Skills**
- **Modern React**: Hooks, state management, routing, responsive design
- **Backend Architecture**: RESTful APIs, authentication, file handling
- **Database Design**: MongoDB schemas, relationships
- **AI Integration**: LangChain pipelines, embedding generation

---


## 📞 **Let's Connect**

Passionate about building modern web applications with AI integration. **Open to full-stack and AI engineering opportunities**.

📧 **Email**: mohdasrar3825@gmail.com  

---

*"This project showcases my ability to integrate cutting-edge AI technologies with full-stack development to create meaningful user experiences."*
