import "./DropMenu.js";

import {LitElement, html, css, classMap} from '/lib/lit.min.js';

class SelectorDropMenu extends LitElement{

  constructor(){
    super();

    this._state = false;
    this._show = false;
    this.left 
    this.selector = false;
  }

  static properties = {
    _state: {
      type: Boolean
    },
    _show: {
      type: Boolean
    },
    left: {
      type: Boolean
    },
    selector: { type: Boolean },
  }

  static styles = css`
  .menu{
    position: absolute;
    /* width: 300px; */
    /* height: 300px; */
    background: white;
    top: 0;
    right: 24px;
    transition: all 0.25s;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,.15) 0px 0px 20px;
    overflow: hidden;
    z-index: 10;
  }

  .left{
    right: 0px;
    left: 0px;
  }

  .drop-menu.show{
    display: block;
  }
  .menu.open{
    transform: translateX(0%) translateY(0%) scale(1);
  }
  .menu.close{
    /* display: block; */
    transform: translateX(0%) translateY(-5%) scale(1);
  }

  .menu.open.left{
    transform: translateX(0%) translateY(0%) scale(1);
  }
  .menu.close.left{
    /* display: block; */
    transform: translateX(0%) translateY(-50%) scale(1,0);
  }

  .drop-menu{
    position: relative;
    display: none;
  }

  .menu.selector{
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  `;

  firstUpdated(){
    window.addEventListener("click", e=>{
      if(this._show && this._state) this.closeMenu()
    })
  }

  toggleMenu(){
    if(!this._state) this.openMenu()
    else this.closeMenu()
  }

  closeMenu(){
    this._state = false;
    this._show = false;

    this.dispatchEvent(new Event("close"))
  }

  openMenu(){
    this._show = true;
    setTimeout(()=>{
      this._state = true;
    },10);
  }

  render(){
    return html`
    <div class="drop-menu ${
      classMap({
        show: this._show,
      })
    }">
      <div class="menu ${
      classMap({
        'open': this._state,
        'close':!this._state,
        'left': this.left,
        'selector': this.selector,
      })
      }" @click="${this.closeMenu}">
        <slot></slot>
      </div>
    </div>
    `;
  }
}

class AppSelect extends LitElement{
  static properties = {
    list: { type: Array },
    value: { type: String },
    _open: {type: Boolean},
  };

  constructor(){
    super();
    this.list = [];
    this.value = "Select me";
    this._open = false;
  }

  static styles = css`

    .input{
      background: rgba(0,0,0,0.05);
      border-radius: 10px;
      font-size: 18px;
      padding: 16px;
      outline: none;
      border: none;

      /* width: 300px; */

      margin: 16px 0px 0px 0px;

      border-radius: 10px;
      font-family: Helvetica, Arial, sans-serif;

      transition: background 0.15s, border 0.35s;
      cursor: pointer;
    }

    .input:hover{
      background: rgba(0,0,0,.15);
    }

    .input.open{
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

  `;

  onStartSelect(){
    const dropMenu = this.renderRoot.querySelector("selector-drop-menu");
    this._open = true;
    dropMenu.toggleMenu();
  }

  onSelected(e){
    const detail = e.detail;
    this.value = this.list.filter(item=>item.id == detail.id)[0].id;
    this.dispatchEvent(new CustomEvent("select", {
      detail
    }));
    this._open = false;
  }

  onClose(){
    this._open = false;
  }

  render(){
    return html`
    <div class="input ${this._open?"open": ""}" @click="${this.onStartSelect}">${
      this.list.filter(item=>item.id == this.value)[0]?.title || this.list[0].title
    }</div>
    <selector-drop-menu left=true selector=true @close="${this.onClose}">
      <dropmenu-array @select="${this.onSelected}" .list=${this.list}></dropmenu-array>
    </selector-drop-menu>
    `
  }
}

customElements.define("app-select", AppSelect);
customElements.define("selector-drop-menu", SelectorDropMenu);