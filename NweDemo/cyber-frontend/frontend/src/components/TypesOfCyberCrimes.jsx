import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MailWarning, Banknote, UserX, MessageCircleWarning, ShieldAlert } from 'lucide-react';

const crimes = [
  {
    icon: <MailWarning size={40} className="text-cyan-400" />,
    title: 'Phishing',
    description: 'Deceptive attempts to obtain sensitive information via email or messages.',
  },
  {
    icon: <Banknote size={40} className="text-purple-400" />,
    title: 'Online Fraud',
    description: 'Scams involving false promises to extract money or data.',
  },
  {
    icon: <UserX size={40} className="text-blue-400" />,
    title: 'Identity Theft',
    description: 'Unauthorized use of personal information to commit fraud.',
  },
  {
    icon: <MessageCircleWarning size={40} className="text-red-400" />,
    title: 'Cyberbullying',
    description: 'Harassment or intimidation through digital platforms.',
  },
  {
    icon: <ShieldAlert size={40} className="text-yellow-400" />,
    title: 'Ransomware Attacks',
    description: 'Malicious software that locks data until a ransom is paid.',
  },
];

export default function TypesOfCyberCrimes() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;
  const totalItems = crimes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      const newIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
    }
  };

  const scrollRight = () => {
    if (currentIndex < totalPages - 1) {
      const newIndex = Math.min(currentIndex + 1, totalPages - 1);
      setCurrentIndex(newIndex);
    }
  };

  // Calculate the transform value for smooth scrolling
  const transformValue = `translateX(-${currentIndex * (100 / itemsPerPage)}%)`;

  return (
    <div className="bg-black text-white py-16 px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12">
          Common Cyber Crimes
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: transformValue }}
            >
              {crimes.map((crime, index) => (
                <div
                  key={index}
                  className="w-1/3 flex-shrink-0 bg-gray-900 rounded-xl shadow-lg border border-gray-800 hover:border-cyan-400 transition p-6"
                >
                  <div className="mb-4">{crime.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{crime.title}</h3>
                  <p className="text-gray-400 text-center mt-2">{crime.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows below the carousel */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className={`${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-500'
              } bg-gray-800 text-white rounded-full p-2 shadow-lg`}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Dots for pagination */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-cyan-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollRight}
              disabled={currentIndex === totalPages - 1}
              className={`${
                currentIndex === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-500'
              } bg-gray-800 text-white rounded-full p-2 shadow-lg`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}