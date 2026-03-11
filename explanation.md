# 🎓 AccessLearn — Complete Viva Explanation Guide
### Everything you need to explain, in the exact order to present it

---

## 1. 🧠 What is This Project? (Open with this)

**Say this in viva:**
> "AccessLearn is a full-stack web application built for visually impaired students. Teachers can upload educational PDF books, which are automatically converted into audio lessons chapter by chapter. Students can then listen to these lessons, take auto-generated quizzes, and track their progress. The entire system is designed with accessibility in mind — high contrast, keyboard navigation, and screen reader support."

---

## 2. 🏗️ Tech Stack — What We Used and Why

### Frontend
| Technology | What it does in this project | Why we chose it |
|---|---|---|
| **React 19** | Builds the UI as reusable components (LandingPage, AuthPage, TeacherPage, StudentPage, QuizPage) | Component-based, fast re-renders, industry standard |
| **Vite** | Bundles and serves the React app during development | Faster than Webpack, instant hot reload |
| **React Router DOM** | Handles page navigation without full page reload (SPA) | Smooth navigation between login, teacher, student pages |
| **Framer Motion** | Animations and page transitions | Makes the UI feel polished and modern |
| **Lucide React** | Icons used throughout the UI | Clean, consistent icon set |

### Backend
| Technology | What it does in this project | Why we chose it |
|---|---|---|
| **Node.js** | Runs the entire backend — file I/O, process execution, async operations | JS everywhere, non-blocking I/O for handling multiple requests |
| **Express 5** | Defines all REST API routes and middleware chain | Lightweight framework, easy routing and middleware |
| **MongoDB** | Stores users, materials, quizzes, progress, attempts | NoSQL — flexible schema, nested arrays (chapters[]) fit naturally |
| **Mongoose** | Defines schemas and queries for MongoDB | Makes MongoDB feel structured with validation and methods |
| **JWT** | Creates and verifies authentication tokens | Stateless, scalable, no server-side session storage needed |
| **bcryptjs** | Hashes passwords before storing | Industry standard — passwords never stored in plain text |
| **Multer** | Handles PDF file uploads from the teacher form | Express middleware for multipart/form-data |
| **pdf-parse** | Extracts text from uploaded PDF files | Simple library, no external API, works offline |
| **gTTS (Python)** | Converts chapter text to MP3 audio via Google's TTS | Free, no API key, high quality, internet-based |
| **pyttsx3 (Python)** | Offline fallback TTS using Windows SAPI | Works without internet, pure offline, reliable fallback |

---

## 3. 🏛️ Architecture — How Everything Connects

```
Browser (React + Vite)          → runs on port 5173
        ↕  HTTP REST API
Node.js + Express (server.js)   → runs on port 5000
        ↕               ↕              ↕
   MongoDB          Local Disk      Python TTS
  (Mongoose)      (uploads/)    (gTTS / pyttsx3)
```

**Say this in viva:**
> "The frontend is a React single-page application that talks to the backend via REST API calls. The backend is an Express server running on Node.js. When a teacher uploads a PDF, the backend saves it to disk using Multer, extracts text using pdf-parse, detects chapters using regex, and calls Python's gTTS or pyttsx3 to generate audio. All data — users, materials, quizzes, progress — is stored in MongoDB."

---

## 4. 📁 Project Structure — What Each File Does

```
Blind2/
├── backend/
│   ├── server.js                ← Express app setup, all routes registered here
│   ├── .env                     ← PORT, MONGO_URI, JWT_SECRET (sensitive config)
│   ├── config/
│   │   └── db.js                ← mongoose.connect() called here
│   ├── models/                  ← Mongoose schemas (database structure)
│   │   ├── User.js              ← name, email, password(hashed), role
│   │   ├── Material.js          ← title, pdfUrl, audioUrl, chapters[], status
│   │   ├── Quiz.js              ← questions[], options[], correctAnswer
│   │   ├── Progress.js          ← student-material link, completionPercentage
│   │   └── Attempt.js           ← quiz attempt, score, answers
│   ├── controllers/             ← Business logic for each feature
│   │   ├── authController.js    ← register, login, getProfile
│   │   ├── materialController.js← upload, generateAudio, generateQuiz, delete
│   │   ├── quizController.js    ← getQuizzes, submitAttempt, getResults
│   │   ├── progressController.js← updateProgress, getSummary
│   │   └── analyticsController.js← teacher dashboard stats
│   ├── middleware/
│   │   ├── auth.js              ← protect: verifies JWT on every request
│   │   └── roles.js             ← requireTeacher: blocks students from teacher routes
│   ├── routes/                  ← Maps URLs to controller functions
│   │   ├── auth.js              ← /api/auth/*
│   │   ├── materials.js         ← /api/materials/*
│   │   └── quizzes.js           ← /api/quizzes/*
│   └── services/
│       └── ttsService.js        ← PDF extraction + chapter detection + audio generation
│
└── src/                         ← React Frontend
    ├── App.jsx                  ← Route definitions (<Route> for each page)
    ├── context/AuthContext.jsx  ← Global state: logged-in user + token
    ├── services/api.js          ← All axios API call functions
    └── pages/
        ├── LandingPage.jsx      ← Marketing/home page
        ├── AuthPage.jsx         ← Login and Register forms
        ├── TeacherPage.jsx      ← Upload, manage, analytics dashboard
        ├── StudentPage.jsx      ← Audio player, chapters, bookmarks
        └── QuizPage.jsx         ← Quiz attempt interface
```

---

## 5. 🔐 Authentication — How It Works Step by Step

### Registration
1. Teacher/student fills the form → selects **role** (student or teacher)
2. Frontend calls `POST /api/auth/register` with name, email, password, role
3. Express route → `authController.register()`
4. `bcrypt.hash(password, 12)` → password is hashed, **never stored in plain text**
5. New `User` document saved to MongoDB
6. `jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })` → token created
7. Token returned to frontend → stored in `localStorage`

### Login
1. Frontend calls `POST /api/auth/login`
2. Controller finds user by email in MongoDB
3. `bcrypt.compare(enteredPassword, storedHash)` → returns true/false
4. If true → `jwt.sign(...)` → new token sent back
5. If false → `401 Unauthorized`

### Protected Request (every API call after login)
```
Request arrives at Express
        ↓
protect middleware (auth.js):
  - reads Authorization: Bearer <token> header
  - jwt.verify(token, JWT_SECRET)
  - if valid → attaches req.user = { id, role }
  - if invalid → 401 Unauthorized
        ↓
requireTeacher middleware (roles.js):
  - checks req.user.role === 'teacher'
  - if student → 403 Forbidden
  - if teacher → passes through
        ↓
Controller function runs
```

**Say this in viva:**
> "JWT is a JSON Web Token. When a user logs in, the server signs a token with a secret key containing the user's ID. For every subsequent request, the frontend sends this token in the Authorization header. The protect middleware verifies the signature without hitting the database — that's what makes it stateless and scalable."

---

## 6. 📄 PDF Upload + Chapter Detection — Full Flow

### Step 1: Upload
- Teacher submits form with PDF file + title + subject + gradeLevel
- Multer middleware intercepts the request (it's `multipart/form-data`)
- Saves PDF to `backend/uploads/pdfs/` with a timestamp-based filename
- `req.file` contains the saved file path

### Step 2: Text Extraction
```js
// In ttsService.js → extractTextFromPDF()
const pdfBuffer = fs.readFileSync(localPath);  // Node.js reads the file
const data = await pdfParse(pdfBuffer);         // pdf-parse extracts text
const fullText = data.text;                     // raw text string
```

### Step 3: Chapter Detection (detectChapters function)
The algorithm scans every line of the text using **regex patterns**:
```js
/^(chapter\s+(\d+|one|two...)[:\s–-]*(.*))/i   // Chapter 1, Chapter Two
/^(unit\s+(\d+|[ivxlc]+)[:\s–-]*(.*))/i         // Unit 2, Unit III
/^(lesson\s+...)/i                               // Lesson 3
/^(part\s+(I{1,3}|IV|V?I{0,3}|[12345])...)/i   // Part I, Part 2
/^(\d+[.\s]+[A-Z][A-Z\s,'']{3,50})$/            // 1. THE FUN THEY HAD
```
**Post-processing (deduplication & filtering):**
- Strips chapters with fewer than **200 chars** of body text (these are just Table of Contents entries)
- Normalizes title (remove numbers, spaces) → uses a JavaScript `Set` to detect duplicates
- Result: `5 raw → 4 after dedup/filter`

**Fallback:** If no chapter headings found → splits text into 3000-character chunks labeled Part 1, Part 2, etc.

---

## 7. 🎧 Audio Generation — TTS Waterfall

The system tries **4 TTS engines in order** — if one fails, it tries the next.

### Engine 1: Google Cloud TTS
- **Requires:** `GOOGLE_TTS_API_KEY` in `.env`
- **In our project:** Skipped — no API key configured
- **Log:** `ℹ️ Google TTS skipped: Google TTS API key not configured`

### Engine 2: gTTS (Python Google TTS) — PRIMARY
- **What:** Python library that calls Google's free TTS endpoint
- **How Node.js calls it:**
```js
// In ttsService.js → gttsTTS()
execFile('python', ['-c', `
from gtts import gTTS
tts = gTTS(text="""${text}""", lang='en', slow=False)
tts.save(r"${outputPath}")
`], { timeout: 60000 }, callback);
```
- **Requirement:** Python installed, `pip install gtts`, internet connection
- **Log:** `✅ gTTS (Python Google TTS) used`
- **Why it sometimes fails for main audio:** The full PDF text (~3600 chars) passed as an inline command-line argument can break. Individual chapters (~750–874 chars) work fine.

### Engine 3: pyttsx3 (Offline Python TTS) — FALLBACK
- **What:** Python library that wraps Windows SAPI (built-in speech engine)
- **How Node.js calls it:**
```js
// In ttsService.js → pyttsx3TTS()
execFile('python', ['-c', `
import pyttsx3
engine = pyttsx3.init()
engine.setProperty('rate', 150)
engine.setProperty('volume', 1.0)
engine.save_to_file("""${text}""", r"${wavPath}")
engine.runAndWait()
`], { timeout: 120000 }, callback);
```
- **Requirement:** Python + `pip install pyttsx3`, no internet needed
- **Log:** `✅ pyttsx3 (offline Python TTS) used`
- **Output:** WAV file → renamed to .mp3 path

### Engine 4: Silent WAV Placeholder — LAST RESORT
- **What:** Node.js manually constructs a valid 44-byte WAV header with silence
- **When:** Only if all 3 above fail
- **Purpose:** App never crashes — students can still see material and take quiz

### Final Waterfall Result from Terminal:
```
Main audio (full book):   → gTTS failed → pyttsx3 ✅
Chapter 1 audio:          → gTTS ✅
Chapter 2 audio:          → gTTS ✅
Chapter 3 audio:          → gTTS ✅
Chapter 4 audio:          → gTTS ✅
```
All 5 audio files generated. Students hear actual speech.

---

## 8. 🧠 Quiz Generation — No AI, Pure Algorithm

**Say this in viva:**
> "We generate quizzes algorithmically without any AI or external API. We take each chapter's transcript, split it into sentences, pick sentences with 6 or more words, select a word at the 60% position in the sentence as the answer, blank it out to form a fill-in-the-blank question, and pick 3 other content words from the same text as wrong options."

**Step by step:**
```
Chapter transcript
        ↓
Split into sentences
        ↓
Filter: keep sentences with 6+ words
        ↓
For each sentence:
  - Pick word at ~60% position = ANSWER
  - Replace with "_____" = QUESTION TEXT
  - Pick 3 other words from text = DISTRACTORS
  - Shuffle all 4 options
  - Store correct answer index
        ↓
Quiz saved to MongoDB
isPublished: true (immediately visible to students)
```

---

## 9. 📊 Progress Tracking and Analytics

### Student side:
- When student opens/listens to a material → frontend calls:
  `POST /api/progress` with `{ materialId, completionPercentage }`
- MongoDB upserts a `Progress` document (creates if not exists, updates if exists)
- Bookmarks stored in `progress.bookmarks[]`

### Teacher side:
- `GET /api/analytics/students` → aggregates `Progress` and `Attempt` documents
- Returns: materials accessed, average completion %, quiz scores, listening minutes
- Displayed in teacher's **Analytics** tab

---

## 10. 🟢 Node.js — Where and How We Used It

Node.js is the **runtime** — it's what makes our backend code execute.

| Where | How |
|---|---|
| Reading PDF files | `fs.readFileSync(pdfPath)` — built-in `fs` module |
| Writing audio files | `fs.writeFileSync(outputPath, buffer)` |
| Calling Python for TTS | `child_process.execFile('python', ['-c', script])` |
| Async operations | `async/await` — Node.js event loop handles non-blocking I/O |
| Running the server | `node server.js` — Node.js executes the file |
| Path manipulation | `path.join(__dirname, '..', 'uploads', 'audio')` |

---

## 11. 🔵 Express — Where and How We Used It

Express is the **web framework** — it handles routing, middleware, HTTP.

### How a request travels through Express:
```
POST /api/materials/:id/generate-audio (from teacher clicking button)
        ↓
cors() middleware          → allows port 5173 to call port 5000
        ↓
express.json()             → parses request body as JSON
        ↓
protect (auth.js)          → verifies JWT, sets req.user
        ↓
requireTeacher (roles.js)  → checks req.user.role === 'teacher'
        ↓
generateAudio controller   → calls ttsService.generateFromMaterial()
        ↓
res.json({ success: true, audioUrl: '...' })  → response back to frontend
```

### Key Express usages:
```js
// server.js
app.use(express.json());                          // JSON body parser middleware
app.use(cors());                                  // CORS middleware
app.use('/api/auth', authRoutes);                 // route mounting
app.use('/uploads', express.static('uploads'));    // serves audio/PDF files
app.listen(5000);                                  // starts server

// routes/materials.js
router.post('/:id/generate-audio', protect, requireTeacher, generateAudio);
// ↑ URL pattern   ↑ middleware 1  ↑ middleware 2  ↑ controller
```

---

## 12. 🗄️ MongoDB + Mongoose — How Data is Stored

### Why MongoDB (not SQL)?
- The `Material` has a `chapters` array nested inside it — in SQL this needs a separate table with joins. In MongoDB it's one document.
- Schema can evolve without migrations.

### How Mongoose works:
```js
// models/Material.js
const materialSchema = new mongoose.Schema({
  title: String,
  pdfUrl: String,
  audioUrl: String,
  chapters: [{              // ← nested array, one document
    title: String,
    audioUrl: String,
    transcript: String
  }],
  status: { type: String, enum: ['draft', 'processing', 'published'] },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
```

### Common Mongoose operations used:
```js
Material.find({ status: 'published' })       // get all published materials
Material.findById(id)                        // get one by ID
Material.findByIdAndUpdate(id, { status })   // update a field
new Material(data).save()                    // create new document
Material.findByIdAndDelete(id)               // delete
```

---

## 13. 🌐 REST API — All Endpoints

| Method | URL | Role | What it does |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login, get JWT |
| GET | `/api/auth/me` | Any | Get logged-in user profile |
| GET | `/api/materials` | Any | Get all published materials |
| POST | `/api/materials` | Teacher | Upload a PDF |
| POST | `/api/materials/:id/generate-audio` | Teacher | Generate audio for material |
| POST | `/api/materials/:id/generate-quiz` | Teacher | Generate quiz from material |
| POST | `/api/materials/:id/publish` | Teacher | Make material visible to students |
| DELETE | `/api/materials/:id` | Teacher | Delete material + files |
| GET | `/api/quizzes` | Any | Get all quizzes |
| POST | `/api/quizzes/:id/attempt` | Student | Submit quiz answers |
| GET | `/api/progress/summary` | Student | Get own progress |
| GET | `/api/analytics/overview` | Teacher | Quick stats |
| GET | `/api/analytics/students` | Teacher | Per-student breakdown |

---

## 14. 🔒 Security Features

| Feature | How implemented |
|---|---|
| Password hashing | `bcrypt.hash(password, 12)` — 12 salt rounds, irreversible |
| JWT auth | `jwt.sign({ id }, secret, { expiresIn: '7d' })` |
| Role-based access | `requireTeacher` middleware checks `req.user.role` |
| File type validation | Multer `fileFilter` only allows PDF MIME type |
| File size limit | PDFs max 50MB, audio max 100MB |
| CORS protection | Only frontend origin (localhost:5173) allowed |

---

## 15. 💬 Ready-to-Speak Viva Answers

**Q: What is JWT? How does it work here?**
> JWT is a JSON Web Token — a digitally signed string with 3 parts: header, payload (user ID), and signature. When a user logs in, we call `jwt.sign({ id: user._id }, JWT_SECRET)` and send the token to the frontend. The frontend stores it in localStorage. For every API call, it sends `Authorization: Bearer <token>`. Our `protect` middleware calls `jwt.verify(token, JWT_SECRET)` — this validates the signature without touching the database. That's what makes it stateless.

**Q: How is the PDF converted to audio?**
> We use `pdf-parse` (Node.js library) to extract raw text from the uploaded PDF. Then our `detectChapters()` function scans line by line using regex patterns to find headings like "Chapter 1" or "Unit 2". For each chapter, we call `gTTS` — a Python library that sends the text to Google's free TTS endpoint and gets back an MP3. Node.js calls Python using `child_process.execFile`. If gTTS fails (no internet), `pyttsx3` handles it offline using Windows SAPI.

**Q: How are quizzes generated without AI?**
> We use a pure algorithmic approach in `quizController.js`. We split the chapter transcript into sentences, filter for sentences with 6+ words, pick a word at the 60% position as the answer, blank it out to form the question, and use other words from the same text as wrong options (distractors). No AI, no external API — just string manipulation.

**Q: What is Mongoose and why use it?**
> Mongoose is an ODM — Object Document Mapper — for MongoDB. It lets us define schemas with types and validation rules, like `{ email: { type: String, required: true, unique: true } }`. Without it, MongoDB accepts any data with no structure. Mongoose gives us structure and query methods like `find()`, `findByIdAndUpdate()`, `populate()` for joining documents.

**Q: What is the difference between Node.js and Express?**
> Node.js is the runtime — it's what executes JavaScript outside the browser, handles files, network, processes. Express is a web framework built on top of Node.js that adds routing, middleware, and HTTP handling. Node.js is the engine, Express is the steering wheel. You could build an HTTP server in plain Node.js, but Express makes it much simpler.

**Q: What is Multer?**
> Multer is an Express middleware for handling `multipart/form-data` requests — which is the format browsers use when uploading files. Without Multer, `req.body` would be empty for file uploads. Multer reads the file stream, saves it to disk, and adds `req.file` with the path and metadata.

**Q: How does role-based auth work?**
> When a user registers, their role (student or teacher) is saved in MongoDB. JWT tokens contain the user's database ID. When a request comes in, the `protect` middleware fetches the user by ID and attaches `req.user` including their role. The `requireTeacher` middleware then checks `if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Forbidden' })`. This ensures students can't access teacher-only endpoints.

**Q: Why MongoDB over SQL?**
> Our Material document has a nested `chapters` array — each chapter has its own title, audioUrl, and transcript. In SQL this would need a separate `chapters` table with foreign key joins. In MongoDB, it's all in one document — faster reads, no joins. Also, our schema evolved a lot during development, and MongoDB's flexible schema meant we didn't need to write migration scripts every time.

**Q: What is bcrypt and why use it?**
> bcrypt is a password hashing algorithm. It takes a plain password and produces a fixed-length irreversible hash using salt (random data added before hashing). We use 12 salt rounds. When a user logs in, we use `bcrypt.compare(entered, stored)` — this hashes the entered password with the stored salt and compares. Even if someone gets the database, they can't recover the original password.

**Q: What is CORS?**
> CORS is Cross-Origin Resource Sharing. Browsers block `fetch`/`axios` calls from one origin (localhost:5173) to a different origin (localhost:5000) by default. The Express `cors()` middleware adds the header `Access-Control-Allow-Origin: http://localhost:5173` to every response, telling the browser it's safe to allow the request.

**Q: What happens when a material is deleted?**
> The `deleteMaterial` controller: (1) checks the requesting user is the owner (teacher who uploaded it), (2) reads the PDF and audio file paths from MongoDB, (3) deletes each file from disk using `fs.unlinkSync(path)`, (4) then calls `Material.findByIdAndDelete(id)` to remove the MongoDB document. This ensures no orphaned files remain on disk.

---

## 16. 🚀 How to Run the Project (Demo Steps)

```bash
# Terminal 1 — Start Backend
cd "d:\BE Project\Blind2\backend"
node server.js
# → Server running on port 5000

# Terminal 2 — Start Frontend
cd "d:\BE Project\Blind2"
npm run dev
# → App running on http://localhost:5173
```

### Demo Flow for Viva:
1. Open `http://localhost:5173`
2. **Register as Teacher** → Upload a PDF → Generate Audio → Generate Quiz → Publish
3. **Open incognito** → Register as Student → Browse materials → Listen → Take Quiz
4. **Switch to teacher window** → Analytics tab → Show student data
5. *(Optional)*: Open MongoDB Compass → show actual data in collections

### Thunder Client Test Order (to prove auth):
1. `POST /api/auth/register` (teacher) → copy token
2. `POST /api/auth/login` → copy token
3. `GET /api/auth/me` WITH token → 200 OK
4. `GET /api/auth/me` WITHOUT token → 401 Unauthorized
5. `POST /api/materials` with STUDENT token → 403 Forbidden
6. `POST /api/materials` with TEACHER token → 200 OK

---

## 17. 🔑 Key Design Decisions (Justify These in Viva)

| Decision | Justification |
|---|---|
| MongoDB over SQL | Nested chapters[] array is natural in NoSQL; no joins needed |
| JWT over sessions | Stateless — no server memory for sessions; scales horizontally |
| gTTS + pyttsx3 over paid APIs | Free, no API key, covers both online and offline scenarios |
| pdf-parse library | Text extraction without external API or cloud service |
| Local disk storage | Simpler for development; Cloudinary can be swapped in for production |
| React SPA | Single-page app gives smooth UX without full page reloads |
| Fault-tolerant TTS waterfall | System never crashes even if TTS engines fail; graceful degradation |
