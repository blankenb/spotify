import React from 'react';
import './HomePage.css';

class Results extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      menuSelected: 'shared'
    }
  }

  selectShared = () => {
    if (this.state.menuSelected !== 'shared') {
      this.setState({ menuSelected: 'shared' });
    }
  }

  selectPlaylist1Recommended = () => {
    if (this.state.menuSelected !== 'p1') {
      this.setState({ menuSelected: 'p1' });
    }
  }

  selectPlaylist2Recommended = () => {
    if (this.state.menuSelected !== 'p2') {
      this.setState({ menuSelected: 'p2' });
    }
  }

  getBrightness = (r, g, b) => {
     // From https://www.w3.org/WAI/ER/WD-AERT/#color-contrast
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
  }

  getRandomColorStyling = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    let brightness = this.getBrightness(r, g, b);
    return { 
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      color: brightness >= 128 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    }
  }

  getSource = () => {
    // In p2 but not p1
    if (this.state.menuSelected !== 'p1') {
    }
    // In p1 but not p2
    else if (this.state.menuSelected !== 'p2') {
    }
    // Shared
    else {
      
    }
  }

  render() {
    const simularityScore = this.props.simularityScore;
    const genres = this.props.sources[this.state.menuSelected].genres;
    const artists = this.props.sources[this.state.menuSelected].artists;
    const songs = this.props.sources[this.state.menuSelected].songs

    // console.log(artists);

    return (
      <div className="stats-wrapper">
        <section id="similarity">
          <h1 className="statistic-name">
            Similarity:&nbsp;
            <span className="statistic-value">{simularityScore}%</span>
          </h1>
        </section>

        <section id="menu">
          <button className={`menu ${this.state.menuSelected === 'shared' ? "selected" : ""}`}
                  onClick={this.selectShared}>
            Shared
          </button>
          <button className={`menu ${this.state.menuSelected === 'p1' ? "selected" : ""}`}
                  onClick={this.selectPlaylist1Recommended}>
            Recommended for {this.props.playlist1.name}
          </button>
          <button className={`menu ${this.state.menuSelected === 'p2' ? "selected" : ""}`}
                  onClick={this.selectPlaylist2Recommended}>
            Recommended for {this.props.playlist2.name}
          </button>
        </section>

        <section id="genres">
          <h2 className="section-name">Genres</h2>
          { genres.length === 0
            ? <div className="no-values">
                { this.state.menuSelected === 'shared' 
                  ? 'No shared genres :('
                  : 'Playlist already shares all genres :)'
                }
              </div>
            : <ul className="statistic-value">
                { genres.map((genre, index) => {
                  return <li key={index} style={this.getRandomColorStyling()}>{genre.name}</li>
                })}
              </ul>
          }
        </section>

        <section id="artists">
          <h2 className="section-name">Artists</h2>

          { artists.length === 0
            ? <div className="no-values">
                { this.state.menuSelected === 'shared' 
                  ? 'No shared artists :('
                  : 'Playlist already shares all artists :)'
                }
              </div>
            : <ul className="statistic-value">
                { artists.map((artist, index) => {
                  return (
                    <li key={index} style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${artist.imageUrl})`}}>
                      <a href={artist.url} target="_blank" className="artist-link">
                        <div className="artist-name-wrapper">
                          <div className="artist-name">
                            {artist.name}
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
          }
        </section>

        <section id="songs">
          <h2 className="section-name">Songs</h2>
          { songs.length === 0
            ? <div className="no-values">
                { this.state.menuSelected === 'shared' 
                  ? 'No shared songs :('
                  : 'Playlist already shares all songs :)'
                }
              </div>
            : <ul className="statistic-value">
                { songs.map((song, index) => {
                  let artistNames = song.artistNames.join(', ');

                  return (
                    <li key={index}>
                      <a href={song.url} target="_blank">
                        <div className="song-wrapper">
                          <div className="song-image" style={{backgroundImage: `url(${song.imageUrl})`}}></div>
                          <div className="song-name">
                            {song.name}
                          </div>
                          <div className="artist-names">
                            {artistNames}
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
          }
        </section>
      </div>
    );
  }
}
export default Results;

