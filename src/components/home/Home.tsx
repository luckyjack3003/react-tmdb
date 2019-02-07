import React, {Component} from 'react'
import TMDBLogo from '../../assets/tmdb.svg';
import './Home.css'
import Autocomplete from 'react-autocomplete';
import Card from '../commons/Card'
import GlobalParameters from '../utils/globalParameters';
import request from '../utils/request';
import {debounce} from '../utils/deboune';
import {withRouter} from "react-router-dom";
import { History } from 'history';

type TItems = {
    id?: string;
    label?: string;
    poster_path?: string;
    release_date?: string;
    overview?: string;
    title?: string;
    backdrop_path?: string;
}

type Props={
    history : History,
}
const initialState = {
    value: '',
    moveList: new Array(),
    items: new Array(),

};


type State = Readonly<typeof initialState>;

class Home extends Component<Props, State> {
    movieSearch = (value) => {

        if (value) {
            request(`${GlobalParameters.url}/3/search/movie?api_key=${GlobalParameters.api_key}&language=en-US&query=${value}&page=1`, {}).then(({data}) => {

                let items: TItems[] = new Array();
                for (let i = 0; i < data.results.length; i++) {
                    let d: TItems = {};
                    d.id = '' + data.results[i].id;
                    d.label = '' + data.results[i].title;
                    d.poster_path = '' + data.results[i].poster_path;
                    d.release_date = '' + data.results[i].release_date;
                    d.overview = '' + data.results[i].overview;
                    d.title = '' + data.results[i].title;
                    d.backdrop_path = '' + data.results[i].backdrop_path;


                    items.push(d);
                }
                this.setState({items});
            });
        }
    }
    readonly state: State = initialState;

    constructor(props) {
        super(props);

        this.movieSearch = debounce(this.movieSearch, 200);
    }

    componentDidMount() {
        request(`${GlobalParameters.url}/3/movie/popular?api_key=${GlobalParameters.api_key}&language=en-US&page=1`, {}).then(({data}) => {
            this.setState({moveList: data.results})
        });
    }

    render() {

        return (
            <div className="container">
                <div className="logo-container">
                    <img src={TMDBLogo} className="logo" alt="The Movie Database"/>
                    <Autocomplete
                        items={this.state.items}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.label}
                        wrapperStyle={{position: 'relative', display: 'inline-block'}}
                        renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                className={`item ${highlighted ? 'item-highlighted' : 'item-highlighted'}`}
                            >
                                {item.label}
                            </div>
                        }
                        value={this.state.value}
                        onChange={e => {
                            let value = e.target.value;
                            this.setState({value});
                            this.movieSearch(value);
                        }}
                        menuStyle={
                            {
                                borderRadius: '3px',
                                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                background: '#fff',
                                padding: '2px 0',
                                fontSize: '90%',
                                overflow: 'auto',
                                height: '100px',
                                position: 'absolute',
                                left: 0,
                                top: 35
                            }
                        }
                        onSelect={(value,item) => {
                            this.setState({value})

                            this.props.history.push(`/movie/${item.id}`,{query: {poster_path:item.poster_path,
                                release_date:item.release_date,
                                overview:item.overview,
                                title:item.title,
                                backdrop_path:item.backdrop_path
                            }});
                        }
                        }
                    />
                </div>

                <div className="home-content">
                    <div className="title">Popular Movies</div>
                    <div className="movies-list">
                        {this.state.moveList.map(data => <Card key={data.id}
                                                               movieID={data.id}
                                                               poster_path={data.poster_path}
                                                               vote_average={data.vote_average}
                                                               overview={data.overview}
                                                               backdrop_path={data.backdrop_path}
                                                               title={data.title}
                                                               release_date={data.release_date}
                        />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)