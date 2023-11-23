import './App.css';
import {ethers, parseUnits} from "ethers";
import NewsFeedABI from "./NewsFeedABI.json";
import {useState} from "react";

function App() {
    const id = 1;
    const [score, setScore] = useState("score");
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

    const makePost = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const newsFeed = new ethers.Contract(
            "0x7a80CA1738092622E3f4564485e3B3DaBd27F680",
            NewsFeedABI,
            signer
        );
        const amount = parseUnits("500000", "wei");
        console.log(amount.toString());
        await newsFeed.createPost("test", ["test_source1"], { value: amount });
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



    return (
    <div className="App">
      <button onClick={makePost} className="newsFeed">
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
        <button className="sources">
            get sources
        </button>
        <div className="votingButtons">
            <button onClick={upvote} className="upvote">
                upvote
            </button>
            <button className="downvote">
                downvote
            </button>
        </div>
    </div>
  );
}

export default App;
