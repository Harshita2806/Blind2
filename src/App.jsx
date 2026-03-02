import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage"; // Import the new Landing Page
import Teacher from "./pages/TeacherPage"; // Import the new Landing Page
import Student from "./pages/StudentPage"; // Import the new Landing Page

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root Route: Shows the new Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes: Shows Login/Signup */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Dashboard Route */}
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
}