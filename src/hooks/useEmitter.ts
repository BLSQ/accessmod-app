import { useEffect } from "react";

type EventElement = HTMLElement | Window;

export const useEmitter = <T = any>(
  eventName: string,
  element: EventElement = window
) => {
  const callEvent = (data?: T) => {
    const event = new CustomEvent(eventName, { detail: data });

    element.dispatchEvent(event);
  };

  return callEvent;
};

export const useListener = <T = any>(
  eventName: string,
  onEvent: (e: CustomEvent<T>) => void,
  element: EventElement = window,
  options: boolean | AddEventListenerOptions = {}
) => {
  useEffect(() => {
    if (typeof onEvent === "function") {
      const handleSignal = (e: Event) => {
        onEvent(e as CustomEvent);
      };

      element.addEventListener(eventName, handleSignal, options);

      return () =>
        element.removeEventListener(eventName, handleSignal, options);
    }
  }, [element, eventName, onEvent, options]);
};
