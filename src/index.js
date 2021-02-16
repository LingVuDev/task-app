import React from 'react';
import ReactDOM from 'react-dom';

const App = () => 'Hello World';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
