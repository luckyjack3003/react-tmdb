import React, {SFC} from 'react'
import {History} from 'history';
import './Card.css'
import {withRouter} from "react-router-dom";

type Props = {
    movieID: number,
    poster_path: string,
    vote_average: number,
    overview: string,
    title: string,
    release_date: string,
    history: History,
    backdrop_path: string,
}

const Card: SFC<Props> = ({movieID, poster_path, vote_average, overview,  title, release_date, backdrop_path, history}) => {

    let rating_className='';
    let rating=Math.round(vote_average*10);
    if(rating>=80){
        rating_className='card__high__rating';
    }else if(rating>=60 && rating<80){
        rating_className='card__middle__rating';
    }else{
        rating_className='card__low__rating';
    }
    return (
        <div className="card-item">
            <div className="card-item-gallery">
                <a onClick={() => {
                    history.push(`/movie/${movieID}`, {query: {poster_path, release_date, overview, title, backdrop_path}});
                }}><img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img" alt=""/></a>
                <span className={`card_rating ${rating_className}`}>{rating+'%'}</span>
            </div>

            <div className="card-title">{title}</div>
            <div className="card-date">{release_date}</div>

        </div>
    )
}

export default withRouter(Card);