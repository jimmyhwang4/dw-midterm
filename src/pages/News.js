import React from "react";

import Header from "../components/Header";
import NewsList from "../components/NewsList";

function News() {

    return (

        <div className="dataContainer">

            <Header />

            <div className="sectionContainerMain">
                <p><strong>COVID-19 Top Headlines</strong></p>
            </div>

            <NewsList />

        </div>
    );

}

export default News;