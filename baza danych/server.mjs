// package.json: { "type": "module" }
import express from 'express';
import cors from 'cors';
import omnie from './omnie.mjs';

const app = express();
const PORT = 5000;

const ORIGIN = 'http://localhost:5173'; // dokładny origin Vite, bez ukośnika
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options('*', cors({ origin: ORIGIN }));




// helper
const get = () => omnie[0]; // bierz pierwszy obiekt z tablicy

app.get('/dane', (req, res) => {
  const o = get();
  if (!o?.imie || !o?.nazwisko || !o?.wiek || !o?.zawod) {
    return res.status(500).json({ error: 'Brak wymaganych danych w omnie.mjs' });
  }
  res.json({ imie: o.imie, nazwisko: o.nazwisko, wiek: o.wiek, zawod: o.zawod });
});

app.get('/hobby', (req, res) => {
  const o = get();
  if (!Array.isArray(o?.hobby)) return res.status(500).json({ error: 'Brak danych o hobby' });
  res.json(o.hobby);
});

app.get('/opis', (req, res) => {
  const o = get();
  if (!o?.opis) return res.status(500).json({ error: 'Brak danych o opisie' });
  res.json(o.opis);
});

app.get('/doswiadczenie', (req, res) => {
  const o = get();
  if (!o?.doswiadczenie) return res.status(500).json({ error: 'Brak danych o doświadczeniu' });
  res.json(o.doswiadczenie);
});

app.get('/cele', (req, res) => {
  const o = get();
  if (!o?.cele) return res.status(500).json({ error: 'Brak danych o celach' });
  res.json(o.cele);
});

app.get('/nauka', (req, res) => {
  const o = get();
  if (!o?.nauka) return res.status(500).json({ error: 'Brak danych o nauce' });
  res.json(o.nauka);
});

app.get('/kontakt', (req, res) => {
  const o = get();
  if (!o?.kontakt) return res.status(500).json({ error: 'Brak danych o kontakcie' });
  res.json(o.kontakt);
});

app.get('/umiejetnosci', (req, res) => {
  const o = get();
  if (!o?.umiejetnosci) return res.status(500).json({ error: 'Brak danych o umiejętnościach' });
  res.json(o.umiejetnosci);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
})
