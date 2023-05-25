import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/routes";
import { StudentLayout } from "~/components/Layout";

function App() {
  const currentUser = localStorage.getItem('account') ?? false;
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {!currentUser ? (
            publicRoutes.map((route, index) => {
              let Layout = StudentLayout;
              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })) :
            (privateRoutes.map((route, index) => {
              let Layout = StudentLayout;
              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout title={route.title}>
                      <Page />
                    </Layout>
                  }
                />
              );
            }))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
