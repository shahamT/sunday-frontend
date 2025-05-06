
// === Libs
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';

// === Services

// === Actions

// === Hooks / React
import { Outlet } from "react-router-dom";
import { useRef } from 'react';

// === Imgs

// === Child Components
import { AppHeader } from "../cmps/app/header/AppHeader";
import { AppSideNav } from "../cmps/app/AppSideNav";

// ====== Component ======
// =======================

export function AppLayout({ /* prop1, prop2 */ }) {
    // === Consts
    // const isOpen = useSelector(storeState => storeState.appModule.isSidePanelOpen)
    const isOpen = true
    const contentAreaRef = useRef(null);


    //convert pixels size to precentage
    const containerWidth = window.innerWidth;
    const defaultSize = (400 / containerWidth) * 100;
    const invertedDefault = 100 - defaultSize;
    const minSize = (200 / containerWidth) * 100;
    const maxSize = (700 / containerWidth) * 100;

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="AppLayout">
            <>
                <AppHeader />

                <section ref={contentAreaRef} className={`app-main ${isOpen ? 'side-nav-opened' : ''}`}>

                    <PanelGroup
                        direction="horizontal"
                        autoSaveId="persistence"
                    >
                        {/* ===== side nav panel ===== */}

                        <Panel
                            defaultSize={defaultSize}
                            minSize={minSize}
                            maxSize={maxSize}
                            className='main-side-nav-panel'
                        >
                            <AppSideNav />

                        </Panel>

                        {/* ===== resizing handle ===== */}

                        <PanelResizeHandle className="resize-handle" />

                        {/* ===== main content panel ===== */}

                        <Panel defaultSize={invertedDefault}>
                            <main className='main-content-panel'>
                                <div className="main-content-wraper">
                                    <Outlet />
                                </div>
                            </main>
                        </Panel>

                    </PanelGroup>
                </section>
            </>
        </section>
    )
}