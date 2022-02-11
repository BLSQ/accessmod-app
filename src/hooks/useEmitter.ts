import { useEffect } from "react";

type EventElement = HTMLElement | Window;

export const useEmitter = <T = any>(
  eventName: string,
  element?: EventElement
) => {
  const callEvent = (data?: T) => {
    const event = new CustomEvent(eventName, { detail: data });

    (element || window).dispatchEvent(event);
  };

  return callEvent;
};

export const useListener = <T = any>(
  eventName: string,
  onEvent: (e: CustomEvent<T>) => void,
  element?: EventElement,
  options: boolean | AddEventListenerOptions = {}
) => {
  useEffect(() => {
    if (typeof onEvent === "function") {
      const handleSignal = (e: Event) => {
        onEvent(e as CustomEvent);
      };

      (element || window).addEventListener(eventName, handleSignal, options);

      return () =>
        (element || window).removeEventListener(
          eventName,
          handleSignal,
          options
        );
    }
  }, [element, eventName, onEvent, options]);
};
