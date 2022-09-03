import {LitElement, html, css, until} from '/lib/lit.min.js';

class BackendStrategyHint extends LitElement {
  static styles = css`
    .widget{
      margin: 30px 0 !important;
      background: rgb(242, 246, 252);
      /* background: rgb(226, 235, 248); */
      border-radius: 10px;
      padding: 16px 24px;
      color: rgb(48, 75, 114);
      box-sizing:unset;
      box-sizing: border-box;
      font-size: 16px;
      font-family: Helvetica, Arial, sans-serif;
    }
    a{
      color: rgb(65, 138, 223);
      /* color: rgb(255, 203, 32); */
      text-decoration: none;
    }

    a:hover{
      text-decoration: underline;
    }

  `;

  render(){
    return html`
    <div class="widget">
      ⚠️ This strategy still in beta! and reqiured a MDNote-server hosted on public or a reachable IP that you can connect.
      learn more about md-server here: <a href="https://github.com/ljcucc/NoteMD-server" target="_blank" rel="noopener noreferrer">[ notemd-server on github ]</a>
    </div>
    `;
  }
}

customElements.define("backend-strategy-hint", BackendStrategyHint);