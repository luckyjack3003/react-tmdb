import React, {SFC} from 'react'
import {RouteComponentProps, RouteProps} from 'react-router-dom';
import './MovieDetail.css'

type MatchParams = {
    id: string,
}

interface Props extends RouteComponentProps<MatchParams> {
}


const MovieDetail: SFC<Props & RouteProps> = (props) => {
    let poster_path = props.history.location.state.query.poster_path;
    let backdrop_path = props.history.location.state.query.backdrop_path;
    let title = props.history.location.state.query.title;
    let release_date = props.history.location.state.query.release_date;
    let overview = props.history.location.state.query.overview;
    return (
        <section className="movie">
            <div className="movie-header" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${backdrop_path})`}}>
                <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} className="img-responsive movie-poster"
                     alt=""/>
                <span className="movie__previous glyphicon glyphicon-arrow-left" onClick={()=>{
                    props.history.goBack();
                }}/>
            </div>
            <div className="movie__wrapper">
                <div className="movie__content">
                    <div className="movie__content__wrapper">
                        <h2 className="title">{title}</h2>
                        <div><span className="detail_text">{release_date}</span></div>
                        <div><span className="detail_text">{release_date}</span></div>
                    </div>

                </div>
                <div className="movie__detail">
                    <h2 className="movie__detail__header">Overview</h2>
                    <div><span className="movie__detail__overview">{overview}</span></div>
                </div>
            </div>

        </section>
    )

}


export default MovieDetail;
