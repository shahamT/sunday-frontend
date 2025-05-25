import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { closeTaskPanel, openTaskPanel } from '../store/actions/board.actions';
import { AppHeader } from '../cmps/app/header/AppHeader';
import { AppSideNav } from '../cmps/app/AppSideNav';
import { useSelector } from 'react-redux';
import { closeSidePanel, openSidePanel } from '../store/actions/app.actions';
import { Tooltip } from '../cmps/reusables/tooltip/Tooltip';
import { useAuthGuard } from '../hooks/useAuthGuard';

const SN_STORAGE_KEY = 'sideNavWidth';
const MIN_SIDE_NAV_WIDTH = 200;
const MAX_SIDE_NAV_WIDTH = 575;


export function AppLayout() {
    const loggedinUser = useAuthGuard()
    // ========= side nav ==========
    // =============================

    const isSideNavOpen = useSelector(storeState => storeState.appModule.isSideNavOpen)
    const [isDragging, setIsDragging] = useState(false);
    const [enableTransition, setEnableTransition] = useState(true);
    const mobileView = window.matchMedia("(max-width: 600px)");
    const [sideNavWidth, setSideNavWidth] = useState(() => {
        if (mobileView.matches) {
            return window.innerWidth - 24
        } else {
            return parseInt(localStorage.getItem(SN_STORAGE_KEY), 10) || 280;
        }
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
            localStorage.setItem(SN_STORAGE_KEY, newWidth);
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


    // console.log("sideNavWidth: ", sideNavWidth)
    // // ====== Component ======
    // // =======================
    const isBoardRoute = location.pathname.startsWith('/app/board/');

    if (!loggedinUser) return <div className="main-loader-container" >
        <img className="loader" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747552268/loader_cymybj.gif" alt="loader" />
    </div>

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
                        additionalClass={`close-btn-wraper ${isSideNavOpen ? 'opened' : 'closed'}`}
                        gap={16}
                    >
                        <div
                            className="close-btn i-DropdownChevronLeft"
                            onClick={onSideNavCollapse}
                        />
                    </Tooltip>
                </aside>

                {isBoardRoute && <div className="main-divider" />}

                <main className="main-content-panel">

                    <div className="main-content-wraper">
                        <Outlet context={{ sideNavWidth }} />
                    </div>

                </main>

            </section>
        </section>
    );
}


