import React, { useState, useEffect } from 'react'
import Newitem from './Newitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);




    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=US&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40)
        let parsedData = await data.json()
        props.setProgress(80)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - SmashersMedia`
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=US&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    return (
        <>
            <h2 className='my-3 container text-center'>SmashersMedia - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} news</h2>
            <InfiniteScroll className='container'

                dataLength={articles.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="row gap-3 justify-content-center m-auto container">

                    {loading && <Spinner />}
                    {articles.filter((elem => elem.title !== "[Removed]")).map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <Newitem title={element.title !== null ? element.title.slice(0, 40) : "No title"} description={element.description !== null ? `${element.title.slice(0, 80)}...` : "No description"} imgSrc={element.urlToImage} url={element.url} pubDate={element.publishedAt} author={element.author} source={element.source.name} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
        </>
    )
}
News.defaultProps = {
    category: 'general'
}
News.propTypes = {
    category: PropTypes.string,
}

export default News
