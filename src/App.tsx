import { useEffect, useState } from "react";
import "./App.css";
import StatusBar from "./components/status-bar";
import ActionBar from "./components/action-bar";
import p5 from "p5";
import { Controls } from "./core/models/controls";
import { Action } from "./core/types/actions";
import { Circle } from "./core/models/circle";

function App() {
  const [p5Canvas, setP5Canvas] = useState<p5>();
  const [controls] = useState<Controls>({
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
  });

  useEffect(() => {
    const sketch = (p: p5) => {
      let canvas;
      let circles: Circle[];
      p.setup = () => {
        canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.mouseWheel((e) => Controls.zoom(controls, window.innerWidth, window.innerHeight).worldZoom(e));
        circles = Circle.create(100, p);
      };
      p.draw = () => {
        p.background(100);
        p.translate(controls.view.x, controls.view.y);
        p.scale(controls.view.zoom);
        circles.forEach((circle) => circle.show(p));
      };
      window.addEventListener("resize", () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      });
    };
    const sketchP5 = new p5(sketch);
    setP5Canvas(sketchP5);
    return () => {
      sketchP5.remove();
    };
  }, [controls]);

  //#region sibling-components-communications
  const [commandAction, setCommandAction] = useState<Action>();
  //#endregion
  return (
    <>
      <ActionBar p5Canvas={p5Canvas} setCommandAction={setCommandAction} />
      <div id="canvas"></div>
      <StatusBar commandAction={commandAction} />
    </>
  );
}

export default App;
