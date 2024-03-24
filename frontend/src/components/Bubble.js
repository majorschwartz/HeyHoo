const Talk = require("../assets/loop.gif");

const Bubble = ({ bubbleState }) => {
    return (
        <>
            <div className="bubble-square"></div>

            <div className={"bubble-wrap " + bubbleState}>
                {bubbleState === "waiting" &&
                    <div className="bubble-content">Get my attention with "Hey Hoo"</div>
                }
                { bubbleState === "listening" &&
                    <div className="bubble-content">
                        <img src={Talk} alt="talking" />
                    </div>
                }
            </div>
        </>
    )
};

export default Bubble;