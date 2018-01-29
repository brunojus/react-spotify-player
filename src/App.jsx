import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks:[]
        }
    }

    search(){
        const BASE_URL  = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
        var accessToken = 'BQBbHBMbuFyEdGOQD00-RC9nt7UOKOYTgDmYABqd8ZuglG5zjsZ8_ZIyWAxp6uMhqn92V7lPFntPVwBWtFVylFKKiuFU2yvxLlDl-eUb45nO00G9OvVIe2gsMMV6ntYOZrBVyPoujTSKx0vTaKsY70K6Ai_kkTF-x4A'

        var myOptions = {
            method: 'GET', 
            headers:  {
                'Authorization': 'Bearer ' + accessToken
            },
        mode: 'cors',
        cache: 'default'
        };

        fetch(FETCH_URL, myOptions )
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            fetch(FETCH_URL,myOptions)
            .then(response => response.json())
            .then(json => {
                const {tracks} = json;
                this.setState({tracks});
            })
        });
    }

    render(){
        return (
            <div className="App">
                <div className="App-title">Music Master from App</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search an Artist."
                            value={this.state.query}
                            onChange={event => {this.setState({query:event.target.value})}}
                            onKeyPress={event=> {
                                if(event.key === 'Enter'){
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={()=> this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>

                  </FormGroup>

                {
                    this.state.artist !==null
                    ?
                    <div>
                        <Profile 
                            artist={this.state.artist}
                        />
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    : <div></div>
                }
            </div>

        )
    }
}

export default App;