import { fabric } from 'fabric';

const setBasicPen = (canvas: any) => {
  const pencilBrush = new fabric.PencilBrush(canvas);
  pencilBrush.color = 'black';
  pencilBrush.width = 5;
  canvas.freeDrawingBrush = pencilBrush;
  canvas.isDrawingMode = true;
};

export default setBasicPen;
