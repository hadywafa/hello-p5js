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

export class Controls {
  view!: View;
  viewPos!: ViewPos;
  static zoom(controls: any, width: number, height: number) {
    // function calcPos(x, y, zoom) {
    //   const newX = width - (width * zoom - x);
    //   const newY = height - (height * zoom - y);
    //   return {x: newX, y: newY}
    // }

    function worldZoom(e: any) {
      const { x, y, deltaY } = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;

      const wx = (x - controls.view.x) / (width * controls.view.zoom);
      const wy = (y - controls.view.y) / (height * controls.view.zoom);

      controls.view.x -= wx * width * zoom;
      controls.view.y -= wy * height * zoom;
      controls.view.zoom += zoom;
    }

    return { worldZoom };
  }
}
