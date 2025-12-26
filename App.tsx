import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Model } from './pages/Model';
import { Impact } from './pages/Impact';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Studio } from './pages/Studio';
import { ROUTES } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MODEL} element={<Model />} />
        <Route path={ROUTES.IMPACT} element={<Impact />} />
        <Route path={ROUTES.STUDIO} element={<Studio />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default App;