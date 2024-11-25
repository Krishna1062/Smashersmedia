import React, { Component } from 'react'
import noImg from '../noImg.png'

export class Newitem extends Component {

    render() {
        let {title, description, imgSrc, url, pubDate, author, source} = this.props;
        return (
            <div className="card" style={{ minWidth: "11rem", minHeight:'23rem'}}>
                <img src={(imgSrc!==null?imgSrc:noImg)} style={{ maxHeight: "10rem", minHeight:'9rem' }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{(title).length>=40?`${title}...`:title}</h5>
                    <div><small>Publish Date : {pubDate.slice(0, 10)}</small></div>
                    <div><small>Author : {author?author.slice(0,30):'Unknown'}</small></div>
                    <div><small>Source : {source?source.slice(0,30):'Unknown'}</small></div>
                    <p className="card-text">{(description).length>=80?`${description}...`:description}</p>
                    <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-danger">Read more</a>
                </div>
            </div>
        )
    }
}

export default Newitem
