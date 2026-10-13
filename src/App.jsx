import { useState } from 'react'
import Header from './components/Header'
import Song from './components/Song'
import './App.css'

const songs = [
  {
    id: 'blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    cover: './images/blinding-lights.svg',
    coverAlt: 'Ilustración de una ciudad nocturna con un sol rojo y luces azules.',
  },
  {
    id: 'save-your-tears',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
    cover: './images/save-your-tears.svg',
    coverAlt: 'Ilustración de un atardecer naranja con ondas musicales violetas.',
  },
  {
    id: 'as-it-was',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: '2:47',
    cover: './images/as-it-was.svg',
    coverAlt: 'Ilustración geométrica rosa y amarilla con un círculo azul.',
  },
]

function LibraryPage() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase('es-MX')
  const visibleSongs = songs.filter((song) =>
    [song.title, song.artist, song.album].some((value) =>
      value.toLocaleLowerCase('en').includes(normalizedQuery),
    ),
  )

  return (
    <main className="content-shell page-content">
      <div className="section-heading">
        <p className="eyebrow">Mi colección</p>
        <h2>Canciones favoritas</h2>
        <p>Una selección para escuchar una y otra vez.</p>
      </div>

      <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="buscar-cancion">Buscar por canción, artista o álbum</label>
        <input
          id="buscar-cancion"
          name="buscar-cancion"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Escribe para filtrar la lista"
        />
      </form>

      <section className="song-grid" aria-label="Canciones de la biblioteca">
        {visibleSongs.map((song) => <Song key={song.id} {...song} />)}
      </section>

      {visibleSongs.length === 0 && (
        <p className="empty-state" role="status">No encontramos canciones con ese texto.</p>
      )}
    </main>
  )
}

function SuggestionPage() {
  const [submittedSong, setSubmittedSong] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = String(formData.get('titulo') || '').trim()
    const artist = String(formData.get('artista') || '').trim()

    if (title && artist) {
      setSubmittedSong({ title, artist })
      event.currentTarget.reset()
    }
  }

  return (
    <main className="content-shell page-content suggestion-page">
      <div className="section-heading">
        <p className="eyebrow">Participa</p>
        <h2>Recomienda una canción</h2>
        <p>Cuéntame qué canción debería formar parte de esta biblioteca.</p>
      </div>

      <form className="suggestion-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="titulo">Nombre de la canción</label>
          <input id="titulo" name="titulo" type="text" autoComplete="off" maxLength="100" required />
        </div>

        <div className="form-field">
          <label htmlFor="artista">Artista o grupo</label>
          <input id="artista" name="artista" type="text" autoComplete="off" maxLength="100" required />
        </div>

        <div className="form-field">
          <label htmlFor="genero">Género musical</label>
          <select id="genero" name="genero" defaultValue="">
            <option value="" disabled>Selecciona un género</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="independiente">Independiente</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="motivo">¿Por qué la recomiendas? (opcional)</label>
          <textarea id="motivo" name="motivo" rows="4" maxLength="300" />
        </div>

        <button className="submit-button" type="submit">Agregar recomendación</button>
      </form>

      {submittedSong && (
        <p className="form-status" role="status" aria-live="polite">
          La recomendación “{submittedSong.title}” de {submittedSong.artist} se agregó a esta demostración.
        </p>
      )}
    </main>
  )
}

function App() {
  const isSuggestionPage = window.location.pathname.endsWith('/sugerencias.html')

  return (
    <div className="app">
      <Header />
      <nav className="site-nav" role="navigation" aria-label="Navegación principal">
        <a href="./index.html" aria-current={!isSuggestionPage ? 'page' : undefined}>Biblioteca</a>
        <a href="./sugerencias.html" aria-current={isSuggestionPage ? 'page' : undefined}>Sugerir canción</a>
      </nav>
      {isSuggestionPage ? <SuggestionPage /> : <LibraryPage />}
      <footer className="site-footer">Biblioteca Musical · Una colección personal</footer>
    </div>
  )
}

export default App
