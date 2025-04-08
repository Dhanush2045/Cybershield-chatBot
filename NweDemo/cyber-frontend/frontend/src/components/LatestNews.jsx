import { motion } from 'framer-motion';
import { CalendarDays, ShieldCheck, MessageCircle } from 'lucide-react';

const newsUpdates = [
  {
    icon: <CalendarDays size={32} className="text-cyan-400" />,
    title: 'Major Data Breach at Financial Institution',
    date: 'March 12, 2025',
    description: 'A major financial institution reported a breach compromising customer data. Authorities are investigating.',
  },
  {
    icon: <ShieldCheck size={32} className="text-purple-400" />,
    title: 'New Cyber Security Regulations Announced',
    date: 'March 10, 2025',
    description: 'The government introduced new security protocols to protect user data and prevent future attacks.',
  },
  {
    icon: <MessageCircle size={32} className="text-blue-400" />,
    title: 'Expert Advice: Protect Yourself from Phishing',
    date: 'March 8, 2025',
    description: 'Experts recommend using two-factor authentication and avoiding suspicious links to stay protected.',
  },
];

const LatestNews = () => {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center mb-12">
          Cyber Crime Alerts & Updates
        </h2>

        {/* News List */}
        <div className="space-y-8">
          {newsUpdates.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-400 transition shadow-lg"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full mr-6">
                {news.icon}
              </div>
              
              {/* Content */}
              <div>
                {/* Title */}
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  {news.title}
                </h3>
                {/* Date */}
                <p className="text-gray-500 text-sm mb-2">{news.date}</p>
                {/* Description */}
                <p className="text-gray-400">{news.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
