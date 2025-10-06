import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // tablica sekcji
  const sections = ['dane', 'hobby', 'opis', 'doswiadczenie', 'cele', 'nauka', 'kontakt', 'umiejetnosci'];
  const [wybraneDane, setWybraneDane] = useState(sections[0]); // domyślnie pierwsza sekcja
  const [hide, setHide] = useState(true);
  const [values, setValues] = useState(null); // dane z serwera
  const [activeKey, setActiveKey] = useState(sections[0]); // klucz aktywnej sekcji

  // pobieranie danych z serwera po załadowaniu komponentu
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`http://localhost:5000/${wybraneDane}`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        setValues(data);
      } catch (e) {
        console.error('API error:', e);
        setValues({ błąd: String(e) });
      }
    };
    run();
  }, [wybraneDane]);

  if (values === null) {
    return <p>Ładowanie danych z serwera...</p>;
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <button type="button" onClick={() => setHide(!hide)} id="toggleButton">
            {hide ? 'Pokaż dane' : 'Ukryj dane'}
          </button>
          <h1>Witaj w React!</h1>
        </header>

        {!hide && (
          <main>
  <nav>
    {sections.map((section) => (
      <button
        key={section}
        className={activeKey === section ? 'active' : ''}
        onClick={() => {
          setWybraneDane(section);
          setActiveKey(section);
        }}
      >
        {section}
      </button>
    ))}
  </nav>

  {/* RENDER ROOT NA PODSTAWIE TYPU */}
  {(() => {
    const v = values;
    const isArray = Array.isArray(v);
    const isObject = v !== null && typeof v === 'object' && !isArray;

    if (isArray) {
      return (
        <section id="root-array">
          <ul>
            {v.map((item, idx) => <li key={idx}>{String(item)}</li>)}
          </ul>
        </section>
      );
    }

    if (isObject) {
      return (
        <>
          {Object.entries(v).map(([key, val]) => {
            const valIsArray = Array.isArray(val);
            const valIsObject = val !== null && typeof val === 'object' && !valIsArray;
            const valIsPrimitive = !valIsArray && !valIsObject;

            return (
              <section key={key} id={key}>
                <h2>{key}</h2>

                {valIsArray && (
                  <ul>
                    {val.map((item, idx) => <li key={idx}>{String(item)}</li>)}
                  </ul>
                )}

                {valIsObject && (
                  <ul>
                    {Object.entries(val).map(([k, v2]) => (
                      <li key={k}>
                        <span>{k}: </span>
                        {Array.isArray(v2) ? v2.join(', ') : (v2 && typeof v2 === 'object') ? JSON.stringify(v2) : String(v2)}
                      </li>
                    ))}
                  </ul>
                )}

                {valIsPrimitive && <p>{String(val)}</p>}
              </section>
            );
          })}
        </>
      );
    }

    // PRYMITYW (string/number/bool/null/undefined) NA ROOT
    return (
      <section id="root-primitive">
        <p>{String(v)}</p>
      </section>
    );
  })()}
</main>

        )}
      </div>
    </>
  );
}

export default App;
