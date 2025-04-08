import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6"
        >
          What We Do
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12"
        >
          Our platform helps you report cyber crimes quickly and securely. We provide 
          support for a wide range of online threats, including fraud, identity theft, 
          harassment, and hacking. Your safety is our top priority.
        </motion.p>

        {/* Icon Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Protection */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <div className="bg-cyan-500 p-4 rounded-full shadow-lg">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-cyan-400">
              Protection
            </h3>
            <p className="text-gray-400 text-center mt-2">
              Report and secure your data from threats.
            </p>
          </motion.div>

          {/* Security */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <div className="bg-purple-500 p-4 rounded-full shadow-lg">
              <Lock size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-purple-400">
              Security
            </h3>
            <p className="text-gray-400 text-center mt-2">
              Your information is encrypted and protected.
            </p>
          </motion.div>

          {/* Alert */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <div className="bg-blue-500 p-4 rounded-full shadow-lg">
              <AlertCircle size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-blue-400">
              Alert
            </h3>
            <p className="text-gray-400 text-center mt-2">
              Get notified of suspicious activities.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}