import {useEffect, useState} from "react";

export default function NewsFeed() {

    const [contentArray, setContentArray] = useState();
    const [idArray, setIdArray] = useState();
    const [sourceStringArray, setSourceStringArray] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        fetchNews().then((data) => {
            console.log(data)
            setContentArray(data["posts"]);
            setIdArray(data["ids"]);
            setSourceStringArray(data["source"]);
            console.log(contentArray, sourceStringArray, idArray);
            setLoading(false);
        });
    }, []);

    const fetchNews = async () => {
        const response = await fetch("https://acff-103-144-92-180.ngrok-free.app/getAllPosts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        return await response.json();
    }


        if(isLoading) {
           return( <h1>Loading...</h1>);
        } else {
            return (
                <div>
                    <h1>News Feed</h1>
                    <ArticleList posts={contentArray} source={sourceStringArray} ids={idArray}/>
                </div>

            );
        }
}

const ArticleList = ({ posts, source, ids }) => {
    return (
        <div>
            <h1>Article List</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={ids[index]}>
                        <h2>{post}</h2>
                        <p>Sources: {source[index].join(', ')}</p>
                        <p>ID: {ids[index]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
