export default function CreateListing() {
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
          <input type="text" placeholder="Fuel Type" id="fuelType" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none focus:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" required />
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
                <input type="file" id="images" accept="image/*" multiple className="hidden" />
              </label>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                Upload
              </button>
            </div>
          </div>
          <button type="submit" className="col-span-2 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">Submit</button>
        </form>
      </div>
    </main>
  )
}
