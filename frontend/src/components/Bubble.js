import { useState } from "react";

const Bubble = ({ bubbleState, setBubbleState }) => {
    return (
        <>
            <div className="bubble-square"></div>

            <div className="bubble-wrap">
                {bubbleState === "waiting" &&
                    <div className="bubble-content">Get my attention with "Hey Hoo"</div>
                }
                { bubbleState === "listening" &&
                    <div className="bubble-content"></div>
                }
            </div>
        </>
    )
};

export default Bubble;