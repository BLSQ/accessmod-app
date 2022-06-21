export function displayErrorAlert(message: string, err?: Error) {
  if (!window) {
    console.warn("displayErrorAlert cannot be called on the server.");
    return;
  }
  const event = new CustomEvent("displayErrorAlert", {
    detail: {
      message,
      type: "error",
      err,
    },
  });

  window.dispatchEvent(event);
}
