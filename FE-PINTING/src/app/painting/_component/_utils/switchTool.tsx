import React, { useEffect } from 'react';
import { Tool } from '@/app/painting/_component/_utils/toolIndex';

interface SwitchToolProps {
  handleToolChange: (selectedTool: string) => void;
  tool: string;
  canvas: fabric.Canvas | null;
}

const SwitchTool: React.FC<SwitchToolProps> = ({
  handleToolChange,
  tool,
  canvas,
}) => {
  useEffect(() => {
    if (!canvas) return;

    switch (tool) {
      case 'pen':
        Tool.disablePanning(canvas);
        Tool.pen.basic(canvas);
        break;
      case 'selection':
        Tool.disablePanning(canvas);
        Tool.selection(canvas);
        break;
      case 'panning':
        canvas.discardActiveObject();
        Tool.panning(canvas);
        break;
      default:
        break;
    }
  }, [tool, canvas]);

  const handleButtonClick = (selectedTool: string) => {
    handleToolChange(selectedTool);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('pen')}>펜</button>
      <button onClick={() => handleButtonClick('selection')}>선택</button>
      <button onClick={() => handleButtonClick('panning')}>이동</button>
    </div>
  );
};

export default SwitchTool;
