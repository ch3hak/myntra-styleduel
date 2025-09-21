import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { OutfitProvider } from './lib/outfit-state'
import { Navigation } from './components/navigation'
import { Toaster } from 'sonner'

// Pages
import HomePage from './pages/HomePage'
import ThemesPage from './pages/ThemesPage'
import CreateOutfitPage from './pages/CreateOutfitPage'
import MoodboardPage from './pages/MoodboardPage'
import VotePage from './pages/VotePage'
import LeaderboardPage from './pages/LeaderboardPage'
import WinnersPage from './pages/WinnersPage'
import MyOutfitsPage from './pages/MyOutfitsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <AuthProvider>
      <OutfitProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/themes" element={<ThemesPage />} />
            <Route path="/create-outfit" element={<CreateOutfitPage />} />
            <Route path="/create-outfit/moodboard" element={<MoodboardPage />} />
            <Route path="/vote" element={<VotePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/winners" element={<WinnersPage />} />
            <Route path="/my-outfits" element={<MyOutfitsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Toaster />
        </div>
      </OutfitProvider>
    </AuthProvider>
  )
}

export default App