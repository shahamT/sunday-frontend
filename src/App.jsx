//style
import './assets/style/main.scss'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//main cmps
import { AppHeader } from './cmps/AppHeader.jsx'

//pages
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'

//dev pages
import { Reusables } from './pages/DevPages/Reusables/Reusables'
import { XDevPage } from './pages/DevPages/TemplateDevPage/XDevPage'

//services
import { store } from './store/store.js'
import { Provider } from 'react-redux'

// === Child Components
import { FlashMsg } from './cmps/reusables/FlashMsg/FlashMsg.jsx'
import { GlobalModal } from './cmps/reusables/GlobalModal/GlobalModal.jsx'


export default function App() {

    // routes with no header:
    const noHeaders = ['/signup', '/login']


    return (
        <Provider store={store}>
            <Router>

                <section className="app">
                    <AppHeader />

                    <main className='main-content main-layout'>
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />

                            {/* <Route path="/template" element={<TemplateIndex />} />
                            <Route path="/template/:templateId" element={<TemplateDetails />} />
                            <Route path="/template/edit/:templateId" element={<TemplateEdit />} /> */}

                            {/* dev pages starts here */}
                            <Route path="/reusables" element={<Reusables/>} />
                            <Route path="/x-dev-page" element={<XDevPage/>} />
                            {/* ends here */}

                        </Routes>
                    </main>

                    <FlashMsg />
                    <GlobalModal/>
                </section>

            </Router>
        </Provider>

    )
}


