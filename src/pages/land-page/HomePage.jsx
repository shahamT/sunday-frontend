
// === Style

import { useState } from "react"
import { useSelected } from "../../hooks/useSelected"

// === Services

// === Actions

// === React

// === Imgs

// === Child Components


// ====== Component ======
// =======================

export function HomePage() {
    const { selected, isSelected, select, } = useSelected(null)

    return (
        <section className="HomePage">

            <section className="hero">
                <div className="main-section-wraper">
                    <div className="sunday-work-platform-logo">
                        <img className="monday-logo-icon" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746718734/monday_logo_icon_dumn0r.png" alt="" />
                        <h1 className="logo-title"><span className="bold">sunday</span><span className="regular"> work platform</span></h1>

                    </div>
                    <h2 className="title">Made for work, <br /> designed to love</h2>
                    <h3 className="leading-text">Streamline workflows, gain clear visibility across teams, and empower smarter decisions with AI seamlessly woven into your work.</h3>

                    <div className="clickable land-page primary full size-49 icon-end i-MoveArrowRightNarrow">Get Started</div>

                    <p className="reassurance-text">No credit card needed &nbsp; ✦ &nbsp; Unlimited time on Free plan</p>

                </div>

                <div className="assets-section-wraper">

                    <div className="asset-selectors-container">

                        <p className="title">What would you like to manage?</p>

                        <div className="selectors-grid">
                            <div className="selector projects" onMouseOver={() => select('projects')} onMouseOut={() => select(null)}>
                                <div className="icon i-Widgets"></div>
                                <p className="asset-title">Projects</p>
                            </div>
                            <div className="selector task" onMouseOver={() => select('task')} onMouseOut={() => select(null)}>
                                <div className="icon i-Baseline"></div>
                                <p className="asset-title">Tasks</p>
                            </div>
                            <div className="selector marketing" onMouseOver={() => select('marketing')} onMouseOut={() => select(null)}>
                                <div className="icon i-Announcement"></div>
                                <p className="asset-title">Marketing</p>
                            </div>
                            <div className="selector design" onMouseOver={() => select('design')} onMouseOut={() => select(null)}>
                                <div className="icon i-HighlightColorBucket"></div>
                                <p className="asset-title">Design</p>
                            </div>
                            <div className="selector crm" onMouseOver={() => select('crm')} onMouseOut={() => select(null)}>
                                <div className="icon i-Academy"></div>
                                <p className="asset-title">CRM</p>
                            </div>
                            <div className="selector software" onMouseOver={() => select('software')} onMouseOut={() => select(null)}>
                                <div className="icon i-Code"></div>
                                <p className="asset-title">Software</p>
                            </div>
                            <div className="selector it" onMouseOver={() => select('it')} onMouseOut={() => select(null)}>
                                <div className="icon i-Keyboard"></div>
                                <p className="asset-title">IT</p>
                            </div>
                            <div className="selector operations" onMouseOver={() => select('operations')} onMouseOut={() => select(null)}>
                                <div className="icon i-Settings"></div>
                                <p className="asset-title">Operations</p>
                            </div>
                            <div className="selector product" onMouseOver={() => select('product')} onMouseOut={() => select(null)}>
                                <div className="icon i-CheckList"></div>
                                <p className="asset-title">Product</p>
                            </div>

                        </div>
                        <div className="clickable land-page primary full size-40 icon-end i-MoveArrowRightNarrow">Get Started</div>
                    </div>

                    <img className="asset-img" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/default-blur_fcwgdv.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'projects' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794824/projects_qlpuzn.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'task' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/Task_fohlys.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'marketing' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/Marketing_dcoazt.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'design' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/Design_dgvzgk.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'crm' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794822/CRM-firstfold-AI_pofpfk.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'software' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/Gantt_ybluod.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'it' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794822/IT_g6sjwh.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'operations' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794821/Operations_og9w0i.avif" alt="" />
                    <img className={`asset-img regular ${selected === 'product' ? 'selected' : ''}`} src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746794822/Product_ntxoov.avif" alt="" />

                </div>
            </section>


        </section >
    )
}