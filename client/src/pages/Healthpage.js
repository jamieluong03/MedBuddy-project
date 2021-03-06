import React, { useEffect} from "react";
import Healthtab from "../components/Home/NavBar (public)/Healthtab/index";
import NavBeforeLogin from "../components/Home/NavBar (public)/index";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import {ADD_ARTICLES} from "../utils/actions";


function Health() {

    const [state, dispatch] = useStoreContext();
    
    useEffect(() => {
        API.getNews().then(data => {
            // console.log(data);
            let articles = data.data.articles;
            // console.log(articles)
            dispatch({ type: ADD_ARTICLES, articles });
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    console.log('HEALTH STATE', state);

    return (
        <>
       <NavBeforeLogin/>
       <div className="container">
            <h1 className="text-center text-color display-4 font-weight-bold mt-3" id="healthwellness">Recent News in Health and Wellness</h1>
            <br></br>
        <div className="row">
        {state.headline.map(headline =>
        <div className="col-lg-4 col-md-6">
        <Healthtab
        title={headline.title}
        author={headline.author}
        publishedAt={Date(headline.publishedAt)}
        description={headline.description}
        url={headline.url}
        imageUrl={headline.urlToImage}
        />
         </div>

        )}
        </div>
        </div>
        </>
    )
}

export default Health;