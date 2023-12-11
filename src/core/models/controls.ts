export interface View {
  x: number;
  y: number;
  zoom: number;
}

export interface ViewPos {
  prevX: number | null;
  prevY: number | null;
  isDragging: boolean;
}

export interface Line {
  type: "line";
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
}

export interface Controls {
  view: View;
  viewPos: ViewPos;
  startLine?: Line | null;
  drawnElements: Line[];
}
