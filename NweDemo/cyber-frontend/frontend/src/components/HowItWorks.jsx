import { motion } from 'framer-motion';
import { ClipboardList, FileText, Send, Bell } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList size={32} className="text-cyan-400" />,
    title: 'Describe the Incident',
    description: 'Explain the nature of the cyber crime clearly.',
  },
  {
    icon: <FileText size={32} className="text-purple-400" />,
    title: 'Provide Evidence',
    description: 'Attach screenshots or documents as proof.',
  },
  {
    icon: <Send size={32} className="text-blue-400" />,
    title: 'Submit Your Report',
    description: 'Submit the report securely through our platform.',
  },
  {
    icon: <Bell size={32} className="text-yellow-400" />,
    title: 'Get Updates',
    description: 'Receive real-time updates on your case status.',
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12">
          How to Report a Cyber Crime
        </h2>

        {/* Timeline Container */}
        <div className="relative flex justify-between items-center gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center max-w-[200px]"
            >
              {/* Step Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-full shadow-lg mb-4">
                {step.icon}
              </div>
              
              {/* Step Title */}
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                {step.title}
              </h3>
              
              {/* Step Description */}
              <p className="text-gray-400 text-sm">{step.description}</p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 h-[2px] bg-gray-700 mt-4"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;