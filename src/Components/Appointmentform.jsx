import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Appointmentform() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [PatientId, setPatientId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointment_date, setAppointment_date] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctor_firstName, setDoctor_firstName] = useState("");
  const [doctor_lastName, setDoctor_lastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Cardiology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchdoctors = async () => {
      const res = await fetch(
        "https://allobackend.onrender.com/api/v1/user/getalldoctors",
        {
          withCredntials: true,
          credentials: "include",
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",

          // },
        }
      );
      const data = await res.json();
      setDoctors(data.doctors);
      // console.log(data.doctors);
    };
    fetchdoctors();
  }, []);
  const bookappointment = async (e) => {
    e.preventDefault();
    
    try {
      console.log(
        gender,
        dob,
        PatientId,
        email,
        phone,
        lastName,
        firstName,
        hasVisited,
        address,
        doctor_firstName,
        doctor_lastName,
        department,
        appointment_date
      );
      const requestBody = {
        firstName,
        lastName,
        email,
        phone,
        PatientId,
        dob,
        gender,
        appointment_date,
        doctor_firstName,
        doctor_lastName,
        department,
        address,
        hasVisited,
      };
      const res = await fetch(
        "https://allobackend.onrender.com/api/v1/apoointment/bookappointment",
        {
          withCredntials: true,
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await res.json();
      if (data.success == true) {
        toast.success(data.message, {
          autoClose: 1500,
        });
        setFirstName("")
        setLastName("")
        setAddress("")
        setAppointment_date("")
        setDepartment("")
        setDob("")
        setDoctor_firstName("")
        setDoctor_lastName("")
        // setDoctors("")
        setEmail("")
        setGender("")
        setHasVisited(false)
        setPatientId('')
        setPhone("")
       

      } else {
        toast.error(data.message, {
          autoClose: 1500,
        });
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-3xl font-semibold text-gray-500 text-center">
        Book an Appointment
      </h1>
      <br />
      <div className=" mx-auto p-4">
        <form onSubmit={bookappointment}>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-2xl font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-2xl font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-2xl font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-2xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="PatientId"
              className="block text-2xl font-medium text-gray-700"
            >
              PatientId
            </label>
            <input
              type="tel"
              name="PatientId"
              id="PatientId"
              value={PatientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-2xl font-medium text-gray-700"
            >
              DOB
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-2xl font-medium text-gray-700"
            >
              Gender
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="appointment_date"
              className="block text-2xl font-medium text-gray-700"
            >
              Appointmentdate
            </label>
            <input
              type="date"
              name="appointment_date"
              id="appointment_date"
              value={appointment_date}
              onChange={(e) => setAppointment_date(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-2xl font-medium text-gray-700"
            >
              Department
            </label>
            <select
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctor_firstName("");
                setDoctor_lastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="doctors"
              className="block text-2xl font-medium text-gray-700"
            >
              Doctors
            </label>

            <select
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={`${doctor_firstName} ${doctor_lastName}`}
              onChange={(e) => {
                const [dfirstName, dlastName] = e.target.value.split(" ");
                console.log(dfirstName, dlastName);
                setDoctor_firstName(dfirstName);
                setDoctor_lastName(dlastName);
              }}
              // disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter(
                  (doctor) =>
                    doctor.doctorDepartment.toLowerCase() ==
                    department.toLowerCase()
                )
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-2xl font-medium text-gray-700"
            >
              Address
            </label>

            <textarea
              name=""
              id=""
              rows={8}
              cols={63}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <br />

          <div className="flex gap-2 items-center">
            <p>Have you visited before</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
            />
          </div>
          <br />

          <button
            // onClick={bookappointment}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book an Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointmentform;
