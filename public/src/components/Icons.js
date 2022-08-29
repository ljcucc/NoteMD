import {LitElement, html, css} from '/lib/lit.min.js';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class Icons extends LitElement{
  static properties = {
    name: {type: String},
    color: {type: String}
  };

  constructor(){
    super();
    this.name = ""; // default value
    this.color = "black";
  }

  render(){
    return html`
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <i style="${styleMap({
        color: this.color
      })}" class="material-icons">${this.name}</i>
    `;
  }
}

customElements.define("material-icons", Icons);