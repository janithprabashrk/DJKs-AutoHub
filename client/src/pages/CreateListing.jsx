import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: []
  });
  const [ImageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  console.log(formData);
  
  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length + formData.imageUrls.length <= 6) {
        setUploading(true);
        setImageUploadError(false);
        setUploadProgress(0);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(stroreImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
          setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
          setImageUploadError(false);
          setUploading(false);
          setUploadProgress(100);
          setTimeout(() => setUploadProgress(0), 1000); // Reset progress after 1s
        }).catch((error) => {
          setImageUploadError('Image upload failed (2mb max per image)..!!');
          setUploading(false);
          setUploadProgress(0);
        });
    }else{
        setImageUploadError('You can only upload 6 images per listing..!!')
        setUploading(false);
    }
  }

  const stroreImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file); 
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
        (error) => {
        reject(error);
      },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        })
      })
    });
  }
  const handleRemoveImage = (index) => {
    setFormData({...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index)});
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      <h1 className="text-4xl text-center font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Create a Listing</h1>
      <div className="max-w-4xl mx-auto px-4 flex items-center min-h-[calc(100vh-20rem)]">
        <form className="grid grid-cols-2 gap-6 backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-full">
          <input type="text" placeholder="Name" id="name" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" maxLength="62" minLength="10" required />
          <input type="text" placeholder="Description" id="description" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" maxLength="62" minLength="10" required />
          <input type="text" placeholder="Location" id="location" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required />
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">LKR :</span>
            <input type="number" placeholder="Regular Price" id="regularPrice" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" required />
          </div>
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">LKR :</span>
            <input type="number" placeholder="Discount Price" id="discountPrice" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>
          <input type="text" placeholder="Model Name" id="modelName" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required />
          <input type="number" placeholder="Year of Manufacture" id="YOM" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" required />
          <div className="flex gap-3 items-center px-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="modified" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700/50 border-2 border-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:border-cyan-400 peer-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] after:shadow-md peer-checked:after:shadow-cyan-200/50"></div>
              <span className="ml-3 text-gray-200 select-none">Modified</span>
            </label>
          </div>
          <input type="text" placeholder="Type" id="Type" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required />
          <input type="text" placeholder="Make" id="Make" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required />
          <input type="number" placeholder="Mileage" id="Mileage" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" required />
          <div className="relative w-full">
            <input type="color" id="color" className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 p-1 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required onChange={(e) => {
              const colorInput = document.getElementById('colorText');
              if (colorInput) {
                colorInput.value = e.target.value.toUpperCase();
              }
            }} />
            <input type="text" id="colorText" defaultValue="#000000" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-16 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" readOnly />
          </div>
          <div className="relative w-full">
            <select id="fuelType" className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required>
              <option value="" className="bg-gray-800">Select Fuel Type</option>
              <option value="petrol" className="bg-gray-800">Petrol</option>
              <option value="diesel" className="bg-gray-800">Diesel</option>
              <option value="electric" className="bg-gray-800">Electric</option>
              <option value="electric" className="bg-gray-800">Hybrid</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <div className="relative w-full">
            <select id="condition" className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required>
              <option value="" className="bg-gray-800">Select Condition</option>
              <option value="new" className="bg-gray-800">New</option>
              <option value="used" className="bg-gray-800">Used</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <div className="relative w-full">
            <select id="Transmission" className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required>
              <option value="" className="bg-gray-800">Select Transmission</option>
              <option value="auto" className="bg-gray-800">Auto</option>
              <option value="manual" className="bg-gray-800">Manual</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300">
            <div className="flex items-center">
              <p className="text-gray-200 font-semibold text-lg">Images</p>
              <span className="font-normal text-gray-400 ml-2 text-sm">The first image will be the cover (max 6)</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-800/50 text-gray-200 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-700/50 hover:border-cyan-500 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choose Images
                <input onChange ={(e)=> setFiles(e.target.files)}  type="file" id="images" accept="image/*" multiple className="hidden" />
              </label>
              <button type = 'button' disabled={uploading} onClick={handleImageSubmit} className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                {uploading ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    </div>
                    <span className="opacity-0">Uploading...</span>
                  </>
                ) : 'Upload'}
              </button>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            <div className={`transform transition-all duration-300 flex justify-center items-center ${ImageUploadError ? 'translate-y-0 -translate-x-1 opacity-100' : '-translate-y-2 opacity-0'}`}>
              <p className="text-center mt-5 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400 font-medium shadow-lg shadow-red-500/10 animate-pulse">
                {ImageUploadError}
              </p>
            </div>
            <div className="flex gap-4 flex-wrap mt-4">
              {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div key={url} className="relative group animate-fade-in">
                  <div className="relative">
                    <img 
                      src={url} 
                      alt='listing image' 
                      className="w-40 h-40 object-cover rounded-lg border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600/80 transform hover:scale-110 active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="col-span-2 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">Submit</button>
          
        </form>
      </div>
    </main>
  )
}
