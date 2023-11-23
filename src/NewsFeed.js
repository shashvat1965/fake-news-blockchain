import {useEffect} from "react";

export default function NewsFeed() {

    useEffect(() => {

        fetchNews().then((data) => {
            console.log(data);
        });
    }, []);

    const fetchNews = async () => {
        const response = await fetch("https://967a-103-144-92-180.ngrok-free.app", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
        });
        return await response.json();
    }

    return (
        <div className="NewsFeed">
            <p className="newsFeedText">
                news feed
            </p>
        </div>
    )
}
