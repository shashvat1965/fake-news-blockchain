import './App.css';
import {ethers} from "ethers";
import NewsFeedABI from "./NewsFeedABI.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function App() {
    const id = 1;
    const [score, setScore] = useState("score");
    const navigate = useNavigate();
    const goToNews = () => navigate("/news-feed");
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
        const source = (await newsFeed.getPost(id))["6"].length;
        console.log(source)
        // setScore(score.toString());
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
        // console.log(score);
        // setScore(score.toString());
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
        // console.log(score);
        // setScore(score.toString());
    }



    return (
    <div className="App">
      <button className="newsFeed" onClick={goToNews}>
        go to news feed
      </button>
        <p className="trustScoreText">
            {score}
        </p>
        <button onClick={getTrustScore} className="trustFactor">
            get trust factor
        </button>
        <p className="sourcesText">
            sources
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
