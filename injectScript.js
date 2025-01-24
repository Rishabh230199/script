(function () {
  // Step 1: Prevent injecting the component multiple times
  const rootDivId = "my-component-root";
  if (document.getElementById(rootDivId)) {
    console.log("Component is already injected.");
    return; // Stop if it's already injected
  }

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
  console.log("Container div created and appended to body.");

  // Step 3: Load React and ReactDOM if they aren't already available
  function loadScript(src, callback) {
    console.log(`Loading script from ${src}`);
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error(`Failed to load script: ${src}`);
    document.head.appendChild(script);
  }

  // Step 4: Initialize the component once it's loaded
  function initializeComponent() {
    if (window.MyComponent) {
      console.log("MyComponent loaded successfully.");
      const { default: MyComponent } = window.MyComponent; // Loaded from UMD build

      // Initialize React component
      const root = ReactDOM.createRoot(document.getElementById(rootDivId));
      root.render(React.createElement(MyComponent));
      console.log("React component rendered.");
    } else {
      console.error("MyComponent is not defined.");
    }
  }

  // Step 5: Load React and ReactDOM from CDN if not present
  if (!window.React || !window.ReactDOM) {
    console.log(
      "React or ReactDOM is not found in the global scope. Loading from CDN..."
    );
    loadScript(
      "https://unpkg.com/react@18/umd/react.development.js",
      () => {
        loadScript(
          "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
          () => {
            loadScript(
              "http://localhost:5000/my-component.umd.js", // Replace with the correct path
              initializeComponent
            );
          }
        );
      }
    );
  } else {
    console.log("React and ReactDOM are already loaded.");
    loadScript(
      "http://localhost:5000/my-component.umd.js", // Replace with the correct path
      initializeComponent
    );
  }
})();
