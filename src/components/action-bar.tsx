import { FaRegSquare, FaLock, FaTrashAlt } from "react-icons/fa"; // Import the icons you want to use
import { GiStraightPipe } from "react-icons/gi";

const ActionBar: React.FC<{ setDrawingAction: (action: string) => void }> = ({ setDrawingAction }) => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-3 p-4 bg-gray-200 rounded-b-2xl">
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setDrawingAction("line")}
          title="Create Line"
        >
          <GiStraightPipe />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setDrawingAction("rectangle")}
          title="Create Rectangle"
        >
          <FaRegSquare />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setDrawingAction("lock")}
          title="Lock Selection"
        >
          <FaLock />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setDrawingAction("delete")}
          title="Delete Selected"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
