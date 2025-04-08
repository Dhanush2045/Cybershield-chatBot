import React from "react";
import { useComplaintStore } from "../../stores/useComplaintStore";
export default function ComplaintResult() {

    const {complaintResponse} = useComplaintStore();

    const { crime_type, is_cybercrime, solution } = complaintResponse;

  return (
    <div className="mt-8 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
      <h3 className="text-2xl font-bold text-cyan-400 mb-4">Complaint Result</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Crime Type:</span>
          <span className="text-lg text-yellow-400">{crime_type}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Is Cybercrime:</span>
          <span className="text-lg text-green-400">{is_cybercrime ? 'Yes' : 'No'}</span>
        </div>

        <div>
          <span className="text-lg font-semibold text-white block mb-2">Suggested Solution:</span>
          <p className="text-gray-300 leading-relaxed bg-gray-800 p-4 rounded-lg">{solution}</p>
        </div>
      </div>
    </div>
  );
  }  