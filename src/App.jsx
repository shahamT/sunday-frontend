//style
import './assets/style/main.scss'


//pages
import { HomePage } from './pages/land-page/HomePage.jsx'
import { AboutUs } from './pages/land-page/AboutUs.jsx'
import { Signup } from './pages/auth/Signup'
import { Login } from './pages/auth/Login'

//dev pages
import { Reusables } from './pages/DevPages/Reusables/Reusables'
import { XDevPage } from './pages/DevPages/TemplateDevPage/XDevPage'

//hooks / react
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDocumentTitle } from './hooks/useDocumentTitle'

//services
import { store } from './store/store.js'
import { Provider } from 'react-redux'

//main cmps
import { AppHeader } from './cmps/app/header/AppHeader.jsx'

// === Child Components
import { FlashMsg } from './cmps/reusables/FlashMsg/FlashMsg.jsx'
import { GlobalModal } from './cmps/reusables/GlobalModal/GlobalModal.jsx'
import { LandPageLayout } from './layouts/LandPageLayout'
import { AppLayout } from './layouts/AppLayout'
import { AppHome } from './cmps/app/main/home/AppHome'
import { BoardIndex } from './cmps/app/main/board/BoardIndex'


export default function App() {
    // routes with no header:
    const noHeaders = ['/signup', '/login']


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




                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />

                            {/* app routes */}
                            <Route element={<AppLayout />}>
                                <Route path="/app" element={<Navigate to="/app/home" />} />
                                <Route path="/app/home" element={<AppHome />} />
                                <Route path="/app/board/:boardId" element={<BoardIndex />} />
                                <Route path="/app/board/:boardId/task/:taskId" element={<BoardIndex />} />
                            </Route>

                            {/* <Route path="/template" element={<TemplateIndex />} />
                            <Route path="/template/:templateId" element={<TemplateDetails />} />
                            <Route path="/template/edit/:templateId" element={<TemplateEdit />} /> */}

                            {/* dev pages routes */}
                            <Route path="/reusables" element={<Reusables />} />
                            <Route path="/x-dev-page" element={<XDevPage />} />

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