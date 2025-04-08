import { motion } from 'framer-motion';
import { Key, Shield, Link2, AlertTriangle } from 'lucide-react';

const safetyTips = [
  {
    icon: <Key size={32} className="text-cyan-400" />,
    title: 'Use Strong Passwords',
    description: 'Create complex passwords and update them regularly to stay protected.',
  },
  {
    icon: <Shield size={32} className="text-purple-400" />,
    title: 'Enable Two-Factor Authentication',
    description: 'Add an extra layer of security with 2FA to prevent unauthorized access.',
  },
  {
    icon: <Link2 size={32} className="text-blue-400" />,
    title: 'Avoid Suspicious Links',
    description: 'Never click on links from unknown sources to prevent phishing attacks.',
  },
  {
    icon: <AlertTriangle size={32} className="text-red-400" />,
    title: 'Report Suspicious Activity',
    description: 'Notify authorities immediately if you encounter suspicious behavior.',
  },
];

const CyberSafetyTips = () => {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12">
          Stay Safe Online
        </h2>

        {/* Safety Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safetyTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6 hover:border-cyan-400 transition"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full mb-4">
                {tip.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {tip.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberSafetyTips;