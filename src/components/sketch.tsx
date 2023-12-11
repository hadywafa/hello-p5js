import React, { useEffect, useState } from "react";
import { Controls, Line } from "../core/models/controls";
import p5 from "p5";
//-----------------
const zoom = (event: any, controls: Controls, p: p5): Controls => {
  const direction = event.deltaY > 0 ? -1 : 1;
  const factor = 0.05;
  const zoom = 1 * direction * factor;

  const wx = (event.clientX - controls.view.x) / (p.width * controls.view.zoom);
  const wy = (event.clientY - controls.view.y) / (p.height * controls.view.zoom);

  controls.view.x -= wx * p.width * zoom;
  controls.view.y -= wy * p.height * zoom;
  controls.view.zoom += zoom;
  return controls;
};
//-----------------
const Sketch: React.FC<{ drawingAction: string }> = ({ drawingAction }) => {
  const controls: Controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
    drawnElements: [], // Array to store drawn elements
  };
  const [control, setControl] = useState<Controls>({
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
    drawnElements: [], // Array to store drawn elements
  });
  useEffect(() => {
    const sketch = (p: p5) => {
      let canvas;

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.mouseWheel((e: any) => {
          const ct = zoom(e, control, p);
          setControl(ct);
        });
      };

      p.draw = () => {
        p.background(225, 255, 255, 0);
        p.translate(controls.view.x, controls.view.y);
        p.scale(controls.view.zoom);

        // Draw all stored elements
        controls.drawnElements.forEach((element) => {
          p.stroke(255, 165, 0);
          if (element.type === "line") {
            p.line(element.startX, element.startY, element.endX ?? 0, element.endY ?? 0);
          }
          // Add more conditions for other types of elements (rectangle, circle, etc.)
        });

        // Draw the line if the start point is set
        if (controls.startLine) {
          p.stroke(255);
          p.line(controls.startLine.startX, controls.startLine.startY, p.mouseX, p.mouseY);
        }
      };

      p.mousePressed = () => {
        if (drawingAction === "line") {
          // Set the starting point of the line
          controls.startLine = {
            startX: (p.mouseX - controls.view.x) / controls.view.zoom,
            startY: (p.mouseY - controls.view.y) / controls.view.zoom,
            type: "line",
          };
        }
      };

      p.mouseReleased = () => {
        if (drawingAction === "line" && controls.startLine) {
          // Store the drawn line
          const drawnLine: Line = {
            type: "line",
            startX: controls.startLine.startX,
            startY: controls.startLine.startY,
            endX: (p.mouseX - controls.view.x) / controls.view.zoom,
            endY: (p.mouseY - controls.view.y) / controls.view.zoom,
          };

          // Add the line to the array of drawn elements
          controls.drawnElements.push(drawnLine);

          // Reset the starting point
          controls.startLine = null;
        }
      };
    };

    const sketchP5 = new p5(sketch);
    return () => {
      sketchP5.remove();
    };
  }, [drawingAction]);

  return <div id="canvas"></div>;
};

export default Sketch;
