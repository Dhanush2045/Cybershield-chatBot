import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AboutSection from './AboutSectionPage';
import TypesOfCyberCrimes from './TypesOfCyberCrimes';
import HowItWorks from './HowItWorks';
import WhyTrustUs from './WhyTrustUs';
import CyberSafetyTips from './CyberSafetyTips';
import LatestNews from './LatestNews';
import ContactSupport from './ContactSupport';
import FileComplaintPage from './FileComplaintPage';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-800 animate-spin-slow opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/path-to-your-matrix-code.png')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <ShieldCheck size={64} className="text-cyan-400 mb-4" />
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Report Cyber Crimes with Confidence
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Protect yourself and others by reporting suspicious online activities.
        </motion.p>

        <div className="mt-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg shadow-lg transition"
            onClick={() => navigate("/file-complaint")}
          >
            File a Complaint <ArrowRight size={20} />
          </motion.button>
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn btn-outline border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-lg transition"
  onClick={() => window.scrollBy({ top: 500, behavior: 'smooth' })} // Scroll down by 500px smoothly
>
  Learn More
</motion.button>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Ensure TypesOfCyberCrimes is properly positioned */}
        <TypesOfCyberCrimes />
        <HowItWorks />
        <WhyTrustUs />
        <CyberSafetyTips />
        <LatestNews />
        <ContactSupport />
    </div>
  );
};

export default HomePage;