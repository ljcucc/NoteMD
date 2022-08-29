import {LitElement, html, css} from '/lib/lit.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 

import "/src/components/Icons.js";

class IconButton extends LitElement{
  static properties = {
    name: {type: String},
    dark: {type: Boolean}
  };

  static styles = css`

    .menu-button{
      width: 50px;
      height: 50px;
      display: flex;
      align-items:center;
      justify-content:center;
      margin-top: 2.5px;
      /* margin-right: 8px; */
      border-radius: 50%;
      transition: background-color 0.35s;
      cursor: pointer;
      user-select: none;
      outline: none;
      border: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .dark{
      color: white !important;
    }
    .menu-button:hover{
      background-color: rgba(0,0,0,0.15);
    }
    .menu-button:active{
      background-color: rgba(0,0,0,0.35);
    }
    .menu-button.dark:hover{
      background-color: rgba(255,2552,255,.15) !important;
    }
    .menu-button.dark:active{
      background-color: rgba(255,255,255,.35) !important;
    }
  `;

  constructor(){
    super();
    this.name = ""; // default value
    this.dark = false;
  }

  onClick(){
    // console.log("on click");
    // this.dispatchEvent(new Event('click'));
  }

  render(){
    return html`
      <div class="menu-button${classMap({
        dark:this.dark
      })}" @click="${this.onClick}">
        <material-icons color="${this.dark? "white": "black"}" name="${this.name}">${this.name}</material-icons>
      </div>
    `;
  }
}

customElements.define("icon-button", IconButton);