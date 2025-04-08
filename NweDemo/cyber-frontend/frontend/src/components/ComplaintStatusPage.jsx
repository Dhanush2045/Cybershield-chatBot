import { useEffect } from "react";
import { useComplaintStore } from "../../stores/useComplaintStore";
import { motion } from "framer-motion";

const ComplaintStatusPage = () => {
  const {
    pastComplaints,
    fetchPastComplaints,
    isFetchingPastComplaints,
  } = useComplaintStore();

  useEffect(() => {
    fetchPastComplaints();
  }, [fetchPastComplaints]);

  // Loading State
  if (isFetchingPastComplaints) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-16 px-6 min-h-screen">
      {/* `min-h-screen` ensures it covers the full page height */}
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center mb-12 mt-20">
          {/* Added `mt-20` to push the heading down */}
          Your Past Complaints
        </h2>

        {/* Complaints List */}
        {pastComplaints?.length > 0 ? (
          <div className="grid gap-6">
            {pastComplaints.map((complaint) => (
              <motion.div
                key={complaint._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-lg"
              >
                {/* Complaint Title */}
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  Crime Type: {complaint.crime_type}
                </h3>

                {/* Complaint Text */}
                <p className="text-gray-400 mb-4">{complaint.complaint_text}</p>

                {/* Created At */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Solution */}
                {complaint.solution && (
                  <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-2">
                      Solution:
                    </h4>
                    <p className="text-gray-400">{complaint.solution}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-gray-500 text-center text-xl">
              No past complaints found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintStatusPage;
