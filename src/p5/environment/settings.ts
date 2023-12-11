// interface ISettings {
//   seed: number;
//   noise_octaves: number;
//   noise_falloff: number;
// }

// interface IOptionsMetadata {
//   name: string;
//   type: string;
//   default: number;
// }

// interface IDatGuiParams {
//   autoPlace?: boolean;
//   [key: string]: any;
// }

// export class P5JsSettings {
//   static optionsSet: { settings: ISettings };
//   static datGuiContainer: HTMLDivElement;

//   static applySettings(newSettings: ISettings) {
//     this.setSeed(this.optionsSet.settings.seed);
//     noiseDetail(this.optionsSet.settings.noise_octaves, this.optionsSet.settings.noise_falloff);
//   }

//   static optionsMetadata(): IOptionsMetadata[] {
//     return [
//       { name: "seed", type: "integer", default: Math.round(random(1000)) },
//       { name: "noise_octaves", type: "integer", default: 10 },
//       { name: "noise_falloff", type: "float", default: 0.6 },
//     ];
//   }

//   static init() {
//     this.optionsSet = new OptionsSet(this.optionsMetadata());
//     this.applySettings(this.optionsSet.settings);
//     this.logSettings();
//   }

//   static logSettings() {
//     console.log("P5JS Settings: ");
//     console.log(this.optionsSet.settings);
//   }

//   static addDatGui(datGuiParams: IDatGuiParams) {
//     datGuiParams = datGuiParams || {};
//     const datGui = new dat.gui.GUI(datGuiParams);

//     if (datGuiParams.autoPlace === false) {
//       this.datGuiContainer = this.createDatGuiContainer();
//       this.datGuiContainer.appendChild(datGui.domElement);

//       document.addEventListener("keyup", function (event) {
//         if (event.key === "h") {
//           P5JsSettings.toggleDatGuiHide();
//         }
//       });
//     }
//     return datGui;
//   }

//   static toggleDatGuiHide() {
//     if (this.datGuiContainer.style.display === "none") {
//       this.datGuiContainer.style.display = "block";
//     } else {
//       this.datGuiContainer.style.display = "none";
//     }
//   }

//   static createDatGuiContainer() {
//     const container = document.createElement("div");
//     container.setAttribute("id", "datGuiContainer");
//     container.style.position = "absolute";
//     container.style.right = "0px";
//     container.style.bottom = "20px";

//     const label = document.createElement("div");
//     label.style.color = "white";
//     label.style.backgroundColor = "black";
//     label.style.padding = "5px";
//     label.style.font = "11px 'Lucida Grande',sans-serif";
//     label.innerHTML = "Config (Press H to Hide/Show)";
//     container.appendChild(label);

//     document.body.appendChild(container);
//     return container;
//   }

//   static setSeed(seed: number) {
//     this.optionsSet.settings.seed = seed;
//     randomSeed(this.optionsSet.settings.seed);
//     noiseSeed(this.optionsSet.settings.seed);
//   }

//   static getSeed(): number {
//     return this.optionsSet.settings.seed;
//   }
// }
