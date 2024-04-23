const resetComponents = (event, offsetRef) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  if (typeof event === "function") {
    event([]);
  }
  if (offsetRef && offsetRef.current !== undefined) {
    offsetRef.current = 1;
  }
};

export default resetComponents;
