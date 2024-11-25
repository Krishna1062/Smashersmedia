import React, { Component } from 'react'
import Newitem from './Newitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
    static propTypes = {
        category: PropTypes.string,
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            page: 1,
            loading: false
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - SmashersMedia`
    }

    async componentDidMount() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=US&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parsedData = await data.json()
        this.props.setProgress(80)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=US&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false, page: this.state.page + 1 })
    }
    render() {
        return (
            <>
                <h2 className='my-3 container text-center'>SmashersMedia - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} news</h2>
                <InfiniteScroll className='container'

                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length <= this.state.totalResults}
                    loader={this.state.loading && <Spinner />}>
                    <div className="row gap-3 justify-content-center m-auto container">

                        {this.state.loading && <Spinner />}
                        {this.state.articles.filter((elem => elem.title !== "[Removed]")).map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <Newitem title={element.title !== null ? element.title.slice(0, 40) : "No title"} description={element.description !== null ? `${element.title.slice(0, 80)}...` : "No description"} imgSrc={element.urlToImage} url={element.url} pubDate={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
News.defaultProps = {
    category: 'general'
}
export default News
