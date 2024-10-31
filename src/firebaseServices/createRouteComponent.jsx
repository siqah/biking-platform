// import  { useState } from 'react';
// import  createRoute from "../components/createRoute" // Adjust this import to the actual path

// // eslint-disable-next-line react/prop-types
// const CreateRouteComponent = ({ userId }) => {
//   const [routeData, setRouteData] = useState({
//     title: '',
//     description: '',
//     distance: 0,
//     difficulty: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRouteData({ ...routeData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const routeId = await createRoute(userId, routeData);
//       setSuccess(`Route created successfully! ID: ${routeId}`);
//       setRouteData({
//         title: '',
//         description: '',
//         distance: 0,
//         difficulty: '',
//       });
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError('Failed to create route. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Create New Route</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={routeData.title}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={routeData.description}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="distance"
//           placeholder="Distance (km)"
//           value={routeData.distance}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//         <select
//           name="difficulty"
//           value={routeData.difficulty}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         >
//           <option value="" disabled>
//             Select Difficulty
//           </option>
//           <option value="Easy">Easy</option>
//           <option value="Moderate">Moderate</option>
//           <option value="Hard">Hard</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? 'Creating...' : 'Create Route'}
//         </button>
//       </form>

//       {success && <p className="mt-4 text-green-500">{success}</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default CreateRouteComponent;
