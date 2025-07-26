import { FaMale, FaFemale, FaPrint } from "react-icons/fa";
import moment from "moment";
import LoadingSpinner from "./LoadingSpinner";

const BasicInformationSection = ({ isLoading, basicInformation }) => {
  return (
    <section className="mb-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : basicInformation.firstName ? (
        <div className="mx-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
              
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Name:</strong>
                  <span className="text-gray-800">
                    {`${basicInformation.firstName || ""} ${
                      basicInformation.middleName ? basicInformation.middleName + " " : ""
                    }${basicInformation.lastName || ""}`.trim() || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Age:</strong>
                  <span className="text-gray-800">{basicInformation.age}</span>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Gender:</strong>
                  <span className="flex items-center text-gray-800">
                    {basicInformation.gender || "N/A"}
                    {basicInformation.gender === "Male" && (
                      <FaMale className="ml-2 text-sky-600" />
                    )}
                    {basicInformation.gender === "Female" && (
                      <FaFemale className="ml-2 text-teal-500" />
                    )}
                  </span>
                </div>
              </div>

              {/* Record Information */}
              <div className="space-y-4">
             
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Patient No:</strong>
                  <span className="text-gray-800">{basicInformation.patientNo || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Created Date:</strong>
                  <span className="text-sky-600">
                    {basicInformation.formDate
                      ? moment(basicInformation.formDate).format("YYYY MMM DD hh:mm A")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-gray-600 font-medium">Last Modified:</strong>
                  <span className="text-sky-600">
                    {basicInformation.lastModified
                      ? moment(basicInformation.lastModified).format("YYYY MMM DD hh:mm A")
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Actions and Handled By */}
              <div className="space-y-4 flex flex-col items-start lg:items-end">
            
                <div className="flex flex-col items-start lg:items-end space-y-4">
                  <div className="text-left lg:text-right">
                    <p className="text-gray-600 font-medium">Handled by:</p>
                    <p className="text-sky-600">Dr. Chaminda Weerasiriwardane</p>
                  </div>
                  {/* Profile Image (Commented Out) */}
                  {/* <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-sky-300 shadow-sm"
                  /> */}
                  <button
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
                    aria-label="Print patient summary"
                  >
                    <FaPrint />
                    Print Summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No patient information available</div>
      )}
    </section>
  );
};

export default BasicInformationSection;




//     <section className="mb-2">
//           { (
//              !isLoading && basicInformation.firstName ? (
//           <div className="mx-4">
           
//             {/* {JSON.stringify(basicInformation)} */}
//       <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
       

  
//           <div className="col-span-2 space-y-4">
//             <div className="flex items-center gap-3">
//               <strong className="text-gray-700 font-semibold">
//                 Name:
//               </strong>
//               <span className="text-gray-800">
//                 {`${basicInformation.firstName || ""} ${
//                   basicInformation.middleName
//                     ? basicInformation.middleName + " "
//                     : ""
//                 }${basicInformation.lastName || ""}`.trim() || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <strong className="text-gray-700 font-semibold">
//                 Age:
//               </strong>
//               <span className="text-gray-800">
//                 {basicInformation.age || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <strong className="text-gray-700 font-semibold">
//                 Gender:
//               </strong>
//               <span className="flex items-center text-gray-800">
//                 {basicInformation.gender || "N/A"}
//                 {basicInformation.gender === "Male" && (
//                   <FaMale className="ml-2 text-sky-600" />
//                 )}
//                 {basicInformation.gender === "Female" && (
//                   <FaFemale className="ml-2 text-pink-500" />
//                 )}
//               </span>
//             </div>
//           </div>

//              <div className="col-span-2 md:col-span-2 space-y-4">
//             <div className="flex items-center gap-3">
//               <strong className="text-gray-700 font-semibold">
//                 Patient No:
//               </strong>
//               <span className="text-gray-800">
//                 {basicInformation.patientNo || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <strong className="text-sky-700 font-semibold">
//                 Created Date:
//               </strong>
//               <span className="text-sky-600">
//                 {moment(basicInformation.formDate).format("yyyy MMM DD hh:mm a") || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <strong className="text-sky-700 font-semibold">
//                 Last Modified:
//               </strong>
//               <span className="text-sky-600 rounded-md">
//                 {basicInformation.lastModified
//                   ? moment(basicInformation.lastModified).format("yyyy MMM DD hh:mm a")
//                   : "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Profile Image and Print Button Section */}
//           <div className="col-span-2 flex flex-col justify-between items-end ">
          
//           <div className="flex justify-between">

//  <div className="flex flex-col justify-between">
//               <p className="text-sky-700 font-semibold text-sm mb-2">
//                 Handled by:
//               </p>
          
//                <p className="text-sky-600 text-sm mb-2">
//                 Dr. Chaminda Weerasiriwardane
//               </p>
             
//             </div>

//              {/* <img
//                 src={profileImageUrl}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full object-cover border-2 border-sky-300 shadow-sm"
//               /> */}
            
//           </div>
              
//             <button
//               className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
//               aria-label="Print patient summary"
//             >
//               <FaPrint />
//               Print
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//               ) : (
//             <LoadingSpinner />
//           )
//           )}
//         </section>