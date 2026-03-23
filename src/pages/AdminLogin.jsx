// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Lock, User, LogIn, ShieldCheck } from "lucide-react";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost/api/login.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       });

//       const data = await response.json();

//       if (data.status) {
//         const userData = { role: 'admin', username: form.username };
//         localStorage.setItem("v5c_user", JSON.stringify(userData));
//         localStorage.setItem("token", data.token);
//         window.location.href = '/';
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError("Server error. Please check your connection.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0]
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl"
//         />
//         <motion.div 
//           animate={{ 
//             scale: [1.2, 1, 1.2],
//             rotate: [90, 0, 90]
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#D4AF37]/10 to-transparent rounded-full blur-3xl"
//         />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md px-6"
//       >
//         <div className="bg-[#111111] p-10 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <motion.div 
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring" }}
//               className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-2xl mb-4"
//             >
//               <ShieldCheck className="text-[#D4AF37]" size={32} />
//             </motion.div>
//             <h1 className="text-3xl font-normal mb-2">
//               Admin <span className="text-[#D4AF37] font-bold">Login</span>
//             </h1>
//             <p className="text-gray-500 text-sm font-sans">Enter your credentials to continue</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="space-y-5">
//             {/* Username */}
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="relative group"
//             >
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
//               <input
//                 type="text"
//                 placeholder="Username"
//                 required
//                 className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//               />
//             </motion.div>

//             {/* Password */}
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="relative group"
//             >
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//               />
//             </motion.div>

//             {/* Error Message */}
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center"
//               >
//                 {error}
//               </motion.div>
//             )}

//             {/* Submit Button */}
//             <motion.button
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <motion.div 
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
//                 />
//               ) : (
//                 <><LogIn size={18} /> Login</>
//               )}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLogin;

// DISABLED - Login functionality is currently disabled
// export default () => null;
