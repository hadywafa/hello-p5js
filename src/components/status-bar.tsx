import { Action } from "../core/types/actions";

interface StatusBarProps {
  commandAction?: Action;
  selectionLocked?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ commandAction, selectionLocked }) => {
  return (
    <div className="fixed bottom-0 w-full px-4 py-2 text-gray-900 bg-gray-400">
      {commandAction ? `Currently drawing: ${commandAction}` : "Select a drawing tool to begin."}
      {selectionLocked && <span> Selection Locked</span>}
    </div>
  );
};

export default StatusBar;
