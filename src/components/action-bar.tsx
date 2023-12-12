import { FaRegSquare, FaLock, FaTrashAlt } from "react-icons/fa"; // Import the icons you want to use
import { GiStraightPipe } from "react-icons/gi";
import p5 from "p5";
import { Action } from "../core/types/actions";
interface ActionBarProps {
  p5Canvas?: p5;
  setCommandAction: (action: Action) => void;
}
const ActionBar: React.FC<ActionBarProps> = (props) => {
  const handleButtonClick = (action: Action) => {
    props.setCommandAction(action);
    // executeCommand(command);
    if (props.p5Canvas) {
      const x = props.p5Canvas.draw;
      switch (action) {
        case "line":
          props.p5Canvas.draw = () => {
            console.log("line");
            props.p5Canvas?.stroke(0);
            if (props.p5Canvas?.mouseIsPressed === true) {
              props.p5Canvas?.line(
                props.p5Canvas?.mouseX,
                props.p5Canvas?.mouseY,
                props.p5Canvas?.pmouseX,
                props.p5Canvas?.pmouseY
              );
            }
          };
          break;
        case "rectangle":
          props.p5Canvas.draw = () => {
            console.log("rectangle");
            props.p5Canvas?.stroke("red");
            if (props.p5Canvas?.mouseIsPressed === true) {
              props.p5Canvas?.line(
                props.p5Canvas?.mouseX,
                props.p5Canvas?.mouseY,
                props.p5Canvas?.pmouseX,
                props.p5Canvas?.pmouseY
              );
            }
          };
          break;
        default:
          props.p5Canvas.draw = x;
          break;
      }
    }
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
