(function () {
  try {
    console.log("Starting the script...");
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
      try {
        console.log(`Loading script from ${src}`);
        const script = document.createElement("script");
        script.src = src;
        script.onload = callback;
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error(`Error loading script from ${src}:`, error);
      }
    }
    // Step 4: Initialize the component once it's loaded
    function initializeComponent() {
      try {
        console.log("Checking MyComponent:", window.MyComponent);

        if (window.MyComponent) {
          const MyComponent = window.MyComponent.default || window.MyComponent; // Handle default export

          const root = ReactDOM.createRoot(
            document.getElementById("my-component-root")
          );
          root.render(React.createElement(MyComponent)); // Render the React component
          console.log("MyComponent rendered successfully.");
        } else {
          console.error("MyComponent is not defined.");
        }
      } catch (error) {
        console.error("Error initializing the component:", error);
      }
    }

    // Step 5: Load React and ReactDOM from CDN if not present
    if (!window.React || !window.ReactDOM) {
      console.log(
        "React or ReactDOM is not found in the global scope. Loading from CDN..."
      );
      loadScript("https://unpkg.com/react@18/umd/react.development.js", () => {
        loadScript(
          "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
          () => {
            loadScript(
              "http://localhost:5000/my-component.umd.js", // Replace with the correct path
              initializeComponent
            );
          }
        );
      });
    } else {
      console.log("React and ReactDOM are already loaded.");
      loadScript(
        "http://localhost:5000/my-component.umd.js", // Replace with the correct path
        initializeComponent
      );
    }
  } catch (error) {
    console.error("An error occurred in the script:", error);
  }
})();
