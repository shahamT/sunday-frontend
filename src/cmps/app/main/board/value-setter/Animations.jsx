// === Libs
import { useEffect, useState } from "react";



// ====== Component ======
// =======================

export function Animations({ /* prop1, prop2 */ }) {
    // === Consts
    const [animationType, setAnimationType] = useState(null);

    useEffect(() => {
        const states = ['bubbles-animation', 'confettie-animation', 'stars-animation'];
        const randomIndex = Math.floor(Math.random() * states.length);
        setAnimationType(states[randomIndex]);
    }, [])

    const colors = ["#ff4d4d", "#ffeb3b", "#ffff"]

    // === Effects

    // === Functions

    if (!animationType) return null
    return (

        <section className={`animations-wrapper ${animationType}`}>
            <section className="bubbles">
                {/* <div className="status-picker-example"> */}
                {animationType === 'bubbles-animation' && (
                    <div className="bubbles">
                        {[...Array(16)].map((_, i) => {
                            const size = Math.floor(Math.random() * 6) + 4
                            const left = Math.random() * 100
                            const delay = Math.random() * 2
                            const duration = Math.random() * 5 + 2
                            const bubbleColors = ['#e3f300', '#ffffff', '#f30000', '#ff0000', '#ffff00']
                            const backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)]

                            return (
                                <div
                                    key={i}
                                    className="bubble"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${left}%`,
                                        backgroundColor,
                                        animationDelay: `${delay}s`,
                                        animationDuration: `${duration}s`
                                    }}
                                />
                            )
                        })}
                        <div className="capsule"></div>
                        <div className="capsule"></div>
                    </div>
                )}
            </section>

            <section className='conffeties'>
                {animationType === 'confettie-animation' && (
                    <>
                        {[...Array(18)].map((_, i) => {
                            const size = Math.floor(Math.random() * 6) + 2
                            return (
                                <div
                                    key={`confetti-${i}`}
                                    className="confetti"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                    }}
                                />
                            )
                        })}

                        {[...Array(5)].map((_, i) => {
                            const distance = 20 + i * 10
                            return (
                                <div
                                    key={`capsule-${i}`}
                                    className="capsule"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                        '--distance': `${distance}px`
                                    }}
                                />
                            )
                        })}
                    </>
                )}
            </section>
            <section className='stars'>
                {animationType === 'stars-animation' && (
                    [...Array(15)].map((_, i) => {
                        const size = Math.floor(Math.random() * 6) + 3
                        return (
                            <div
                                key={i}
                                className="star"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                    '--distance': `${20 + i * 10}px`,
                                }}
                            />
                        )
                    })
                )}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="capsule"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                            '--distance': `${20 + i * 10}px`
                        }}
                    />
                ))}

            </section >
            {/* </div> */}

        </section>
    )
}