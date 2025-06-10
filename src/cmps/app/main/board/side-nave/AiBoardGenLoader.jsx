import { useState, useEffect } from "react"
import { Loader } from "../../../../reusables/Loader/Loader"

const LOADING_MESSAGES = [
    "🤖 Analyzing your description",
    "💭 Thinking through your idea",
    "📐 Setting up board framework",
    "🗂️  Creating columns",
    "✏️  Generating tasks",
    "🏷️  Assigning labels",
    "🎨 Picking colors ",
    "🔧 Tightening the nuts and bolts",
    "🧹 Tidying up the details",
    "🔍 Giving everything a quick check",
    "🚀 Final touch-ups",
]

export function AiBoardGenLoader() {
    const STEP_HALF_SECONDS = 16
    const [elapsed, setElapsed] = useState(0)

    /* Tick once per second while mounted */
    useEffect(() => {
        const msgInterval = setInterval(() => setElapsed((prev) => prev + 1), 500)
        return () => clearInterval(msgInterval)
    }, [])

    /* Which base message? */
    const msgIndex = Math.min(
        Math.floor(elapsed / STEP_HALF_SECONDS),
        LOADING_MESSAGES.length - 1
    );

    /* Dots animation */
    const dots = ".".repeat((elapsed % 3) + 1);

    return (
        <div className="AiBoardGenLoader">
            <h2 className="loader-title">Generating your board!</h2>
            <p className="loader-subtitle">This may take up to 90 seconds</p>

            <Loader
                size={5}
                width={6}
                color="#0073ea"
                textSize={1.2}
                speed={2}
            />
            <div className="msg-wraper">
                <p>{`${LOADING_MESSAGES[msgIndex]}`}</p>
                <p className="dots">{`${dots}`}</p>
            </div>
        </div>
    );
}