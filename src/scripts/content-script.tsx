import browser from 'webextension-polyfill'
import BigNumber from 'bignumber.js'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../pages/index";

let app_root;
let currentSelection = '0'

browser.runtime.onMessage.addListener((req) => {
  if (req.command === 'convert-number') {
    if (window.getSelection()) {
      currentSelection = window.getSelection()?.toString() || '0'
      showModal()
    }
    return
  }

  console.log('Unknown command', req.command)
})

const styles = `<style>
  .big-n-container {
    font-size: '16px';
    font-family: sans-serif;
    color: rgba(41, 41, 41, 1);
  }

  .big-n-overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2147483647;
    background: rgb(0 0 0 / 55%)
  }

  .big-n-content {
    position: absolute;
    inset: 0px;
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 8px;
    outline: none;
    padding: 20px;
    margin: auto;
    height: 100px;
    width: 600px;
    filter: drop-shadow(3px 5px 30px #000);
    color: rgba(41, 41, 41, 1);
    font-family: sans-serif;
  }

  .big-input {
    width: 200px;
    padding: 4px;
    border: 1px solid #bbb7b7;
    border-radius: 5px;
    font-size: 16px;
    background: rgb(255, 255, 255);
    color: rgba(41, 41, 41, 1);
    outline: none;
  }

  .small-input {
    width: 80px;
    padding: 4px;
    border: 1px solid #bbb7b7;
    border-radius: 5px;
    font-size: 16px;
    background: rgb(255, 255, 255);
    color: rgba(41, 41, 41, 1);
    outline: none;
  }

  .label {
    color: rgba(41, 41, 41, .7);
  }
</style >`


// Create HTML element in the page
const appendRoot = () => {
  const htmlRoot = document.getElementsByTagName('html')[0]
  const element = document.createElement("div")
  element.id = "big-n-root"
  const shadowRoot = element.attachShadow({ mode: 'open' })
  shadowRoot.innerHTML = `${styles}<div id="big-n-container" className="big-n-container"></div>`

  const appRoot = shadowRoot.getElementById("big-n-container")
  htmlRoot.appendChild(element)
  app_root = createRoot(appRoot!);
  hideModal()
}

// Open big-n modal
const showModal = () => {
  app_root.render(<App showModal={true} hideModal={hideModal} currentSelection={currentSelection} />)
}

const hideModal = () => {
  app_root.render(<App showModal={false} hideModal={hideModal} currentSelection={currentSelection} />)
}

appendRoot()
