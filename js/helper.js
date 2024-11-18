export function findElement(selector, context = document) {
    return context.querySelector(selector);
  }
    