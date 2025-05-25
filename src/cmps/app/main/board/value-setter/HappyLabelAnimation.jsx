// === Libs
import { useEffect, useState } from "react";



// ====== Component ======
// =======================

export function HappyLabelAnimation() {
    // === Consts
    const [animationType, setAnimationType] = useState(null);

    useEffect(() => {
        const states = ['bubbles-animation', 'confettie-animation', 'stars-animation'];
        const randomIndex = Math.floor(Math.random() * states.length);
        setAnimationType(states[randomIndex]);
    }, [])

    const colors = ['#D62839', '#FFD45E', '#FFFFFF']

    // === Effects

    // === Functions

    return (

        <section className={`animations-wrapper ${animationType}`}>

            <section className="bubbles">
                {animationType === 'bubbles-animation' && (
                    <div className="bubbles">
                        {[...Array(24)].map((_, i) => {
                            const size = Math.floor(Math.random() * 6) + 4
                            const left = Math.random() * 100
                            const delay = Math.random() * 2
                            const duration = Math.random() * 5 + 2
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]

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
                        {[...Array(5)].map((_, i) => {
                            const left = Math.random() * 100
                            const delay = Math.random() * 2
                            const duration = Math.random() * 5 +2
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]

                            return (
                                <div
                                    key={`capsule-${i}`}
                                    className="capsule"
                                    style={{
                                        left: `${left}%`,
                                        backgroundColor,
                                        animationDelay: `${delay}s`,
                                        animationDuration: `${duration}s`,

                                    }}
                                />
                            )
                        })}
                    </div>
                )}
            </section>



            <section className='conffeties'>
                {animationType === 'confettie-animation' && (
                    <>
                        {[...Array(18)].map((_, i) => {
                            const size = Math.floor(Math.random() * 6) + 2
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]
                            const left = Math.random() * 100
                            const delay = Math.random() * 3

                            return (
                                <div
                                    key={`confetti-${i}`}
                                    className="confetti"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${left}%`,
                                        animationDelay: `${delay}s`,
                                        backgroundColor
                                    }}
                                />
                            )
                        })}

                        {[...Array(5)].map((_, i) => {
                            const left = Math.random() * 100
                            const delay = Math.random() * 3
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]

                            return (
                                <div
                                    key={`capsule-${i}`}
                                    className="capsule"
                                    style={{
                                        left: `${left}%`,
                                        backgroundColor,
                                        animationDelay: `${delay}s`,
                                    }}
                                />
                            )
                        })}
                    </>
                )}
            </section>



            <section className='stars'>
                {animationType === 'stars-animation' && (
                    <>
                        {[...Array(20)].map((_, i) => {
                            const size = Math.floor(Math.random() * 6) + 3
                            const left = Math.random() * 100
                            const delay = Math.random() * 2
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]
                            return (
                                <div
                                    key={i}
                                    className="star"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${left}%`,
                                        backgroundColor,
                                        animationDelay: `${delay}s`,
                                        '--distance': `${20 + i * 10}px`,
                                    }}
                                />
                            )
                        })}
                        {[...Array(10)].map((_, i) => {
                            const left = Math.random() * 100
                            const delay = Math.random() * 4
                            const backgroundColor = colors[Math.floor(Math.random() * colors.length)]

                            return (
                                <div
                                    key={`capsule-${i}`}
                                    className="capsule"
                                    style={{
                                        left: `${left}%`,
                                        backgroundColor,
                                        animationDelay: `${delay}s`,
                                        '--distance': `${20 + i * 10}px`,

                                    }}
                                />
                            )
                        })}

                    </>
                )}

            </section >

        </section>
    )
}