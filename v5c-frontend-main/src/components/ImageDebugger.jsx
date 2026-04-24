// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getImageUrl, getPropertyImages } from '../utils/imageUtils';

// /**
//  * Debug component to test image URLs
//  * Add this to any page temporarily to debug image issues
//  * 
//  * Usage:
//  * import ImageDebugger from './components/ImageDebugger';
//  * <ImageDebugger />
//  */
// const ImageDebugger = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost/api";
//         const res = await axios.get(`${API_BASE}/get.php`);
//         const props = res.data.status ? res.data.properties : res.data;
//         setProperties(props);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   if (loading) return <div className="p-4 bg-gray-900 text-white">Loading...</div>;

//   return (
//     <div className="fixed bottom-4 right-4 max-w-md max-h-96 overflow-auto bg-gray-900 text-white p-4 rounded-lg shadow-lg z-50 text-xs">
//       <h3 className="font-bold mb-2 text-yellow-400">🔍 Image Debug Info</h3>
//       <div className="space-y-4">
//         {properties.slice(0, 3).map((prop) => {
//           const images = getPropertyImages(prop);
//           return (
//             <div key={prop.id} className="border-t border-gray-700 pt-2">
//               <div className="font-semibold text-green-400">Property #{prop.id}</div>
//               <div className="text-gray-400">Title: {prop.title || 'N/A'}</div>
              
//               <div className="mt-2">
//                 <div className="text-yellow-300">Raw Images Data:</div>
//                 <pre className="bg-black p-2 rounded text-[10px] overflow-x-auto">
//                   {JSON.stringify(prop.images, null, 2)}
//                 </pre>
//               </div>

//               <div className="mt-2">
//                 <div className="text-yellow-300">Processed Images ({images.length}):</div>
//                 {images.length === 0 ? (
//                   <div className="text-red-400">No images found</div>
//                 ) : (
//                   images.map((img, i) => (
//                     <div key={i} className="mt-1">
//                       <div className="text-blue-300">Image {i + 1}:</div>
//                       <div className="bg-black p-1 rounded break-all">
//                         <div className="text-gray-400">DB Path:</div>
//                         <div className="text-white">{img}</div>
//                         <div className="text-gray-400 mt-1">Full URL:</div>
//                         <div className="text-green-300">{getImageUrl(img)}</div>
//                       </div>
//                       <img 
//                         src={getImageUrl(img)} 
//                         alt={`Test ${i}`}
//                         className="w-20 h-20 object-cover mt-1 border border-green-500"
//                         onError={(e) => {
//                           e.target.style.borderColor = 'red';
//                           console.error('Failed to load:', getImageUrl(img));
//                         }}
//                         onLoad={(e) => {
//                           e.target.style.borderColor = 'green';
//                           console.log('Successfully loaded:', getImageUrl(img));
//                         }}
//                       />
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="mt-4 text-gray-400 text-[10px]">
//         Check browser console (F12) for detailed logs
//       </div>
//     </div>
//   );
// };

// export default ImageDebugger;
