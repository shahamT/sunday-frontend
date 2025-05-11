import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

export function TaskPanel({
    children,
    side = 'right',
    defaultWidth = 400,
    minWidth = 200,
    maxWidth = 700,
}) {

    const isOpen = useSelector(storeState => storeState.boardModule.isTaskPanelOpen)
    const nodeRef = useRef(null);


    //convert pixels size to precentage
    const containerWidth = window.innerWidth;
    const defaultSize = (defaultWidth / containerWidth) * 100;
    const invertedDefault = 100 - defaultSize;
    const minSize = (minWidth / containerWidth) * 100;
    const maxSize = (maxWidth / containerWidth) * 100;

    return (
            <section ref={nodeRef} className={`ResizableSidePanel ${side} ${isOpen ? 'opened': ''}`}>
                <PanelGroup
                    direction="horizontal"
                    autoSaveId="persistence"
                >

                    {side === 'right' ?
                        <>
                            <Panel defaultSize={invertedDefault} />
                            {isOpen && <PanelResizeHandle className="side-panel-resize-handle" />}
                        </>
                        : ''}

                    <Panel
                        defaultSize={defaultSize}
                        minSize={minSize}
                        maxSize={maxSize}
                        className='side-panel'
                    >
                        {children}
                    </Panel>

                    {side === 'left' ?
                        <>
                             {isOpen && <PanelResizeHandle className="side-panel-resize-handle" />}
                            <Panel defaultSize={invertedDefault} />
                        </>
                        : ''}

                </PanelGroup>
            </section>
    )
}


// // example usage

// <ResizableSidePanel
//     side='right'
//     defaultWidth={500}
//     minWidth={200}
//     maxWidth={700}
// >
//     <YourContentComponent />
// </ResizableSidePanel>