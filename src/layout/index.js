import './index.scss'

import { Link } from 'gatsby'
import { useRef, useState } from 'react'

import GithubIconButton from '../components/github-button'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="wrapper" data-is-root-path={isRootPath}>
      <header className="header">
        <div className="left-section">
          <Link to="/" replace={false}>
            {title}
          </Link>
        </div>
        <div className="right-section">
          <ThemeSwitch />
          <GithubIconButton />
        </div>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
