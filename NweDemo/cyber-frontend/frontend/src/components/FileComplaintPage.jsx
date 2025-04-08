import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useComplaintStore } from '../../stores/useComplaintStore';
import ComplaintResult from './ComplaintResult';

const FileComplaintPage = () => {
  const [formData,setFormData] = useState({
    complaint:""
  });
  const { isRegistering, registerComplaint, complaintResponse } = useComplaintStore();

  // useEffect(() => {
  //   if (complaintResponse) {
  //     console.log('Complaint Response:', complaintResponse);
  //   }
  // }, [complaintResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.complaint.trim()) return;
    registerComplaint(formData);
    formData.complaint = "";
  };
  if (isRegistering) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white pt-32 px-6 pb-16 relative min-h-screen flex items-center justify-center">
      {/* Loading Overlay (scoped to this component only) */}
      {/* {isRegistering && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      )} */}

      <div className={`max-w-4xl w-full ${isRegistering ? 'blur-sm' : ''}`}>
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
            File a Cyber Crime Complaint
          </h2>
          <p className="text-gray-400 mt-4">
            Describe the issue you're facing in detail. Our team will handle the rest.
          </p>
        </div>

        {/* Complaint Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg"
        >
          {/* Complaint Input */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Your Complaint</label>
            <textarea
              rows="5"
              value={formData.complaint}
              onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
              placeholder="Describe the incident..."
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  onClick={!isRegistering ? handleSubmit : undefined} // Prevent click manually
  className={`w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg hover:bg-cyan-300 transition ${
    isRegistering
      ? 'opacity-50 pointer-events-none' // Disable interaction visually but allow cursor
      : 'hover:cursor-pointer'
  }`}
>
  {isRegistering ? 'Submitting...' : 'Submit Complaint'}
</button>
        </motion.form>
        {complaintResponse && <ComplaintResult />}
      </div>
    </div>
  );
};

export default FileComplaintPage;