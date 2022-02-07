const { useCallback } = require("react");

interface UseInputKeyDownProps {
  onEscape: () => void;
  onCommandShiftEnter: () => void;
}

function useInputKeyDown({
  onEscape,
  onCommandShiftEnter,
}: UseInputKeyDownProps) {
  return useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      } else if (e.key === "Enter" && (e.shiftKey || e.metaKey)) {
        e.preventDefault();
        onCommandShiftEnter();
      }
    },
    [onEscape, onCommandShiftEnter]
  );
}

export default useInputKeyDown;
