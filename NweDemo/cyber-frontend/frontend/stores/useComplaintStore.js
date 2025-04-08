import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useComplaintStore = create((set,get) => ({
    isRegistering:false,
    complaintResponse:null,
    isFetchingPastComplaints:false,
    pastComplaints:null,
    registerComplaint : async (data) => {
        set({isRegistering:true});
        try {
            const res = await axiosInstance.post("/validate_complaint",data);
            set({complaintResponse:res.data});
            toast.success("Complaint Verfied Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in useComplaintStore in registerComplaint method",error);
        } finally{
            set({isRegistering:false});
        }
    },
    fetchPastComplaints: async () => {
        set({isFetchingPastComplaints:true});
        try {
            const res = await axiosInstance.get("/complaints");
            set({pastComplaints:res.data});
            toast.success("Complaints Fetched Successfully");
        } catch (error) {
            console.log("Error in useComplaintStore in fetchPastComplaint method",error);
            toast.error(error.response.data.message);
        } finally{
            set({isFetchingPastComplaints:false});
        }
    }
}));