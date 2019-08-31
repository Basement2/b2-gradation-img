import { css, customElement, html, LitElement, property } from 'lit-element';
import MedianCut from 'mediancut';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  @property() colors = 2;
  @property() src = '';

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.addEventListener('load', () => {
      const canvas = this.shadowRoot.querySelector('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      // Get context & ImageData
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const medianCut = new MedianCut(imagedata);
      const iData = medianCut.run(this.colors);
      ctx.putImageData(iData, 0, 0, 0, 0, canvas.width, canvas.height);
    });
    image.src = this.src;
  }

  render() {
    return html`
      <canvas></canvas>
    `;
  }
}
