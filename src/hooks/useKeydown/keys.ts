// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
export enum Keys {
  left = "ArrowLeft",
  right = "ArrowRight",
  down = "ArrowDown",
  space = "Space",
  esc = "Escape",
  up = "ArrowUp",
  shiftLeft = "ShiftLeft",
}

export const browserNavigationKeys: Array<Keys> = [
  Keys.left,
  Keys.right,
  Keys.down,
  Keys.up,
  Keys.space,
];
