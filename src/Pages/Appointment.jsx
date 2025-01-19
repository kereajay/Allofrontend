import React, { useState, useEffect } from "react";
import Hero from "../Components/Hero";
import Appointmentform from "../Components/Appointmentform";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Newappointment from "../Components/Newappointment";
import { Link } from "react-router-dom";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const adjustedDate = new Date(
    newDate.getTime() - newDate.getTimezoneOffset() * 60000
  );

  // Fetch all appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://allobackend.onrender.com/api/v1/apoointment/getallappointment",
          { withCredentials: true }
        );
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };
    fetchAppointments();
  }, []);

  // Open modal for rescheduling
  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(new Date(appointment.appointment_date));
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Handle rescheduling logic
  const handleReschedule = async () => {
    console.log(selectedAppointment._id);
    if (!selectedAppointment) return;

    try {
      const res = await axios.put(
        `https://allobackend.onrender.com/api/v1/apoointment/update/${selectedAppointment._id}`,
        {
          appointment_date: newDate.toISOString(),
        },
        {
          withCredentials: true, // Include credentials for authentication
        }
      );

      // Update the local state with the new appointment date
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === selectedAppointment._id
            ? { ...appointment, appointment_date: newDate.toISOString() }
            : appointment
        )
      );

      toast.success(
        res.data.message || "Appointment rescheduled successfully."
      );
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error rescheduling appointment."
      );
      console.error("Error rescheduling appointment:", error);
    }
  };

  // Handle status update
  const handleStatus = async (appointmentId, status) => {
    // console.log(typeof appointmentId)
    try {
      const { data } = await axios.put(
        `https://allobackend.onrender.com/api/v1/apoointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message || "Status updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  const handledeleteappointment = async (aid) => {
    try {
      const { data } = await axios.delete(
        `https://allobackend.onrender.com/api/v1/apoointment/delete/${aid}`,

        { withCredentials: true }
      );

      setAppointments((preapp) =>
        preapp.filter((appoint) => appoint._id != aid)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {/* Reschedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="h-48 w-72 bg-purple-400  m-auto items-center flex flex-col justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <div className="mt-4 flex  space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleReschedule}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Appointments Table */}
      <div className="overflow-x-auto px-2 py-20">
        <div className="py-4">
          <Link to={"/Newappointment"}>
            <button className="text-2xl font-semibold bg-purple-400 px-2 py-2 rounded-2xl">
              Book A NewAppointment
            </button>
          </Link>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md dark:bg-gray-900 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Queue
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Patient
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Doctor
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Department
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-600 dark:text-gray-200 uppercase border-r border-gray-300 dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {appointments.map((appoint, index) => (
              <tr
                key={appoint._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3 text-lg text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                  {appoint.firstName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                  {new Date(appoint.appointment_date).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                  {appoint.doctor.firstName} {appoint.doctor.lastName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                  {appoint.department}
                </td>
                <td className="px-4 py-3 text-lg border-r border-gray-300 dark:border-gray-700">
                  <select
                    value={appoint.status}
                    onChange={(e) => handleStatus(appoint._id, e.target.value)}
                    className={`focus:outline-none border rounded px-2 py-1 ${
                      appoint.status === "Pending"
                        ? "text-yellow-500 bg-yellow-100"
                        : appoint.status === "Accepted"
                        ? "text-green-500 bg-green-100"
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-lg text-blue-500 hover:underline border-r border-gray-300 dark:border-gray-700">
                  <button onClick={() => openRescheduleModal(appoint)}>
                    Reschedule
                  </button>
                </td>
                <td className="px-4 py-3 text-lg text-red-500 hover:text-red-700 border-r border-gray-300 dark:border-gray-700">
                  <button onClick={() => handledeleteappointment(appoint._id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Other Components */}
      {/* <Appointmentform /> */}
      <Footer />
    </div>
  );
}

export default Appointment;
