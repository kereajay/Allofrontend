import React, { useContext, useState, useEffect } from "react";
import { Usercontext } from "../main";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
  const [inval, setInval] = useState("");
  const [selectv, setSelectv] = useState("");
  useEffect(() => {
    const fetchdoctors = async () => {
      try {
        const res = await fetch(
          "https://allobackend.onrender.com/api/v1/user/getalldoctors",
          {
            withCredntials: true,
            credentials: "include",
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        setDoctors(data.doctors);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdoctors();
  }, []);

  return (
    <>
      <div className="w-[100%]">
        <div className="flex px-14 mt-3 w-[100%] justify-between  items-center gap-6 py-2">
          <div className="relative w-full md:w-[30%] ">
            <input
              type="text"
              className="w-full border border-gray-300 py-3 px-4 rounded-full text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setInval(e.target.value)}
              value={inval}
              placeholder="serach doctors by there name.."
            />
          </div>
          <div className="flex items-center justify-center  bg-gray-100">
            <select
              onChange={(e) => setSelectv(e.target.value)}
              className="text-lg w-56 px-4 py-2 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
            >
              <option value="" disabled selected>
                Select a city
              </option>
              <option value="All">All</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Hariyana">Hariyana</option>
            </select>
          </div>
        </div>
        <div className="shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-[93%] m-auto mt-10 rounded-2xl p-4 mb-5  ">
          <h1 className="text-3xl text-blue-400 font-bold">Doctors</h1>
          <br />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4">
            {doctors && doctors.length > 0 ? (
              doctors
                .filter((item) =>
                  item.firstName.toLowerCase().includes(inval.toLowerCase())
                )
                .filter((itema) =>
                  selectv.toLowerCase() === "all"
                    ? true
                    : itema.location
                        .toLowerCase()
                        .includes(selectv.toLowerCase())
                )
                .map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Doctor Avatar */}
                    <div className="p-4 flex justify-center items-center bg-purple-300">
                      <img
                        src={doc.docAvatar?.url || "default-avatar.png"}
                        alt="docavatar"
                     
                        className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-md"
                      />
                    </div>

                    {/* Doctor Details */}
                    <div className="p-6 text-center ">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {doc.firstName} {doc.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3">
                        {doc.doctorDepartment}
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="font-semibold">Location:</span>{" "}
                        {doc.location}
                      </p>

                      {/* Divider */}
                      <div className="border-t my-4"></div>

                      {/* Contact Details */}
                      <div className="text-sm text-left space-y-6">
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {doc.email}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {doc.phone}
                        </p>
                        <p>
                          <span className="font-semibold">DOB:</span>{" "}
                          {doc.dob.substr(0, 10)}
                        </p>
                        <p>
                          <span className="font-semibold">Gender:</span>{" "}
                          {doc.gender}
                        </p>
                        <p>
                          <span className="font-semibold">Hospital ID:</span>{" "}
                          {doc.Hospitalid}
                        </p>
                      </div>

                    
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-4 text-center">
                <h1 className="text-xl text-gray-700 font-medium">
                  There are no doctors available.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors;
