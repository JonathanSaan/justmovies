const resetComponents = (event) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  if (typeof event === "function") {
    event([]);
  }
};

export default resetComponents;