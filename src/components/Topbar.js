import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";

class Topbar extends LitElement{
  static styles = css`
    .appbar {
      height: 60px;
      width: 100vw;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding-inline-start: 5vmin;
      font-family: Helvetica, Arial, sans-serif;
      box-shadow: 0px -5px 0px;
      transition: box-shadow 0.35s;
      top: 0;
      left:0;
      right:0;
      background: rgba(255, 255, 255, 0.5);
      position: sticky;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      
      box-sizing: border-box;
    }
    .appbar a{
      font-size: 18px;
      text-decoration: none;
      color: black;
    }
    .appbar .home{
      font-weight: 800;
      margin-inline-end: 16px;
    }
    .appbar:hover{
      box-shadow: 1px -5px 10px;
    }
  `;

  render(){
    return html`
  <div class="appbar">
    <a href="/" class="home" title="">Voice Programming</a>
    <a href="">Help</a>
    <a href="">Documents</a>
    <a href="">About</a>
  </div>
    `;
  }
}

customElements.define("top-bar", Topbar);