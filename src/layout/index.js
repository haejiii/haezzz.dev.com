import './index.scss'

import { Link } from 'gatsby'

import GithubIconButton from '../components/github-button'
import ThemeSwitch from '../components/theme-switch'
import { ThemeProvider } from '../theme'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider>
      <div className="wrapper" data-is-root-path={isRootPath}>
        <header className="header">
          <div className="left-section">
            <Link className="logo" to="/" replace={false}>
              <div>{title}</div>
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
    </ThemeProvider>
  )
}

export default Layout
