import React, { useEffect, useState } from "react";
import { Controls, Line } from "../core/models/controls";
import p5 from "p5";
import { DrawLineCommand } from "../core/services/draw-line-command";
import { Command } from "../core/models/command";
import Rectangle from "../p5/shapes/rectangle";
import Triangle from "../p5/shapes/line-segment";
import LineSegment from "../p5/shapes/line-segment";
import Circle from "../p5/shapes/circle";
//-----------------
// const zoom = (event: any, controls: Controls, p: p5): Controls => {
//   const direction = event.deltaY > 0 ? -1 : 1;
//   const factor = 0.05;
//   const zoom = 1 * direction * factor;

//   const wx = (event.clientX - controls.view.x) / (p.width * controls.view.zoom);
//   const wy = (event.clientY - controls.view.y) / (p.height * controls.view.zoom);

//   controls.view.x -= wx * p.width * zoom;
//   controls.view.y -= wy * p.height * zoom;
//   controls.view.zoom += zoom;
//   return controls;
// };
//-----------------
const Sketch: React.FC<{ commandAction: string; executeCommand: (command: Command) => void }> = ({
  commandAction,
  executeCommand,
}) => {
  const [controls, setControls] = useState<Controls>({
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
    drawnElements: [], // Array to store drawn elements
  });

  useEffect(() => {
    const sketch = (p: p5) => {
      let canvas;
      const shapes: any[] = [];

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.mouseWheel((e: any) => {
          const direction = e.deltaY > 0 ? -1 : 1;
          const factor = 0.05;
          const zoom = 1 * direction * factor;

          const wx = (e.clientX - controls.view.x) / (p.width * controls.view.zoom);
          const wy = (e.clientY - controls.view.y) / (p.height * controls.view.zoom);

          setControls((prevControls) => ({
            ...prevControls,
            view: {
              ...prevControls.view,
              x: prevControls.view.x - wx * p.width * zoom,
              y: prevControls.view.y - wy * p.height * zoom,
              zoom: prevControls.view.zoom + zoom,
            },
          }));
        });
        //#region

        const rectToDrag = new Rectangle(p, 50, 50, 200, 200);
        rectToDrag.dragEnabled = true;
        rectToDrag.fillColor = p.color(80);
        shapes.push(rectToDrag);

        const anotherRectToDrag = new Rectangle(p, 200, 200, 200, 200);
        anotherRectToDrag.dragEnabled = true;
        anotherRectToDrag.fillColor = p.color(120);
        shapes.push(anotherRectToDrag);

        const circle = new Circle(p, 100, 300, 50);
        circle.dragEnabled = true;
        circle.fillColor = p.color(150);
        shapes.push(circle);

        const triangleToDrag = new Triangle(p, 300, 50, 400, 50);
        triangleToDrag.dragEnabled = true;
        triangleToDrag.fillColor = p.color(180);
        shapes.push(triangleToDrag);

        const lineSeg = new LineSegment(p, 50, 450, 150, 350);
        lineSeg.dragEnabled = true;
        lineSeg.strokeColor = p.color(230);
        shapes.push(lineSeg);
        //#endregion
      };

      p.draw = () => {
        p.background(225, 255, 255, 0);
        p.translate(controls.view.x, controls.view.y);
        p.scale(controls.view.zoom);
        shapes.forEach((s) => s.draw());
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
        shapes.filter((s) => s.dragEnabled).find((s) => s.handleMousePressed());
        if (commandAction === "line") {
          // Set the starting point of the line
          const startLine: Line = {
            startX: (p.mouseX - controls.view.x) / controls.view.zoom,
            startY: (p.mouseY - controls.view.y) / controls.view.zoom,
            type: "line",
          };
          setControls((prevControls) => ({
            ...prevControls,
            startLine,
          }));
        }
      };

      p.mouseReleased = () => {
        shapes.filter((s) => s.isDragged).forEach((s) => s.handleMouseReleased());
        if (commandAction === "line" && controls.startLine) {
          // Store the drawn line
          const drawnLine: Line = {
            type: "line",
            startX: controls.startLine.startX,
            startY: controls.startLine.startY,
            endX: (p.mouseX - controls.view.x) / controls.view.zoom,
            endY: (p.mouseY - controls.view.y) / controls.view.zoom,
          };

          // Execute the DrawLineCommand
          const drawLineCommand = new DrawLineCommand(controls, drawnLine);
          executeCommand(drawLineCommand);

          // Reset the starting point
          setControls((prevControls) => ({
            ...prevControls,
            startLine: null,
          }));
        }
      };
      p.mouseDragged = () => {
        shapes.filter((s) => s.isDragged).forEach((s) => s.handleMouseDragged());
      };
    };

    const sketchP5 = new p5(sketch);
    return () => {
      sketchP5.remove();
    };
  }, [commandAction, controls, executeCommand]);

  return <div id="canvas"></div>;
};

export default Sketch;
