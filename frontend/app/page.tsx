import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}









// "use client";  

// import { useState } from 'react';

// export default function Home() {
//   const [errorText, setErrorText] = useState('');
//   const [codeText, setCodeText] = useState('');
//   const [solution, setSolution] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFix = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://devrelief.onrender.com/api/fix', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ error: errorText }),
//       });
//       const data = await response.json();
//       setSolution(data.solution || data.error);
//     } catch (error) {
//       setSolution('Error connecting to backend');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <div>
//       <h1 className='text-3xl text-blue-950 font-bold ml-1 mt-4'>AI Powered Java Bug Fixer</h1>
//       <div className="bg-white p-8 rounded shadow-md max-w-md w-full mt-4">
//         <h1 className="text-2xl font-bold mb-4 text-blue-800">Java Runtime Exceptions</h1>
//         <label className="block font-semibold mb-1"> Error / Stack Trace </label>
//         <textarea
//           className="w-full p-2 border border-gray-400 rounded mb-4 bg-zinc-50 h-40"
//           rows={4}
//           placeholder="Paste your Java error here..."
//           value={errorText}
//           onChange={(e) => setErrorText(e.target.value)}
//         />
//           <label className="block font-semibold mb-1"> Code Snippet</label>
//             <textarea
//               className="w-full p-2 border border-gray-400 rounded mb-4 bg-zinc-50 h-96"
//               placeholder="Paste your code here..."
//               value={codeText}
//               onChange={(e) => setCodeText(e.target.value)}
//             />
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleFix}
//           disabled={loading}
//         >
//           {loading ? 'Fixing...' : 'Fix It'}
//         </button>
//         {solution && (
//           <div className="mt-4 p-4 bg-zinc-50 border border-gray-400 rounded w-full h-90 whitespace-pre-wrap overflow-y-auto">
//             <h2 className="font-bold text-black">Solution:</h2>
//             <p className='text-cyan-950'>{solution}</p>
//           </div>
//         )}
//       </div>
//      </div>
//     </div>
//   );
// }