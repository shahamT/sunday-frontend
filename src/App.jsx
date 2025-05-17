//style
import './assets/style/main.scss'
import 'animate.css';

//pages
import { HomePage } from './pages/land-page/HomePage.jsx'
import { AboutUs } from './pages/land-page/AboutUs.jsx'
import { Signup } from './pages/auth/Signup'
import { Login } from './pages/auth/Login'

//dev pages
import { Reusables } from './pages/DevPages/Reusables/Reusables'
import { DevPage1 } from './pages/DevPages/DevPage1'
import { DevPage2 } from './pages/DevPages/DevPage2'
import { DevPage3 } from './pages/DevPages/DevPage3'

//hooks / react
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDocumentTitle } from './hooks/useDocumentTitle'

// Dnd kit


//services
import { store } from './store/store.js'
import { Provider } from 'react-redux'

// === Layouts
import { LandPageLayout } from './layouts/LandPageLayout'
import { AppLayout } from './layouts/AppLayout'
import { ClearLayout } from './layouts/ClearLayout'

// === pages
import { AppHome } from './cmps/app/main/home/AppHome'
import { BoardDetails } from './cmps/app/main/board/BoardDetails'

// === Global Components
import { FlashMsg } from './cmps/reusables/FlashMsg/FlashMsg.jsx'
import { GlobalModal } from './cmps/reusables/GlobalModal/GlobalModal.jsx'



import { login } from './store/actions/user.actions'; //TODO delete this!!!



export default function App() {
    // routes with no header:
    const noHeaders = ['/signup', '/login']

    const userCred = {//TODO delete this!!!
        email: "user1@company.com", 
        password: "hashed_pw_1"
    } 
    login(userCred)//TODO delete this!!!



    return (
        <Provider store={store}>
            <Router>

                <section className="app">
                    <TitleNamer /> {/*this is only for dynamic document title*/}

                    <main className='main-content main-layout'>
                        <Routes>

                            {/* landing page routes */}
                            <Route element={<LandPageLayout />}>
                                <Route path="/" element={<Navigate to="/home" />} />
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/about" element={<AboutUs />} />
                            </Route>


                            {/* clear layout routes */}
                            <Route element={<ClearLayout />}>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                            </Route>


                            {/* app routes */}

                            <Route element={<AppLayout />}>
                                <Route path="/app" element={<Navigate to="/app/home" />} />
                                <Route path="/app/home" element={<AppHome />} />
                                <Route path="/app/board/:boardId" element={<BoardDetails />} />
                                <Route path="/app/board/:boardId/task/:taskId" element={<BoardDetails />} />
                            </Route>

                            {/* dev pages routes */}
                            <Route path="/reusables" element={<Reusables />} />
                            <Route path="/dev-page-1" element={<DevPage1 />} />
                            <Route path="/dev-page-2" element={<DevPage2 />} />
                            <Route path="/dev-page-3" element={<DevPage3 />} />

                        </Routes>
                    </main>

                    <FlashMsg />
                    <GlobalModal />
                </section>

            </Router>
        </Provider>

    )
}



// this component is only used to hold the document title changer hook.
// it changes the document title dynamically based on path
function TitleNamer() {
    useDocumentTitle()
    return <></>
}