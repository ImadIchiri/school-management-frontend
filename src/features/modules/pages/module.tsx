// import { useState } from "react";

// export default function ModuleStyle() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {/* Modules cards */}
//       {[...Array(12)].map((_, index) => (
//         <div
//           key={index}
//           className="rounded-2xl shadow-md border border-[#91c878] overflow-hidden hover:shadow-lg transition"
//         >
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-[#50965a]">
//               Module {index + 1}:
//             </h3>
//             <p className="text-sm mt-1">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
//               delectus deserunt facere laudantium.
//             </p>
//           </div>
//           <div className="p-4 border-t border-[#91c878] text-right">
//           {/* Button Absolut */}
//             {/* <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#6baf68] text-white hover:bg-[#50965a] font-medium text-sm transition">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
//                 />
//               </svg>
//               Delete
//             </button> */}

//             {/* #################### IMAD START #################### */}
//             <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#6baf68] text-white hover:bg-[#50965a] font-medium text-sm transition">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
//   <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
//   <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
// </svg>

//               Display
//             </button>
//             <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#6baf68] text-white hover:bg-[#50965a] font-medium text-sm transition">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
//   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
//   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
// </svg>

//                Update
//             </button>
//             {/* #################### IMAD END #################### */}
//           </div>
//         </div>
//       ))}

//       {/* Floating + button */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="fixed bottom-6 right-6 bg-[#6baf68] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#50965a] flex items-center justify-center text-3xl font-bold transition"
//       >
//         +
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative border border-[#91c878] shadow-lg">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-[#50965a]">
//                 Créer nouveau module
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-[#6baf68] hover:text-[#50965a] text-xl font-bold"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Form */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-4">
//                 <select className="w-full border border-[#91c878] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6baf68]">
//                   <option>Choisir l'enseignant</option>
//                 </select>
//                 <select className="w-full border border-[#91c878] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6baf68]">
//                   <option>Choisir le cours</option>
//                 </select>
//                 <input
//                   type="text"
//                   className="w-full border border-[#91c878] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6baf68]"
//                   placeholder="Entrer le niveau"
//                 />
//                 <textarea
//                   rows={4}
//                   className="w-full border border-[#91c878] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6baf68]"
//                   placeholder="Entrer la description du module"
//                 />
//               </div>

//               <div className="space-y-4">
//                 <label className="block text-sm font-medium mb-1 text-black">
//                   Number of Modules
//                 </label>
//                 <div className="flex gap-4 items-center">
//                   <label className="flex items-center gap-1">
//                     <input type="radio" name="moduleNumber" />
//                     Single
//                   </label>
//                   <label className="flex items-center gap-1">
//                     <input type="radio" name="moduleNumber" />
//                     Multiple
//                   </label>
//                 </div>

//                 <label className="block text-sm font-medium mb-1 text-black">
//                   Status
//                 </label>
//                 <div className="flex gap-4 items-center">
//                   <label className="flex items-center gap-1">
//                     <input type="radio" name="status" />
//                     Active
//                   </label>
//                   <label className="flex items-center gap-1">
//                     <input type="radio" name="status" />
//                     Inactive
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 mt-6">
//               <button className="border-2 border-[#91c878] text-black px-4 py-2 rounded hover:bg-[#50965a] hover:text-white transition">
//                 Annuler
//               </button>
//               <button className="bg-[#6baf68] text-white px-4 py-2 rounded hover:bg-[#50965a] transition">
//                 Ajouter
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
