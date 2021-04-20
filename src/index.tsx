import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const startData = [
  { bgcolor: "#F6522E", labelName: "Здоровье", actTitle: "ЕСТЬ", marginTop: 32 },
  { bgcolor: "#1771F1", labelName: "Жажда", actTitle: "ПИТЬ", marginTop: 12 },
  { bgcolor: "#FF9966", labelName: "Голод", actTitle: "ОТДОХНУТЬ", marginTop: 12 },
  { bgcolor: "#B4B0BE", labelName: "Усталость", actTitle: "РАБОТАТЬ", marginTop: 12 }
];

ReactDOM.render(
  <React.StrictMode>
    <App data={startData} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
