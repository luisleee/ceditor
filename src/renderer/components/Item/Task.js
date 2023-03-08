import React from "react";

export default function Task() {
    return (
        <div>
            <p>
                desc:
                <input type="text" />
            </p>
            <p>
                state:
                <input type="radio" name="task-state" />
                in progress
                <input type="radio" name="task-state" />
                finished
                <input type="radio" name="task-state" />
                failed
            </p>
        </div>
    );
}
