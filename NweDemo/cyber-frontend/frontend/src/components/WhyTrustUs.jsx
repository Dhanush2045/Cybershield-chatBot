import { motion } from 'framer-motion';
import { ShieldCheck, Lock, UserCheck } from 'lucide-react';
import johnImage from "../assets/images.png";
const trustSignals = [
  {
    icon: <ShieldCheck size={32} className="text-cyan-400" />,
    title: 'Data Privacy',
    description: 'Your data is encrypted and handled with strict confidentiality.',
  },
  {
    icon: <Lock size={32} className="text-purple-400" />,
    title: 'Secure Platform',
    description: 'We use SSL encryption and advanced security protocols.',
  },
  {
    icon: <UserCheck size={32} className="text-blue-400" />,
    title: 'Anonymity Option',
    description: 'Report crimes anonymously for added privacy and safety.',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    feedback:
      'This platform gave me the confidence to report a cyber crime securely. I felt supported throughout the process.',
    image: johnImage, // Update with actual path
  },
  {
    name: 'Jane Smith',
    feedback:
      'Fast and secure! I reported an incident and received updates promptly. Highly recommended!',
    image: johnImage, // Update with actual path
  },
];

const WhyTrustUs = () => {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12">
          Your Safety Matters to Us
        </h2>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {trustSignals.map((signal, index) => (
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
                {signal.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {signal.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400">{signal.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-8">
            What People Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg flex items-start gap-4"
              >
                {/* Profile Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <p className="text-gray-300 italic mb-2">"{testimonial.feedback}"</p>
                  <h4 className="text-lg font-semibold text-cyan-400">
                    — {testimonial.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTrustUs;