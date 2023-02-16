import React from "react";

export default function Words({words, c}) {
    return (<>
        <h1>{words}</h1>
        <h2>{words}</h2>
        <h3>{words}</h3>
        <h4>{words}</h4>
        <button onClick={c}>{words}</button>
    </>);
}

