import { createHooks } from "./hooks";
import {createElement, jsx, render as updateElement} from "./render";

function MyReact() {
  const _render = () => {};
  function render($root, rootComponent) {
    const rootElement = rootComponent();
    $root.innerHTML = createElement(rootElement).outerHTML
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
