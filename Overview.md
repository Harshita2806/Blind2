# AccessLearn 🎧📚
### Accessibility-First Audiobook Learning Platform for Visually Impaired Students

AccessLearn is a full-stack web application that enables teachers to upload educational PDFs, automatically convert them into audio lessons with chapter detection, generate quizzes from the content, and track student progress — all through an accessible, screen-reader-friendly interface.

---

## 🎯 Problem Statement

Visually impaired students lack access to digital educational content in a consumable audio format. Teachers have no easy way to convert their textbooks/notes into accessible audio lessons or track how students engage with the material.

**AccessLearn solves this by:**
- Converting any PDF textbook into narrated audio, chapter by chapter
- Providing a clean audio player interface designed for accessibility
- Auto-generating quizzes from the material content
- Giving teachers analytics on student engagement

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│   LandingPage → AuthPage → StudentPage / TeacherPage    │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP / REST API (/api)
                         │ Vite Proxy → localhost:5000
┌────────────────────────▼────────────────────────────────┐
│                  BACKEND (Node + Express)                 │
│  Auth │ Materials │ Quizzes │ Progress │ Analytics        │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
      MongoDB         Local Disk      TTS Engine
   (Mongoose ORM)   (uploads/)    (Edge TTS / SAPI)
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework, component-based architecture |
| **Vite** | 7 | Build tool & development server |
| **React Router DOM** | 7 | Client-side routing (SPA navigation) |
| **Framer Motion** | 12 | Smooth animations & page transitions |
| **Lucide React** | 0.575 | Icon library |
| **TailwindCSS** | 4 | Utility-first CSS styling |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | LTS | JavaScript runtime |
| **Express** | 5 | Web framework / REST API |
| **MongoDB** | Cloud/Local | NoSQL database |
| **Mongoose** | 9 | MongoDB ODM (schema & queries) |
| **JWT (jsonwebtoken)** | 9 | Authentication tokens |
| **bcryptjs** | 3 | Password hashing |
| **Multer** | 2 | File upload handling (PDFs) |
| **pdf-parse** | 1.1.1 | Extract text from PDF files |
| **gTTS** | 2.5.4 | Free Google TTS via Python (internet) |
| **pyttsx3** | 2.99 | Offline Python TTS via Windows SAPI |
| **dotenv** | 17 | Environment variable management |
| **cors** | 2.8 | Cross-Origin Resource Sharing |
| **nodemon** | 3 | Auto-restart server during dev |

---

## 📁 Project Structure

```
Blind2/
├── backend/                    ← Node.js API Server
│   ├── server.js               ← Entry point
│   ├── .env                    ← Environment variables
│   ├── config/
│   │   ├── db.js               ← MongoDB connection
│   │   └── cloudinary.js       ← File upload config (local/cloud)
│   ├── models/
│   │   ├── User.js             ← User schema (student/teacher)
│   │   ├── Material.js         ← PDF/Audio material schema
│   │   ├── Quiz.js             ← Quiz & questions schema
│   │   ├── Progress.js         ← Student progress schema
│   │   ├── Attempt.js          ← Quiz attempt schema
│   │   └── Announcement.js     ← Announcements schema
│   ├── controllers/
│   │   ├── authController.js   ← Register, Login, Profile
│   │   └── materialController.js ← Upload, Audio Gen, Delete
│   ├── routes/
│   │   ├── auth.js             ← /api/auth/*
│   │   ├── materials.js        ← /api/materials/*
│   │   ├── quizzes.js          ← /api/quizzes/*
│   │   ├── progress.js         ← /api/progress/*
│   │   ├── analytics.js        ← /api/analytics/*
│   │   └── announcements.js    ← /api/announcements/*
│   ├── middleware/
│   │   ├── auth.js             ← JWT token verification
│   │   └── roles.js            ← Teacher-only route guard
│   ├── services/
│   │   └── ttsService.js       ← PDF extraction + audio generation
│   └── uploads/                ← Stored PDFs and audio files
│       ├── pdfs/
│       └── audio/
│
└── src/                        ← React Frontend
    ├── main.jsx                ← App entry point
    ├── App.jsx                 ← Routes definition
    ├── context/
    │   └── AuthContext.jsx     ← Global auth state (user, token)
    ├── services/
    │   └── api.js              ← All API call functions
    └── pages/
        ├── LandingPage.jsx     ← Home / marketing page
        ├── AuthPage.jsx        ← Login & Register
        ├── TeacherPage.jsx     ← Teacher dashboard
        ├── StudentPage.jsx     ← Student learning portal
        └── QuizPage.jsx        ← Quiz interface
```

---

## ✅ Features Implemented

### 🔐 Authentication System
- **Register** with name, email, password, and role (Student / Teacher)
- **Login** with email & password
- Passwords are **hashed with bcrypt** (salt rounds: 12) before storing in DB
- On login, a **JWT token** is issued and stored in `localStorage`
- All protected routes check the JWT via `Authorization: Bearer <token>` header
- **Role-based access control** — teachers can upload; students can only read

### 👩‍🏫 Teacher Features
1. **Upload PDF** — drag-and-drop PDF upload with title, subject, grade level
2. **Auto Chapter Detection** — on upload, the PDF is parsed and chapters are auto-detected using heading patterns (`Chapter 1`, `Unit 2`, `Part I`, etc.)
3. **Generate Audio** — converts PDF text to MP3 audio for each chapter using TTS
4. **Generate Quiz** — creates multiple-choice questions from chapter content automatically
5. **Publish Material** — makes material visible to students
6. **Delete Material** — permanently removes PDF, audio files, and database record
7. **Analytics Dashboard** — view student engagement: materials accessed, quiz scores, completion %

### 👨‍🎓 Student Features
1. **Browse Materials** — view all published materials by subject/grade
2. **Audio Player** — listen to full book or navigate by chapter
3. **Playback Speed Control** — adjust speed (0.5x to 3x)
4. **Bookmarks** — bookmark positions in audio
5. **Take Quizzes** — attempt auto-generated MCQ quizzes
6. **Progress Tracking** — completion percentage tracked per material
7. **Quiz Results** — see score and results after each attempt

---

## 🔄 How Key Features Work (Implementation Details)

### 1. PDF to Audio Pipeline

```
Teacher uploads PDF
        ↓
Multer saves PDF to /uploads/pdfs/
        ↓
pdf-parse extracts raw text from PDF
        ↓
Chapter detection algorithm scans for headings:
  - "Chapter 1", "Unit 2", "Lesson 3", "Part I/II"
  - ALL-CAPS titles, numbered sections
  - Fallback: split into 3000-char chunks
        ↓
For each chapter: generateAudioForText() is called
        ↓
TTS Waterfall (tries in order):
  1. Google Cloud TTS      → best quality (needs paid API key)
  2. gTTS via Python       → free Google TTS (needs internet, no key)
  3. pyttsx3 via Python    → fully offline Windows SAPI wrapper
  4. Silent WAV placeholder → last resort, app never crashes
        ↓
Audio saved as .mp3 in /uploads/audio/
        ↓
MongoDB updated with audioUrl per chapter
```

### 2. Authentication Flow

```
User submits login form
        ↓
POST /api/auth/login
        ↓
Backend finds user by email
bcrypt.compare(password, hashedPassword)
        ↓
If match → jwt.sign({ id: user._id }, JWT_SECRET)
        ↓
Token returned to frontend
Frontend stores in localStorage
        ↓
Every future request:
Authorization: Bearer <token>
        ↓
auth.js middleware → jwt.verify(token)
→ attaches req.user to request
```

### 3. Quiz Generation

```
Teacher clicks "Generate Quiz"
        ↓
Material's chapters with transcripts are read
        ↓
For each chapter (up to 10):
  - Split transcript into sentences
  - Pick sentences with 6+ words
  - Select a "answer word" at 60% position
  - Create blank: "The ______ was important"
  - Generate 3 distractor words from same text
  - Shuffle options, record correct index
        ↓
Quiz saved to MongoDB with all questions
isPublished: true (immediately visible to students)
```

### 4. Progress Tracking

```
Student opens/listens to material
        ↓
POST /api/progress with { materialId, completionPercentage }
        ↓
Progress document upserted in MongoDB
        ↓
Analytics endpoint aggregates:
  - Materials accessed per student
  - Average completion %
  - Quiz scores
  - Total listening minutes
        ↓
Teacher sees data in Analytics tab
```

---

## 🗄️ Database Models

### User
```
name, email, password (hashed), role (student/teacher),
gradeLevel, subject, preferredSpeed, lastLogin, isActive
```

### Material
```
title, subject, gradeLevel, chapter, description,
pdfUrl, audioUrl, transcript, status (draft/processing/published),
chapters: [{ title, audioUrl, transcript, startPage }],
totalViews, totalListens, teacher (ref: User)
```

### Quiz
```
title, description, material (ref), subject, gradeLevel,
questions: [{ questionText, options[], correctAnswer, explanation, points }],
timeLimit, passingScore, teacher (ref), isPublished
```

### Progress
```
student (ref: User), material (ref: Material),
completionPercentage, isCompleted, lastPosition,
bookmarks: [{ position, label, timestamp }],
listenedMinutes
```

### Attempt
```
student (ref), quiz (ref), answers[], score,
totalPoints, passed, timeTaken, completedAt
```

---

## 🌐 REST API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Create new account | No |
| POST | `/login` | Login, get JWT | No |
| GET | `/me` | Get logged-in user | Yes |
| PUT | `/profile` | Update profile | Yes |

### Materials Routes (`/api/materials`)
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/` | Get all materials | Student/Teacher |
| GET | `/:id` | Get single material | Student/Teacher |
| POST | `/` | Upload new PDF | Teacher |
| DELETE | `/:id` | Delete material | Teacher |
| POST | `/:id/publish` | Publish material | Teacher |
| POST | `/:id/generate-audio` | Generate audio | Teacher |
| POST | `/:id/generate-quiz` | Generate quiz | Teacher |
| GET | `/:id/stream` | Stream audio file | Any |

### Quizzes Routes (`/api/quizzes`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all quizzes |
| POST | `/:id/attempt` | Submit quiz attempt |
| GET | `/:id/results` | Get attempt results |

### Other Routes
- `GET /api/progress/summary` — Student's overall progress
- `GET /api/analytics/overview` — Teacher's quick stats
- `GET /api/analytics/students` — Per-student breakdown
- `GET /api/health` — Server health check

---

## ⚙️ How to Run the Project

### Prerequisites
- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas)

### Step 1: Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/accesslearn
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
node server.js
```
Backend runs on → `http://localhost:5000`

### Step 2: Setup Frontend
```bash
cd ..          # go back to root
npm install
npm run dev
```
Frontend runs on → `http://localhost:5173` (or 5174 if port busy)

### Step 3: Test
- Open `http://localhost:5174`
- Register as **Teacher** → upload PDF → generate audio → publish
- Register as **Student** → browse materials → listen → take quiz

---

## 🔑 Environment Variables Explained

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | Yes | Port number for backend server |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing auth tokens |
| `JWT_EXPIRE` | Yes | How long tokens stay valid (e.g. `7d`) |
| `NODE_ENV` | Yes | `development` or `production` |
| `CLOUDINARY_*` | No | Cloud file storage (uses local disk if blank) |
| `GOOGLE_TTS_API_KEY` | No | Google TTS (falls back to Edge TTS if blank) |

---

## 🔒 Security Implementations

1. **Password Hashing** — bcrypt with salt rounds of 12 (industry standard)
2. **JWT Authentication** — stateless tokens, expire in 7 days
3. **Role-Based Authorization** — `requireTeacher` middleware blocks students from teacher routes
4. **File Type Validation** — Multer only accepts PDF / audio MIME types
5. **File Size Limits** — PDF max 50MB, Audio max 100MB
6. **CORS** — only specific frontend origins allowed

---

## 💡 Key Design Decisions

| Decision | Reason |
|---|---|
| **MongoDB over SQL** | Flexible schema — chapters array nested in material is easier in NoSQL |
| **JWT over Sessions** | Stateless, scalable, no server-side session storage needed |
| **Edge TTS as primary** | Free, no API key, good quality Indian English voice |
| **PDF-parse library** | Extracts raw text from PDFs without any external API |
| **Local disk storage** | Simpler for development; Cloudinary can be added for production |
| **React SPA** | Single-page app with client-side routing for smooth UX |

---

## 🧪 Possible Viva Questions & Answers

**Q: What is JWT and how does it work here?**
> JWT (JSON Web Token) is a digitally signed token. When a user logs in, the server creates a token containing the user's ID, signs it with a secret key, and sends it to the frontend. For every API call, the frontend sends this token in the `Authorization` header. The backend verifies the signature without hitting the database.

**Q: How is the PDF converted to audio?**
> We use `pdf-parse` to extract raw text from the PDF. Then we detect chapter headings using regex patterns. For each chapter, we use a **TTS waterfall**: first tries `gTTS` (free Google TTS via Python — calls Google's servers, no API key needed, returns an MP3). If there's no internet, it falls back to `pyttsx3` (a Python library that wraps Windows SAPI offline). Node.js calls both via `child_process.execFile('python', ['-c', script])`. The resulting audio is saved to `uploads/audio/` as an MP3.

**Q: How are quizzes generated without AI?**
> We use an algorithmic approach — we take the chapter transcript, split it into sentences, pick a meaningful content word as the "answer", blank it out to form the question, and use other words from the same text as distractors (wrong options). This is a fill-in-the-blank style MCQ.

**Q: What is the role of Mongoose?**
> Mongoose is an ODM (Object Document Mapper) for MongoDB. It lets us define schemas (structure/validation rules) for our data models like User, Material, Quiz etc., and provides simple methods like `find()`, `create()`, `findByIdAndUpdate()` to interact with the database.

**Q: How does the teacher-student role separation work?**
> When registering, users choose a role (`student` or `teacher`). This is stored in MongoDB. JWT tokens include the user ID. The `protect` middleware verifies the JWT on every request. The `requireTeacher` middleware additionally checks `req.user.role === 'teacher'` and returns 403 if a student tries to access teacher endpoints.

**Q: What happens when a PDF is deleted?**
> The `deleteMaterial` controller: (1) checks the requesting user is the owner, (2) reads the PDF and audio file paths from the database record, (3) deletes those actual files from the `uploads/` directory using `fs.unlinkSync()`, (4) deletes the MongoDB document. This ensures no orphaned files remain on disk.

---

## 🎓 Project Summary

AccessLearn is an **accessibility-focused EdTech platform** built with the **MERN stack** (MongoDB, Express, React, Node.js). It bridges the gap for visually impaired students by automating the conversion of educational PDFs into structured audio lessons, complete with chapter navigation, quizzes, and progress tracking — all through a clean, high-contrast, keyboard-navigable interface.

---










## 🌩️ Testing API with Thunder Client (VS Code)

> **Base URL:** `http://localhost:5000`  
> **Prerequisite:** Backend running (`node server.js` in `backend/`)

---

### 🔐 Authentication Endpoints

#### 1. Register as Teacher
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/auth/register` |
| **Body** | JSON |

```json
{
  "name": "Harshita Sharma",
  "email": "teacher@test.com",
  "password": "password123",
  "role": "teacher"
}
```
**Response:** `201 Created` — returns `token` + user object

---

#### 2. Register as Student
Same as above but `"role": "student"` and a different email.

---

#### 3. Login
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/auth/login` |
| **Body** | JSON |

```json
{
  "email": "teacher@test.com",
  "password": "password123"
}
```
**Response:** `200 OK` — **copy the `token` from here for all requests below**

---

#### 4. Get My Profile *(Protected Route)*
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/auth/me` |
| **Headers** | `Authorization: Bearer <paste-token-here>` |

---

### 📚 Materials Endpoints

#### 5. Get All Materials
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/materials` |
| **Headers** | `Authorization: Bearer <token>` |

---

#### 6. Upload a PDF *(Teacher only)*
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/materials` |
| **Body type** | **Form** (not JSON) |
| **Headers** | `Authorization: Bearer <teacher-token>` |

| Key | Type | Value |
|---|---|---|
| `title` | Text | `Science Chapter 1` |
| `subject` | Text | `Science` |
| `gradeLevel` | Text | `10` |
| `pdf` | **File** | *(select any PDF)* |

---

### 🧠 Quiz Endpoints

#### 7. Get All Quizzes
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/quizzes` |
| **Headers** | `Authorization: Bearer <token>` |

---

#### 8. Submit a Quiz Attempt *(Student)*
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/quizzes/<quiz-id>/attempt` |
| **Headers** | `Authorization: Bearer <student-token>` |
| **Body** | JSON |

```json
{
  "answers": [0, 1, 2, 0],
  "timeTaken": 120
}
```

---

### 📊 Progress & Analytics

#### 9. Student Progress Summary
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/progress/summary` |
| **Headers** | `Authorization: Bearer <student-token>` |

#### 10. Teacher Analytics Overview
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/analytics/overview` |
| **Headers** | `Authorization: Bearer <teacher-token>` |

#### 11. Health Check *(No auth needed)*
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/health` |

---

### 🎯 Key Tests to Prove Auth is Working

| Test | Expected | What it Proves |
|---|---|---|
| `GET /me` **with** valid token | `200 OK` | JWT middleware works |
| `GET /me` **without** token | `401 Unauthorized` | Protected routes enforced |
| `POST /materials` with **student** token | `403 Forbidden` | Role-based auth works |
| `POST /materials` with **teacher** token | `200 OK` | Teacher-only routes work |
| Login with **wrong password** | `401 Unauthorized` | bcrypt verification works |

---

## 🖥️ Understanding the Terminal Output (PDF Upload + Audio Generation)

When a teacher uploads a PDF and clicks **"Generate Audio"**, the backend prints a series of log messages.
Here is the **exact terminal output explained line by line**, mapped to the actual code that produced it:

```
📚 Chapter detection: 5 raw → 4 after dedup/filter
📚 Auto-detected 4 chapters for material: sample_tts_book
```

> **What happened:**
> - `pdf-parse` extracted the raw text from the PDF.
> - The `detectChapters()` function in `ttsService.js` scanned every line using **regex patterns** looking for headings like `"Chapter 1"`, `"Unit 2"`, `"Part I"`, etc.
> - It found **5 raw matches** (including one that was a duplicate from the Table of Contents or a page header).
> - **Deduplication**: It normalized each title (stripped numbers/spaces) and used a `Set` to skip titles it had already seen.
> - Also **filtered out** any chapter with fewer than 200 characters of body text (these are just ToC entries, not real chapters).
> - Final result: **4 valid chapters** kept.
>
> **Code location:** `backend/services/ttsService.js` → `detectChapters()` function, line ~63–149

---

```
📄 Extracting PDF text from: /uploads/pdfs/1773003706944-308995025.pdf
✅ Extracted 3654 chars from PDF (5 pages)
```

> **What happened:**
> - The PDF was saved to disk by **Multer** (the file-upload middleware) during the original upload request.
> - Now, `extractTextFromPDF()` reads that file from disk using **Node.js's built-in `fs.readFileSync()`**.
> - It then passes the binary PDF buffer into `pdf-parse`, which extracts all the readable text.
> - Result: **3654 characters** of clean text extracted from **5 pages**.
>
> **Key point for viva:** `pdf-parse` only works on PDFs with selectable text. Scanned image PDFs will return empty text.
>
> **Code location:** `backend/services/ttsService.js` → `extractTextFromPDF()`, line ~36–60

---

```
📚 Chapter detection: 5 raw → 4 after dedup/filter
🔍 Detected 4 chapters/segments
```

> **What happened:** Chapter detection runs **again** (second time) now during audio generation (first run was at upload time). Same result: 4 chapters. The `console.log` on line 147 and 486 of `ttsService.js` prints this.

---

```
ℹ️  Google TTS skipped: Google TTS API key not configured
```

> **What happened:**
> - The code tries Google Cloud TTS **first** (best quality).
> - But our `.env` file does not have a `GOOGLE_TTS_API_KEY` set (or it's set to the placeholder value).
> - So the `googleTTS()` function immediately throws an error and is **skipped**.
> - This is intentional — it's **step 1 of the TTS Waterfall**.
>
> **Code location:** `ttsService.js` → `googleTTS()`, line ~172–184

---

```
⚠️  Edge TTS failed: Connect Error: {}
```

> **What happened:**
> - Step 2 of the waterfall: tries **Microsoft Edge TTS** (`msedge-tts` npm package).
> - This works by connecting to Microsoft's servers **over the internet via WebSocket**.
> - The connection failed — likely no internet access or Microsoft's endpoint was unreachable.
> - So Edge TTS is skipped, and the code moves to step 3.
>
> **Code location:** `ttsService.js` → `edgeTTS()`, line ~187–214

---

```
   🔈 SAPI chunk 1/2 (2500 chars)...
   🔈 SAPI chunk 2/2 (1186 chars)...
⚠️  Windows SAPI TTS failed: No valid WAV chunks to concatenate
```

> **What happened:**
> - Step 3: tries **Windows SAPI** (Windows built-in speech engine, offline).
> - The text (3686 chars) is split into chunks of **≤ 2500 characters** each (to avoid SAPI timeouts).
> - For each chunk, our code writes a **PowerShell script** that uses `System.Speech.Synthesis.SpeechSynthesizer` and runs it using Node.js's `child_process.spawn('powershell', ...)`.
> - SAPI tried to synthesize, but the output WAV files were either empty or too small (< 500 bytes).
> - When `concatWavFiles()` tried to merge them, there were no valid WAV data chunks — so it threw: **"No valid WAV chunks to concatenate"**.
> - This usually means SAPI ran but produced silence (e.g., voice engine not properly installed).
>
> **Code location:** `ttsService.js` → `windowsSAPITTS()` and `sapiChunk()`, line ~217–354

---

```
⚠️  Silent placeholder used – no TTS engine available
🔊 Main audio generated: material_69ade3bab5c421ac9315cb90_1773003713694.mp3
```

> **What happened:**
> - All 3 TTS engines failed. So the code runs **Step 4: the silent fallback**.
> - `silentFallback()` constructs a valid minimal WAV file header manually (44 bytes) with pure silence bytes — enough for the app to not crash when a student tries to play it.
> - The file is saved as a `.mp3` in `backend/uploads/audio/`.
> - The filename includes the **MongoDB material `_id`** and a **Unix timestamp** for uniqueness.
>
> **Code location:** `ttsService.js` → `silentFallback()`, line ~357–379

---

```
  📖 Chapter 1/4: Chapter 1: Introduction to Learning (874 chars)
  📖 Chapter 2/4: Chapter 2: Technology in Education (837 chars)
  📖 Chapter 3/4: Chapter 3: Problem Solving and Critical Thinking (792 chars)
  📖 Chapter 4/4: Chapter 4: The Future of Learning (750 chars)
```

> **What happened:**
> - After generating the main audio, the code generates **per-chapter audio** (one MP3 per chapter).
> - Chapters are processed in **batches of 3** using `Promise.all()` to run them in parallel but not overload the system.
> - Each chapter went through the same TTS waterfall: Google skipped → Edge failed → SAPI failed → silent placeholder saved.
> - Each chapter's audio URL and transcript are stored in MongoDB under the `chapters[]` array of the Material document.
>
> **Code location:** `ttsService.js` → `generateFromMaterial()`, line ~496–533

---

### 📊 TTS Waterfall Summary (What Was Tried)

```
generateAudioForText() called
         │
         ▼
  1. Google TTS ──── ❌ No API key → SKIPPED
         │
         ▼
  2. gTTS (Python) ─ ✅ Free Google TTS → WORKS (if internet)
         │
         ▼
  3. pyttsx3 ──────── ✅ Offline Python TTS → WORKS (no internet)
         │
         ▼
  4. Silent WAV ────── last resort (never reached now)
```

> 💡 **For viva:** This shows **fault-tolerant design** — the system never crashes even if all TTS engines fail. It gracefully degrades to a silent placeholder and the student can still see the material and take the quiz.

---

## 🟢 Role of Node.js and Express — Where and How We Used Them

### What is Node.js?

Node.js is a **JavaScript runtime** — it lets us run JavaScript code on the server (backend), outside of the browser. Before Node.js, JavaScript could only run inside a browser. Node.js uses the **V8 engine** (same as Chrome) to execute JS code on the machine.

**Where we used it in this project:**
| Task | How Node.js does it |
|---|---|
| Reading PDF files from disk | `fs.readFileSync()` — Node.js built-in file system module |
| Saving uploaded audio files | `fs.writeFileSync()` — writes MP3/WAV data to `uploads/audio/` |
| Calling Python for TTS | `child_process.execFile('python', ['-c', script])` — runs gTTS/pyttsx3 |
| Serving the Express server | Node.js is the runtime that runs `server.js` |
| Managing async operations | Node.js's event loop handles async/await without blocking |

---

### What is Express?

Express is a **web framework** built on top of Node.js. It makes it easy to:
- Define **API routes** (what URL maps to what logic)
- Handle **HTTP requests** (GET, POST, DELETE, etc.)
- Use **middleware** (functions that run before the route handler)

**Where we used Express in this project:**

#### 1. Main server setup — `backend/server.js`
```js
const express = require('express');
const app = express();
app.use(express.json());         // parses JSON request bodies
app.use(cors());                 // allows frontend to call backend
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));
```
> Express creates the HTTP server. Every API call from the frontend hits this server first.

#### 2. Route definitions — `backend/routes/materials.js`
```js
router.post('/:id/generate-audio', protect, requireTeacher, generateAudio);
```
> When a teacher clicks "Generate Audio", the frontend calls `POST /api/materials/:id/generate-audio`. Express matches this URL to the `generateAudio` controller function.

#### 3. Middleware chain — how a request flows
```
Frontend request: POST /api/materials/:id/generate-audio
        │
        ▼
  cors() middleware        → Allows cross-origin requests
        │
        ▼
  express.json()           → Parses the request body as JSON
        │
        ▼
  protect middleware       → Verifies JWT token
        │
        ▼
  requireTeacher           → Checks role === 'teacher'
        │
        ▼
  generateAudio()          → Controller: calls ttsService.generateFromMaterial()
        │
        ▼
  res.json({ success: true, audioUrl: '...' })  → Response sent back
```

#### 4. File uploads — Multer (Express middleware)
```js
const upload = multer({ dest: 'uploads/pdfs/' });
router.post('/', protect, requireTeacher, upload.single('pdf'), uploadMaterial);
```
> Multer is an Express middleware that intercepts `multipart/form-data` requests (the kind that carry files). It saves the PDF to disk and attaches the file info to `req.file`.

#### 5. Serving static files (audio streaming)
```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```
> Express serves the `uploads/` folder as static files — so the student's audio player can directly access `http://localhost:5000/uploads/audio/material_xxx.mp3`.

---

### Node.js vs Express — the key distinction

| | Node.js | Express |
|---|---|---|
| What it is | JavaScript runtime environment | Web framework built on Node.js |
| What it does | Runs JS on server, handles files, processes | Handles routing, middleware, HTTP |
| Analogy | The engine of a car | The steering wheel + controls |
| Without the other | Can build HTTP server manually but very complex | Cannot exist without Node.js |






Audio File	Engine Used
Full book audio	pyttsx3 (offline) ✅
Chapter 1 audio	gTTS ✅
Chapter 2 audio	gTTS ✅
Chapter 3 audio	gTTS ✅
Chapter 4 audio	gTTS ✅
Your audio pipeline is fully functional now. For your viva, you can say: "The system uses a fault-tolerant waterfall — if gTTS fails for longer text, pyttsx3 handles it offline. All chapter-level audios are generated reliably by gTTS." 🎯




