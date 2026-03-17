const Toolbar = ({
  addText,
  uploadImage,
  saveDesign,
  finalPrice,
  activeSide,
  setActiveSide,
  undo,
  redo,
  enableDrawing,
  disableDrawing,
  deleteSelected,
  bringForward,
  sendBackward,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-3 sm:p-4 
                    w-full lg:w-64 
                    flex lg:flex-col 
                    gap-3 
                    overflow-x-auto lg:overflow-visible">
      
      <h2 className="hidden lg:block font-semibold text-lg mb-2">
        Tools
      </h2>

      <button
        onClick={addText}
        className="min-w-30 lg:w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Add Text
      </button>

      <input
        type="file"
        accept="image/*"
        className="min-w-37.5 lg:w-full border p-2 rounded"
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      <div className="flex gap-2 min-w-45 lg:w-full">
        <button
          onClick={enableDrawing}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          🎨 Draw
        </button>

        <button
          onClick={disableDrawing}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Stop
        </button>
      </div>

      <div className="flex gap-2 min-w-55 lg:w-full">
        <button
          onClick={deleteSelected}
          className="flex-1 border py-2 rounded text-red-600 hover:bg-red-50 transition"
        >
          Delete
        </button>

        <button
          onClick={bringForward}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Front
        </button>

        <button
          onClick={sendBackward}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>

      <div className="flex gap-2 min-w-40 lg:w-full">
        <button
          onClick={undo}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Redo
        </button>
      </div>

      <div className="flex gap-2 min-w-50 lg:w-full">
        <button
          onClick={() => setActiveSide("front")}
          className={`flex-1 py-2 rounded border ${
            activeSide === "front"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Front
        </button>

        <button
          onClick={() => setActiveSide("back")}
          className={`flex-1 py-2 rounded border ${
            activeSide === "back"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Back
        </button>
      </div>

      <div className="min-w-37.5 lg:w-full border rounded p-2 text-center font-semibold bg-gray-50">
        ₹{finalPrice}
      </div>

      <button
        onClick={saveDesign}
        className="min-w-45 lg:w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Save
      </button>
    </div>
  );
};

export default Toolbar;