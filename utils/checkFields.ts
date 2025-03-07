export function checkFields(product: any) {
  for (const [, value] of Object.entries(product)) {
    if (!value) {
      return false;
    }
  }
}
