interface StatusBarProps {
  drawingAction: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ drawingAction }) => {
  return (
    <div className="fixed bottom-0 w-full px-4 py-2 text-gray-900 bg-gray-400">
      {drawingAction ? `Currently drawing: ${drawingAction}` : "Select a drawing tool to begin."}
    </div>
  );
};

export default StatusBar;
