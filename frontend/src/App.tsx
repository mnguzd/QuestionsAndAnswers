import React, { lazy, Suspense } from 'react';
import { HeaderWithRouter as Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AuthProvider } from './data/Auth';
import { AuthorizedPage } from './pages/AuthorizedPage';
import 'bootstrap/dist/css/bootstrap.css';
const AskPage = lazy(() => import('./pages/AskPage'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/ask">
              <Suspense
                fallback={
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                }
              >
                <AuthorizedPage>
                  <AskPage />
                </AuthorizedPage>
              </Suspense>
            </Route>
            <Route
              path="/signin"
              render={() => <SignInPage action="signin" />}
            />
            <Route
              path="/signin-callback"
              render={() => <SignInPage action="signin-callback" />}
            />
            <Route
              path="/signout"
              render={() => <SignOutPage action="signout" />}
            />
            <Route
              path="/signout-callback"
              render={() => <SignOutPage action="signout-callback" />}
            />
            <Route path="/questions/:questionId" component={QuestionPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
