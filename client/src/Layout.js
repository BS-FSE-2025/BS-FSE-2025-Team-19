import { useContext } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Donations from './pages/Donations';
import Home from './pages/Home';
import Map from './pages/Map';
import NavigationBar from './components/NavigationBar';

import { UserContext } from './contexts/userContext'

function RoutesComp() {
  const { userSession, setUserSession } = useContext(UserContext)
  console.log('userContext ', { userSession, setUserSession })
  return (
    <>
      <NavigationBar />
      {/* <Container sx={{ width: '100%', height: 'calc(100vh)', paddingTop: '64px 0 0 0', }}> */}
        <Routes>
          {userSession.email && (
            <>
              <Route path='/map' element={<Map/>} />
              <Route path='/donations' element={<Donations />} />
              <Route path="*" element={<Navigate to="/donations" />} />
            </>
          )}
          {!userSession.email && (
            <>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      {/* </Container> */}
    </>
  )
}

export default RoutesComp
