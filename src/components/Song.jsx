import { Component } from 'react';

class Song extends Component {
  render() {
    const { title, artist, album, duration, cover, coverAlt } = this.props;

    return (
      <article className="song">
        <img className="song-cover" src={cover} alt={coverAlt} lang="es" width="128" height="128" />
        <div>
          <h3><span lang="en">{title}</span></h3>
          <p><strong>Artista:</strong> <span lang="en">{artist}</span></p>
          <p><strong>Álbum:</strong> <span lang="en">{album}</span></p>
          <p><strong>Duración:</strong> {duration}</p>
        </div>
      </article>
    );
  }
}

export default Song;
