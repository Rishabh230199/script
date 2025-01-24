(function () {
  // Step 1: Prevent injecting the component multiple times
  const rootDivId = "my-component-root";
  if (document.getElementById(rootDivId)) return; // Stop if it's already injected

  // Step 2: Create a container div to hold the component
  const rootDiv = document.createElement("div");
  rootDiv.id = rootDivId;
  rootDiv.style.position = "fixed";
  rootDiv.style.bottom = "10px";
  rootDiv.style.right = "10px";
  rootDiv.style.zIndex = "10000";
  rootDiv.style.background = "#fff"; // Optional, to make it visible
  rootDiv.style.border = "1px solid #000";
  rootDiv.style.padding = "10px";
  document.body.appendChild(rootDiv);

  // Step 3: Load React and ReactDOM if they aren't already available
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Step 4: Initialize the component once it's loaded
  function initializeComponent() {
    const { default: MyComponent } = window.MyComponent; // Loaded from UMD build

    // Initialize React component
    const root = ReactDOM.createRoot(document.getElementById(rootDivId));
    root.render(React.createElement(MyComponent));
  }

  // Step 5: Load React and ReactDOM from CDN if not present
  if (!window.React || !window.ReactDOM) {
    loadScript("https://unpkg.com/react@18/umd/react.development.js", () => {
      loadScript(
        "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
        () => {
          loadScript(
            "http://localhost:5000/my-component.umd.js",
            initializeComponent
          ); // Replace with the correct path
        }
      );
    });
  } else {
    loadScript(
      "http://localhost:3000/my-component.umd.js",
      initializeComponent
    ); // Replace with the correct path
  }
})();
