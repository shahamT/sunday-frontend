import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { closeTaskPanel, openTaskPanel } from '../store/actions/board.actions';
import { AppHeader } from '../cmps/app/header/AppHeader';
import { AppSideNav } from '../cmps/app/AppSideNav';
import { useSelector } from 'react-redux';
import { closeSidePanel, openSidePanel } from '../store/actions/app.actions';
import { Tooltip } from '../cmps/reusables/tooltip/Tooltip';

const STORAGE_KEY = 'sideNavWidth';
const MIN_SIDE_NAV_WIDTH = 200;
const MAX_SIDE_NAV_WIDTH = 575;
const COLLAPSED_SIDE_NAV_WIDTH = 30;

export function AppLayout() {

    // ========= side nav ==========
    // =============================

    const isSideNavOpen = useSelector(storeState => storeState.appModule.isSideNavOpen)
    const [isDragging, setIsDragging] = useState(false);
    const [enableTransition, setEnableTransition] = useState(true);
    const [sideNavWidth, setSideNavWidth] = useState(() => {
        return parseInt(localStorage.getItem(STORAGE_KEY), 10) || 280;
    });

    // Enable sidenav transition only when collapsing or expanding
    useEffect(() => {
        setEnableTransition(true);
    }, [isSideNavOpen]);

    // Resize handler (disable transition during drag)
    useEffect(() => {
        if (!isDragging) return;

        setEnableTransition(false);

        const onMouseMove = (e) => {
            e.preventDefault(); // prevent selection and other junk
            const newWidth = Math.min(Math.max(e.clientX, MIN_SIDE_NAV_WIDTH), MAX_SIDE_NAV_WIDTH);
            setSideNavWidth(newWidth);
            localStorage.setItem(STORAGE_KEY, newWidth);
        };


        const onMouseUp = () => setIsDragging(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging]);

    function onResize(ev) {
        ev.preventDefault()
        setIsDragging(true)
    }

    function onSideNavExpand() {
        if (!isSideNavOpen) openSidePanel()
    }

    function onSideNavCollapse() {
        if (isSideNavOpen) closeSidePanel()
    }

    const NavWidth = isSideNavOpen ? sideNavWidth : COLLAPSED_SIDE_NAV_WIDTH;

    // ===== task details panel=====
    // =============================

    //task panel apperance
    const location = useLocation();
    const match = useMatch('app/board/:boardId/task/:taskId');

    // Track URL-based task panel opening
    useEffect(() => {
        if (match) openTaskPanel();
        else closeTaskPanel();
    }, [location.pathname]);



    // // ====== Component ======
    // // =======================
    return (
        <section className="AppLayout">
            <AppHeader />

            <section
                className={`app-main ${isSideNavOpen ? 'side-nav-opened' : 'side-nav-closed'}`}
            >
                <aside
                    className={`main-side-nav-panel ${isSideNavOpen ? 'opened' : 'closed'} ${isDragging ? 'dragging' : ''}${enableTransition ? 'collapsing-transition' : ''}`}
                    style={isSideNavOpen ? { width: `${sideNavWidth}px` } : undefined}
                    onClick={onSideNavExpand}
                >
                    {isSideNavOpen && <AppSideNav />}
                    <div
                        className={`side-nav-resize-handle ${isDragging ? 'dragging' : ''}`}
                        onMouseDown={onResize}
                    />
                    <Tooltip
                    title={isSideNavOpen ? 'Close navigation' : 'Open navigation'}
                    position="right"
                    additionalClass='close-btn-wraper'
                    gap={16}
                    >
                        <div
                        className="close-btn i-DropdownChevronLeft"
                        onClick={onSideNavCollapse}
                        />
                    </Tooltip>
                </aside>

                <main className="main-content-panel">

                    <div className="main-content-wraper">
                        <Outlet />
                    </div>

                </main>

            </section>
        </section>
    );
}


