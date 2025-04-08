import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactSupport = () => {
  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We aim to respond to all inquiries within 24 hours.',
    },
  ];

  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center mb-12">
          Need Help?
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg flex flex-col h-full"
          >
            <div className="space-y-6 flex-1">
              {/* Name */}
              <div>
                <label className="block text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-400 mb-2">Your Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg hover:bg-cyan-300 transition"
              >
                Send Message
              </button>
            </div>
          </motion.form>

          {/* Right Side - Support Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg flex flex-col h-full"
          >
            {/* Contact Details */}
            <div className="space-y-8 mb-8 flex-grow">
              {/* Hotline */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-full">
                  <Phone size={24} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400">Hotline</p>
                  <p className="text-xl font-semibold text-white">+1 (800) 123-4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-full">
                  <Mail size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400">Email Support</p>
                  <p className="text-xl font-semibold text-white">support@cybercrime.com</p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-full">
                  <MessageCircle size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400">Live Chat</p>
                  <button className="text-xl font-semibold text-cyan-400 hover:underline">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <p className="text-white font-medium">{faq.question}</p>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-gray-400 mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;