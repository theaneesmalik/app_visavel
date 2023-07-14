/** @format */
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from './pages/auth'
import { ProfilePage, DashboardPage, PageNotFound, JobsPage, SupportPage, EditProfilePage } from './pages'
import Protected from './context/Protected'

import Layout from './components/Layout'

function App() {
  return (
    <div className='App'>
      {/* <HashRouter> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route element={<Layout />}>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/jobs' element={<JobsPage />} />
              <Route path='/support' element={<SupportPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/edit' element={<EditProfilePage />} />
            </Route>
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* </HashRouter> */}
    </div>
  )
}

export default App
