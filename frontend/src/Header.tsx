import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { UserIcon } from './Icons';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  fontFamily,
  fontSize,
  gray1,
  gray2,
  gray5,
  StyledLink,
} from './Styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useAuth } from './Auth';
import 'bootstrap/dist/css/bootstrap.css';

const buttonStyle = css`
  border: none;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  background-color: transparent;
  color: ${gray2};
  text-decoration: none;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
  :focus {
    outline-color: ${gray5};
  }
`;

export const Header: FC<RouteComponentProps> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';

  const [search, setSearch] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  const { isAuthenticated, user, loading } = useAuth();

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light shadow-sm">
      <div>
        <StyledLink
          className="navbar-brand"
          to="/"
          css={css`
            font-size: 24px;
            font-weight: bold;
            color: ${gray1};
          `}
        >
          Q & A
        </StyledLink>
        <span
          css={css`
            margin-left: 10px;
            font-size: 16px;
            color: ${gray2};
          `}
        >
          {process.env.REACT_APP_ENV == null ? 'development' : null}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline mx-auto" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
            <input
              className="form-control"
              type="search"
              placeholder="type keywords"
              onChange={handleSearchInputChange}
              value={search}
            />
          </div>
        </form>
        {!loading &&
          (isAuthenticated ? (
            <div>
              <span>{user!.name}</span>
              <StyledLink
                to={{ pathname: '/signout', state: { local: true } }}
                css={buttonStyle}
              >
                <UserIcon />
                <span>Sign Out</span>
              </StyledLink>
            </div>
          ) : (
            <StyledLink to="/signin" css={buttonStyle}>
              <UserIcon />
              <span>Sign In</span>
            </StyledLink>
          ))}
      </div>
    </nav>
  );
};

export const HeaderWithRouter = withRouter(Header);
