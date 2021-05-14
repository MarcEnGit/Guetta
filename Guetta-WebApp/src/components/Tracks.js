import React, {useState, useEffect} from "react";

function Tracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch("/tracks/").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setTracks(jsonRes.tracksList))
    })

    return(
        <div>
            {tracks.map(track => <li>{track}</li>)}
        </div>
    )

}

export default Tracks;