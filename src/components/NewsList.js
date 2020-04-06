import React from "react";
import axios from "axios";

import '../App.css';

class NewsList extends React.Component {
    state = {
        news: [],
        isLoading: true,
        errors: null
    };
    
    getNews() {
        axios
            .get(`https://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=407c0529551e4f43a30236fab2be4290`)
            .then(response =>
                response.data.articles.map(news => ({
                    id: `${news.source.id}`,
                    title: `${news.title}`,
                    author: `${news.author}`,
                    description: `${news.description}`,
                    url: `${news.url}`,
                    urlToImage: `${news.urlToImage}`,
                    publishedAt: `${news.publishedAt}`
                }))
            )
            .then(news => {
                this.setState({
                    news,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getNews();
    }

    render() {
        const { isLoading, news } = this.state;
        return (
            <React.Fragment>
                <div>
                    {!isLoading ? (
                        news.map(newsInfo => {
                            const { id, title, author, description, url, urlToImage, publishedAt } = newsInfo;
                            return (
                                <div className="newsContainer">
                                    <div className ="newsCard" key={id}>
                                        <div className="newsRow">
                                            <div className="newsImageContainer">
                                                <img width="400px" height="260px" src={urlToImage}></img>
                                            </div>
                                            <div className="newsTextContainer">
                                                <h2>{title}</h2>
                                                <div className="menuSmallText">
                                                    <p>{author} • Published {publishedAt}</p>
                                                </div>
                                                <div className="menuMedText">
                                                    <p>{description}</p>
                                                </div>
                                                <a target="_blank" rel="noopener noreferrer" href={url}>Read More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default NewsList;