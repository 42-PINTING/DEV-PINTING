import { fabric } from 'fabric';

const basicPen = (canvas: any) => {
  const pencilBrush = new fabric.PencilBrush(canvas);
  pencilBrush.color = 'black';
  pencilBrush.width = 5;
  canvas.freeDrawingBrush = pencilBrush;
  canvas.isDrawingMode = true;
};

export default basicPen;
