import {useState} from "react";
import {ethers, parseUnits} from "ethers";
import NewsFeedABI from "./NewsFeedABI.json";

export default function CreatePost() {

    const [inputValue, setInputValue] = useState('');
    const [sourceValue, setSourceValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSourceChange = (event) => {
        setSourceValue(event.target.value);
    }

    const inputStyle = {
        width: `${500 + inputValue.length}px`, // Adjust the multiplier as needed
        fontSize: '16px', // Set your base font size
        textAlign: 'center', // Center the text
    };

    const makePost = async () => {
        if(inputValue === '') {
            alert("Please enter the content");
            return;
        }
        if(sourceValue === '') {
            alert("Please enter sources");
            return;
        }
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
        await newsFeed.createPost(inputValue, sourceValue.split(','), { value: amount });
    }


    return (
        <div className="createPostPage">
            <div className="content">
                <input type="text" value={inputValue}
                       onChange={handleInputChange}
                       style={inputStyle} />
                <p> Add content </p>
            </div>
            <div className="sources">
                <input type="text" onChange={handleSourceChange} value={sourceValue} />
                <p> Add sources (separate sources only with comma and no space)</p>
            </div>
            <button className="submitButton" onClick={makePost}>
                Submit
            </button>
        </div>
    )
}

