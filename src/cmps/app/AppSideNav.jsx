// === Style

// === Libs
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';

// === Services

// === Actions

// === Hooks / React
import { useSelector } from 'react-redux';
import { useRef } from 'react';

// === Imgs

// === Child Components

// ====== Component ======
// =======================
export function AppSideNav({
    children,
    defaultWidth = 400,
    minWidth = 200,
    maxWidth = 700,
}) {

    // const isOpen = useSelector(storeState => storeState.appModule.isSidePanelOpen)
    const isOpen = true
    const nodeRef = useRef(null);


    //convert pixels size to precentage
    const containerWidth = window.innerWidth;
    const defaultSize = (defaultWidth / containerWidth) * 100;
    const invertedDefault = 100 - defaultSize;
    const minSize = (minWidth / containerWidth) * 100;
    const maxSize = (maxWidth / containerWidth) * 100;

    return (
        <nav ref={nodeRef} className={`AppSideNav ${isOpen ? 'opened' : ''}`}>
            <PanelGroup
                direction="horizontal"
                autoSaveId="persistence"
            >

                <Panel
                    defaultSize={defaultSize}
                    minSize={minSize}
                    maxSize={maxSize}
                    className='side-panel'
                >
                    {children}
                </Panel>

                <PanelResizeHandle className="resize-handle" />
                <Panel defaultSize={invertedDefault} />

            </PanelGroup>
        </nav>
    )
}