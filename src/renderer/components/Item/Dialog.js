import React from "react";

export default function Dialog() {
    return (
        <div>
            <p>
                speaker:
                <input type="text" />
            </p>
            <p>
                emotion:
                <input type="number" />
            </p>
            <p>
                line:
                <input type="text" />
            </p>
        </div>
    );
}
