import {LitElement, html, css} from '/lib/lit.min.js';

import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class DropMenu extends LitElement{

  constructor(){
    super();

    this._state = false;
    this._show = false;
    this.left = false;
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
    }
  }

  static styles = css`
  .menu{
    position: absolute;
    width: 200px;
    /* height: 300px; */
    background: white;
    top: 0;
    right: 24px;
    transition: all 0.25s;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,.15) 0px 0px 20px;
    overflow: hidden;
  }

  .left{
    right: 0px;
    left: -24px;
  }

  .drop-menu.show{
    display: block;
  }
  .menu.open{
    transform: translateX(0%) translateY(0%) scale(1);
  }
  .menu.close{
    /* display: block; */
    transform: translateX(50%) translateY(-50%) scale(0);
  }

  .menu.open.left{
    transform: translateX(0%) translateY(0%) scale(1);
  }
  .menu.close.left{
    /* display: block; */
    transform: translateX(-50%) translateY(-50%) scale(0);
  }


  .drop-menu{
    position: relative;
    display: none;
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
      })
      }" @click="${this.closeMenu}">
        <slot></slot>
      </div>
    </div>
    `;
  }
}

class DropMenuList extends LitElement{
  static properties = {
    list: {
      type: String
    }
  }

  static styles = css`
    .list>.item{
      width: 100%;
      padding: 16px 24px;
      font-size: 16px;
      transition: background 0.35s;
      cursor: pointer;
    }
    .list>.item.split{
      border-bottom: 1px solid rgba(0,0,0,0.35);
    }
    .list>.item:hover{
      background:rgba(0,0,0,.15);
    }
    .list>.item:active{
      background:rgba(0,0,0,.35);
    }
  `;

  itemClicked(id){
    // const id = e.path[0].id;
    return (() => {
      console.log(id)
      const event = new CustomEvent('item-click', {
        detail: { id }
      });
      this.dispatchEvent(event);
    }).bind(this);
  }

  render(){
    let listItems = this.list.split(",");
    let getTitle = (item)=>item.split(";")[0];
    let getType = (item)=>item.split(";")[1];
    return html`
      <div class="list">
        ${listItems.map(item=>html`<div id="${getTitle(item)}" @click="${this.itemClicked(getTitle(item))}" class="item${classMap({
          split: getType(item) || "" == "split"
        })}">${getTitle(item)}</div>`)}
      </div>
    `;
  }
}

customElements.define("drop-menu", DropMenu);
customElements.define("dropmenu-list", DropMenuList);