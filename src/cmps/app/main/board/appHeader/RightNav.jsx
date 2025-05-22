// === Libs

import { openGlobalModal,closeGlobalModal } from "../../../../../store/actions/app.actions";
import { AddAiModal } from "../side-nave/AddAiModal";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function RightNav({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="right-nav">
            <article className="block main">

                <div className="imgwraper">
                    <img className="full-width-img" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747686603/templates-banner_ormgqe.png" alt="Monday board" />
                </div>
                <p>Boost your workflow in minutes with ready-made templates</p>
                <div className="create-ai-board-btn clickable clear size-40 full-width outlined icon-start i-Robot"
               onClick={() => openGlobalModal(<AddAiModal closeGlobalModal={closeGlobalModal} />)}
                > Create board with AI</div>

            </article>

            <h2>Learn & get inspired</h2>
            <article className="block">
                <img className="cube-badge-img" src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747392296/kbsu10mu7vuzlddlpwng.png" alt="Monday board" />
                <div className="information-box">
                    <h3>Getting started </h3>
                    <p>Learn how sunday.com works</p>

                </div>
            </article>

            <article className="block">
                <img className="cube-badge-img" src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747392351/kyxlmsmyhqutfgemowxr.svg" alt="Monday board" />
                <div className="information-box">
                    <h3>Help center</h3>
                    <p>Learn and get support</p>
                </div>

            </article>
        </section>
    )
}