import './App.css';
import {ethers} from "ethers";
import NewsFeedABI from "./NewsFeedABI.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function App() {
    const [score, setScore] = useState("score");
    const navigate = useNavigate();
    const [sources, setSources] = useState("sources");
    const [id, setId] = useState(1);
    const goToNews = () => navigate("/news-feed");
    const goToCreatePost = () => navigate("/create-post");
    const getTrustScore = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const newsFeed = new ethers.Contract(
            "0x7a80CA1738092622E3f4564485e3B3DaBd27F680",
            NewsFeedABI,
            provider
        );
        const score = await newsFeed.getTrustFactor(id);
        console.log(score);
        setScore(score.toString());
    }

    const getSources = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const newsFeed = new ethers.Contract(
            "0x7a80CA1738092622E3f4564485e3B3DaBd27F680",
            NewsFeedABI,
            provider
        );
        const source = (await newsFeed.getPost(id))["5"];
        let sourceString = "";
        for(let i = 0; i < source.length; i++) {
            sourceString += source[i];
            sourceString += ", ";
        }
        console.log(source)
        setSources(sourceString);
    }

    const upvote = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const newsFeed = new ethers.Contract(
            "0x7a80CA1738092622E3f4564485e3B3DaBd27F680",
            NewsFeedABI,
            signer
        );
        await newsFeed.vote(id, true);
    }

    const downvote = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const newsFeed = new ethers.Contract(
            "0x7a80CA1738092622E3f4564485e3B3DaBd27F680",
            NewsFeedABI,
            signer
        );
        await newsFeed.vote(id, false);
    }

    const handleIdChange = (event) => {
        setId(event.target.value);
    }



    return (
    <div className="App">
        <div className="navigationButtons">
            <button className="newsFeed" onClick={goToNews}>
                go to news feed
            </button>
            <button className="createPost" onClick={goToCreatePost}>
                create post
            </button>
        </div>
        <p> Article id: {id}</p>
        <div>
            <input type="text" value={id} onChange={handleIdChange}/>
        </div>
        <p className="trustScoreText">
            {score}
        </p>
        <button onClick={getTrustScore} className="trustFactor">
            get trust factor
        </button>
        <p className="sourcesText">
            {sources}
        </p>
        <button onClick={getSources} className="sources">
            get sources
        </button>
        <div className="votingButtons">
            <button onClick={upvote} className="upvote">
                upvote
            </button>
            <button onClick={downvote} className="downvote">
                downvote
            </button>
        </div>
    </div>
  );
}

export default App;
