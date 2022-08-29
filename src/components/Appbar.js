import {LitElement, html, css} from '/lib/lit.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 

class Appbar extends LitElement{
  static properties = {
    gradiant:{ type: Boolean },
    noBlur: { type: Boolean },
    fixed: { type: Boolean },
    relative: { type: Boolean },
  };

  static styles = css`
    .topbar{
      --shadow-color: rgba(0, 0, 0, 0.35);
      --background: rgba(255,255,255, 1);
      min-height: 60px;
      top: 0;
      left: 0;
      right: 0;
      position: sticky;
      background:var(--background) ;
      padding: 0 1rem;
      display: flex;
      flex-direction: row;
      align-items:center;
      z-index: 1000;
    }
    .blur{
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      --background: rgba(255,255,255, 0.95);
    }
    .gradiant{
      --shadow-color:rgba(0,0,0,0);
      --background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);;
    }
    .noGradiant{
      border-bottom: 1px solid var(--shadow-color);
    }
    .fixed{
      position: fixed !important;
    }
    .relative{
      position: absolute !important;
    }
    .item__end{
      margin-left:auto;
    }

    *{
      font-family: Helvetica, 'Inter', sans-serif;
    }
  `;

  constructor(){
    super();

    this.gradiant = false;
    this.noBlur = false;
    this.fixed = false;
  }

  render(){
    return html`
      <div class="topbar ${classMap({
        gradiant: this.gradiant,
        blur: !this.noBlur,
        noGradiant: !this.gradiant,
        fixed: this.fixed,
        relative: this.relative
      })}">
        <slot name="left"></slot>
        <span class="item__end"></span>
        <slot name="right"></slot> 
      </div>
    `;
  }
}
class TopbarItems extends LitElement{
  static styles = css` 
    .items{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `;

  render(){
    return html`
      <div class="items">
        <slot></slot>
      </div>
    `;
  }
}
class TopbarTitle extends LitElement{
  static properties = {
    title: {
      type: String
    }
  }

  constructor(){
    super();

    this.title = "Title";
  }

  static styles = css`
    .topbar__title{
      font-size: 24px;
      grid-column: 2/8;
    }
  `;
  render(){
    return html`
        <span class="topbar__title">${this.title}</span>
    `
  }
}


customElements.define("app-topbar", Appbar);
customElements.define("appbar-title", TopbarTitle);
customElements.define("appbar-items", TopbarItems);