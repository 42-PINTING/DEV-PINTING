import setBasicPen from '@/app/painting/_component/_utils/setBasicPenTool';
import {
  panningTool,
  disablePanningTool,
} from '@/app/painting/_component/_utils/panningTool';
import selectionTool from '@/app/painting/_component/_utils/selectionTool';

export const Pen = {
  basic: setBasicPen,
};

export const Tool = {
  pen: Pen,
  selection: selectionTool,
  panning: panningTool,
  disablePanning: disablePanningTool,
};
