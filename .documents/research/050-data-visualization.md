# Data Visualization

Study about multiple different visualization techniques: https://doi.org/10.1109/SOSE55356.2022.00011
It focuses more on runtime evaluation of microservices and also debugging, but could be a stronger argument for using d3.js.
The industry heavily leans towards node graphs for presenting microservices.


https://graphviz.org/
Pros:
- Easier to generate PDF/PNG.
- Easier to use because of the DOT notation.
- Provides various customization options (color, font style, layout).
- Can handle large datasets.
- Works in Linux, MacOS and Windows.
- Open Source.

Cons:
- Limited design options (specially layout).
- Requires learning DOT notation.
- Lack of interactive features.
- Requires data preprocessing.

https://d3js.org/
Pros:
- Flexible for various datasets.
- Interactive features like hover, animations, transitions.
- Works in all browsers.
- Large community.

Cons:
- Steep learning curve and good understanding of JavaScript and web technologies.
- Time-consuming when compared to other visualization tools.
- Even thought it works in the browser, some older browsers might not be compatible.
- Requires a lot of code for simple visualization which means code maintenance.
- Limited support for non JavaScript environments.

https://gephi.org/
Pros:
- Easy to use as it provides an GUI.
- Interactive and allows for real time interaction.
- Can handle multiple datasets.

Cons:
- Requires GUI to use.
- Limited in terms of customization options.

https://www.chartjs.org/
Pros:
- Simple and easy-to-use API that requires minimal setup to create charts.
- Various options to customize the charts (color, font style, animation).
- Responsive based on device screen.
- High browser compatibility.
- Large community.

Cons:
- Limited chart types.
- Not suitable for large datasets.
- Has hover effects and tooltips but not great for advanced interactive visualizations.
- Limited advanced design options.

Comparison:
Customizability:
- Graphviz: Limited customization options, suitable for creating static diagrams and graphs.
- D3.js: Highly customizable, suitable for creating custom and interactive visualizations.
- Gephi: Customizable with a range of features, but may have limited design options.
- Chart.js: Customizable with various options for color schemes, font styles, and animation effects.

Ease of use:
- Graphviz: Easy-to-use syntax, accessible to non-experts.
- D3.js: Steep learning curve, requires a good understanding of JavaScript and web technologies.
- Gephi: User-friendly interface, easy to learn for beginners.
- Chart.js: Simple and easy-to-use API, minimal setup required.

Charts available:
- Graphviz: Suitable for creating static diagrams and graphs, with limited support for charts.
- D3.js: Suitable for creating a wide range of charts, including bar charts, line charts, scatterplots, and more.
- Gephi: Suitable for creating network graphs and visualizations.
- Chart.js: Supports common chart types such as line charts, bar charts, pie charts, and more.

Real-time interactivity:
- Graphviz: Limited interactivity options.
- D3.js: Provides advanced interactivity options, such as brushing and zooming, making it suitable for real-time visualizations.
- Gephi: Allows users to interact with graphs and manipulate layouts in real-time.
- Chart.js: Provides basic interactivity features such as hover effects and tooltips.
