// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

function App() {
  const [figura, setFigura] = useState('');
  const [medidas, setMedidas] = useState({});
  const [resultado, setResultado] = useState('');
  const [formula, setFormula] = useState('');
  const [proceso, setProceso] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  const calcular = () => {
    let res = '';
    let form = '';
    let proc = [];
    let plot = [];
    let lay = {};

    switch (figura) {
      case 'cuadrado':
        { const l = medidas.lado || 0;
        res = `Perímetro: ${(4 * l).toFixed(2)}, Área: ${(l * l).toFixed(2)}`;
        form = 'Perímetro = 4 * lado, Área = lado²';
        proc = [
          `Lado = ${l}`,
          `Perímetro = 4 * ${l} = ${(4 * l).toFixed(2)}`,
          `Área = ${l} * ${l} = ${(l * l).toFixed(2)}`
        ];
        plot = [
          {type: 'scatter', x: [0, l, l, 0, 0], y: [0, 0, l, l, 0], mode: 'lines+markers', name: 'Cuadrado'}
        ];
        lay = {
          width: 600, height: 400,
          title: 'Cuadrado',
          xaxis: {scaleanchor: "y", scaleratio: 1},
          yaxis: {scaleanchor: "x", scaleratio: 1}
        };
        break; }
      case 'rectangulo':
        { const largo = medidas.largo || 0;
        const ancho = medidas.ancho || 0;
        res = `Área: ${(largo * ancho).toFixed(2)}`;
        form = 'Área = largo * ancho';
        proc = [
          `Largo = ${largo}`,
          `Ancho = ${ancho}`,
          `Área = ${largo} * ${ancho} = ${(largo * ancho).toFixed(2)}`
        ];
        plot = [
          {type: 'scatter', x: [0, largo, largo, 0, 0], y: [0, 0, ancho, ancho, 0], mode: 'lines+markers', name: 'Rectángulo'}
        ];
        lay = {
          width: 600, height: 400,
          title: 'Rectángulo',
          xaxis: {scaleanchor: "y", scaleratio: 1},
          yaxis: {scaleanchor: "x", scaleratio: 1}
        };
        break; }
      case 'circulo':
        { const r = medidas.radio || 0;
        res = `Área: ${(Math.PI * r * r).toFixed(2)}`;
        form = 'Área = π * radio²';
        proc = [
          `Radio = ${r}`,
          `Área = π * ${r}² = ${(Math.PI * r * r).toFixed(2)}`
        ];
        const t = Array.from({length: 100}, (_, i) => i * 2 * Math.PI / 99);
        plot = [
          {type: 'scatter', x: t.map(angle => r * Math.cos(angle)), y: t.map(angle => r * Math.sin(angle)), mode: 'lines', name: 'Círculo'}
        ];
        lay = {
          width: 600, height: 400,
          title: 'Círculo',
          xaxis: {scaleanchor: "y", scaleratio: 1},
          yaxis: {scaleanchor: "x", scaleratio: 1}
        };
        break; }
      case 'cubo':
        { const lc = medidas.lado || 0;
        res = `Volumen: ${(lc * lc * lc).toFixed(2)}`;
        form = 'Volumen = lado³';
        proc = [
          `Lado = ${lc}`,
          `Volumen = ${lc} * ${lc} * ${lc} = ${(lc * lc * lc).toFixed(2)}`
        ];
        plot = [
          {type: 'scatter3d', x: [0,lc,lc,0,0,0,lc,lc,0,0,lc,lc,0,0,lc,lc], y: [0,0,lc,lc,0,0,0,lc,lc,0,0,lc,lc,0,0,lc], z: [0,0,0,0,0,lc,lc,lc,lc,0,0,0,0,lc,lc,lc], mode: 'lines', name: 'Cubo'}
        ];
        lay = {width: 600, height: 400, title: 'Cubo'};
        break; }
      case 'cilindro':
        { const rc = medidas.radio || 0;
        const h = medidas.altura || 0;
        res = `Volumen: ${(Math.PI * rc * rc * h).toFixed(2)}`;
        form = 'Volumen = π * radio² * altura';
        proc = [
          `Radio = ${rc}`,
          `Altura = ${h}`,
          `Volumen = π * ${rc}² * ${h} = ${(Math.PI * rc * rc * h).toFixed(2)}`
        ];
        const theta = Array.from({length: 50}, (_, i) => i * 2 * Math.PI / 49);
        const x = theta.map(angle => rc * Math.cos(angle));
        const y = theta.map(angle => rc * Math.sin(angle));
        const z1 = Array(50).fill(0);
        const z2 = Array(50).fill(h);
        plot = [
          {type: 'scatter3d', x: x.concat(x), y: y.concat(y), z: z1.concat(z2), mode: 'lines', name: 'Cilindro'},
          {type: 'scatter3d', x: x, y: y, z: z1, mode: 'lines', name: 'Base inferior'},
          {type: 'scatter3d', x: x, y: y, z: z2, mode: 'lines', name: 'Base superior'}
        ];
        lay = {width: 600, height: 400, title: 'Cilindro'};
        break; }
      default:
        res = 'Seleccione una figura';
    }

    setResultado(res);
    setFormula(form);
    setProceso(proc);
    setPlotData(plot);
    setLayout(lay);
  };

  return (
    <div className="App">
      <h1>Calculadora de Figuras Geométricas</h1>
      <select value={figura} onChange={(e) => setFigura(e.target.value)}>
        <option value="">Seleccione una figura</option>
        <option value="cuadrado">Cuadrado</option>
        <option value="rectangulo">Rectángulo</option>
        <option value="circulo">Círculo</option>
        <option value="cubo">Cubo</option>
        <option value="cilindro">Cilindro</option>
      </select>
      {figura === 'cuadrado' && (
        <input type="number" placeholder="Lado" onChange={(e) => setMedidas({lado: parseFloat(e.target.value)})} />
      )}
      {figura === 'rectangulo' && (
        <>
          <input type="number" placeholder="Largo" onChange={(e) => setMedidas({...medidas, largo: parseFloat(e.target.value)})} />
          <input type="number" placeholder="Ancho" onChange={(e) => setMedidas({...medidas, ancho: parseFloat(e.target.value)})} />
        </>
      )}
      {figura === 'circulo' && (
        <input type="number" placeholder="Radio" onChange={(e) => setMedidas({radio: parseFloat(e.target.value)})} />
      )}
      {figura === 'cubo' && (
        <input type="number" placeholder="Lado" onChange={(e) => setMedidas({lado: parseFloat(e.target.value)})} />
      )}
      {figura === 'cilindro' && (
        <>
          <input type="number" placeholder="Radio" onChange={(e) => setMedidas({...medidas, radio: parseFloat(e.target.value)})} />
          <input type="number" placeholder="Altura" onChange={(e) => setMedidas({...medidas, altura: parseFloat(e.target.value)})} />
        </>
      )}
      <button onClick={calcular}>Calcular</button>
      <div className="resultado">
        <p>{resultado}</p>
        <p className="formula">Fórmula: {formula}</p>
        <div className="proceso">
          {proceso.map((paso, index) => (
            <p key={index}>Paso {index + 1}: {paso}</p>
          ))}

return (
    <div className="App">
      <h1>Calculadora de Figuras Geométricas</h1>
      {/* ... (el resto del contenido permanece sin cambios) */}
      
      <div className="footer-info">
        <p>Ciro Montes</p>
        <p>Análisis y Desarrollo de Software</p>
        <p>Sena septiembre 2024</p>
        <p>Ficha 2977501</p>
      </div>
    </div>
  );
        </div>
      </div>
      {plotData.length > 0 && (
        <Plot
          data={plotData}
          layout={layout}
        />
      )}
    </div>
  );
}

export default App;