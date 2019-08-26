var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import MedianCut from 'mediancut/dist/mediancut.module.js';
import { LitElement, html, css, customElement, property } from 'lit-element';
let MyElement = class MyElement extends LitElement {
    constructor() {
        super(...arguments);
        this.colors = 2;
        this.src = '';
    }
    connectedCallback() {
        super.connectedCallback();
    }
    firstUpdated() {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.addEventListener('load', () => {
            const canvas = this.shadowRoot.querySelector('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            // Get context & ImageData
            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            let imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let medianCut = new MedianCut(imagedata);
            let iData = medianCut.run(this.colors);
            ctx.putImageData(iData, 0, 0, 0, 0, canvas.width, canvas.height);
        });
        image.src = this.src;
    }
    render() {
        return html `
      <canvas></canvas>
    `;
    }
};
MyElement.styles = css `
    :host {
      display: inline-block;
    }
  `;
__decorate([
    property()
], MyElement.prototype, "colors", void 0);
__decorate([
    property()
], MyElement.prototype, "src", void 0);
MyElement = __decorate([
    customElement('my-element')
], MyElement);
export { MyElement };
