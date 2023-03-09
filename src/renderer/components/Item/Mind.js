import React from "react";

export default function Mind() {
    return (
        <div>
            <p>
                question:
                <input type="text" />
            </p>
            <p>answers:</p>
            <p>
                default_answer:
                <input type="text" />
            </p>
            <p>
                conclusion:
                <input type="checkbox" />
            </p>
        </div>
    );
}
