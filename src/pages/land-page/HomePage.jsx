
// === Style


// === Services

// === Actions

// === React
import { useState } from "react"
import { useSelected } from "../../hooks/useSelected"
import { useNavigate } from "react-router-dom"

// === Imgs

// === Child Components


// ====== Component ======
// =======================

export function HomePage() {
    const { selected, isSelected, select, } = useSelected(null)
    const navigate = useNavigate()
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

                    <div
                        className="clickable land-page primary full size-49 icon-end i-MoveArrowRightNarrow"
                        onClick={() => navigate('/signup')}
                    >Get Started</div>

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
                        <div
                            className="clickable land-page primary full size-40 icon-end i-MoveArrowRightNarrow"
                            onClick={() => navigate('/signup')}
                        >Get Started</div>
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


            <section className="large-statment-section">

                <div className="title-wraper">
                    <p>Why customers love the</p>
                    <img className="monday-platform-logo" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747734815/sunday-platform_jguk6v.png" />
                </div>

                <p className="statment-text">“...it’s going to do things you didn’t think were possible.”</p>
            </section>


            <section className="products-section">
                <p className="section-title">Products built for <br />every business need</p>

                <div className="subtitle-wraper">
                    <p>Extend the power of the platform with tailored, AI-infused products that fit your exact needs.</p>
                    <img src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747736256/products_1_pfgsmr.png" alt="" className="products-logos" />
                </div>

                <div className="products-grid-wraper">
                    <div className="products-grid">

                        <article className="card card-managment">

                            <div className="card-content">
                                <img src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747736913/WM-icon_qadtdz.avif" alt="" className="card-logo" />
                                <h3 className="card-title">monday work management</h3>
                                <p className="card-subtitle">Drive projects forward with AI-powered clarity</p>
                                <div className="buttons-wraper">
                                    <button className="outlined">Get Started</button>
                                    <button className="underline">Learn more</button>
                                </div>
                            </div>

                        </article>

                        <article className="card card-crm">

                            <div className="card-content">
                                <img src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747737470/CRM_icon_tsw4ct.avif" alt="" className="card-logo" />
                                <h3 className="card-title">monday CRM</h3>
                                <p className="card-subtitle">Free revenue teams to focus on selling</p>
                                <div className="buttons-wraper">
                                    <button className="outlined">Get Started</button>
                                    <button className="underline">Learn more</button>
                                </div>
                            </div>

                        </article>


                        <article className="card card-dev">

                            <div className="card-content">
                                <img src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747737467/Dev_icon_yquxho.avif" alt="" className="card-logo" />
                                <h3 className="card-title">monday dev</h3>
                                <p className="card-subtitle">Accelerate sprints, release impactful products</p>
                                <div className="buttons-wraper">
                                    <button className="outlined">Get Started</button>
                                    <button className="underline">Learn more</button>
                                </div>
                            </div>

                        </article>

                        <article className="card card-service">
                            <video autoPlay muted loop playsInline className="bg-video">
                                <source
                                    src="https://res.cloudinary.com/dqaq55tup/video/upload/v1747737464/card_4_SERVICE_ypdypx.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>

                            <div className="card-content">
                                <img src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747737465/Servce-icon_z954mm.avif" alt="" className="card-logo" />
                                <h3 className="card-title">monday service</h3>
                                <p className="card-subtitle">Deliver exceptional service with AI ticket handling</p>
                                <div className="buttons-wraper">
                                    <button className="outlined">Get Started</button>
                                    <button className="underline">Learn more</button>
                                </div>
                            </div>

                        </article>

                    </div>
                </div>

            </section>

            <footer className="landpage-footer">

                <img className="footer-logo" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747732168/sunday-com-logo_ezd0ht.png" />

                <p className="credits">Created by <a href="https://www.linkedin.com/in/shaham-tamir-bb29431b9/">Shaham Tamir</a> | <a href="https://www.linkedin.com/in/noga-laufer-62850a237/">Noga Laufer</a> | <a href="https://www.linkedin.com/in/dana-ziv-26a2881aa/"> Dana Ziv</a></p>
                <p>Based on <a href="https://monday.com/">monday.com</a></p>
                <p>Final project of <a href="https://www.coding-academy.org/">Coding Academy</a> full stack development course, feb 2025</p>
                <div className="footer-bottom-wraper">
                    <small>All Rights Reserved © sunday.com</small>
                </div>
            </footer>
        </section >
    )
}