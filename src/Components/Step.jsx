import React from "react";

function Step({id, count, content, arr}) {

    return <div className="step">
    <span className={`number ${count === id ? " active" : (count === arr.length && count - 1 === id ? " active" : "")}`}>{id + 1}</span><span className="number-text">STEP {id + 1} <br /> <strong>{content}</strong></span>
    </div>
}


export default Step;