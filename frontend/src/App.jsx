import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cvData, setCvData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait, the API relies on proxy or direct call. With docker-compose exposing backend to 4000
    // the frontend normally runs in the browser, so it should fetch from http://localhost:4000/cv
    fetch('http://localhost:4000/cv')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then((data) => {
        setCvData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando CV...</div>;
  if (error) return <div className="error">Error al cargar: {error}</div>;
  if (!cvData) return null;

  return (
    <div className="cv-container">
      <header className="cv-header">
        <img src={cvData.foto} alt={`${cvData.nombre} ${cvData.apellido}`} className="cv-photo" />
        <div className="header-info">
          <h1>{cvData.nombre} {cvData.apellido}</h1>
          <p className="city"><span className="icon">📍</span> {cvData.ciudad}</p>
        </div>
      </header>

      <section className="cv-section">
        <h2>Formación Académica</h2>
        <div className="timeline">
          {cvData.formacion && cvData.formacion.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-year">{item.anio}</div>
              <div className="timeline-content">
                <h3>{item.titulo}</h3>
                <p>{item.institucion}</p>
              </div>
            </div>
          ))}
          {(!cvData.formacion || cvData.formacion.length === 0) && (
            <p>No se encontró información académica.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
