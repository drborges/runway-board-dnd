import { useState, useRef, useEffect } from "react";

const useInput = initialValue => {
  const ref = useRef();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);

  return {
    value,
    ref,
    onChange: event => setValue(event.target.value)
  };
};

export default useInput;
