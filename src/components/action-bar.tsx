import { FaRegSquare, FaLock, FaTrashAlt } from "react-icons/fa"; // Import the icons you want to use
import { GiStraightPipe } from "react-icons/gi";
import { Command } from "../core/models/command";
const ActionBar: React.FC<{
  setCommandAction: (action: string) => void;
  executeCommand: (command: Command) => void;
}> = ({ setCommandAction }) => {
  const handleButtonClick = (action: string) => {
    setCommandAction(action);
    // executeCommand(command);
  };
  return (
    <div className="flex justify-center">
      <div className="flex gap-3 p-4 bg-gray-200 rounded-b-2xl">
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => handleButtonClick("line")}
          title="Create Line"
        >
          <GiStraightPipe />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => handleButtonClick("rectangle")}
          title="Create Rectangle"
        >
          <FaRegSquare />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => handleButtonClick("lock")}
          title="Lock Selection"
        >
          <FaLock />
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => handleButtonClick("delete")}
          title="Delete Selected"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
