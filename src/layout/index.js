import './index.scss'

import { Link } from 'gatsby'

import GithubIconButton from '@/components/github-button'
import ThemeSwitch from '@/components/theme-switch'
import { ThemeProvider } from '@/theme'

const CATEGORY_LIST = [
  { path: '/', title: 'Posts' },
  // { path: '/tags', title: 'Tags' },
  // { path: '/story', title: 'Story' },
  // { path: '/about', title: 'About' },
]

const Layout = ({ location, title, children }) => {
  const pathname = location.pathname.split('/').join('')
  const pageTitle = CATEGORY_LIST.find(_ => _.path === `/${pathname}`)?.title

  const isRootPath = Boolean(pageTitle)

  return (
    <ThemeProvider>
      <header className="layout-header">
        <div className="left-section">
          <Link className="logo" to="/" replace={false}>
            <div>{title}</div>
          </Link>
        </div>
        <div className="right-section">
          <ul className="category-list">
            {CATEGORY_LIST.map(_ => (
              <li key={_.path} className="category-item">
                <Link to={_.path}>{_.title}</Link>
              </li>
            ))}
          </ul>
          <ThemeSwitch />
        </div>
      </header>
      <main className="layout-main">
        {isRootPath && <h1>{pageTitle}</h1>}
        <div className="main-content">{children}</div>
      </main>
      <footer className="layout-footer">
        <GithubIconButton />
        <div>Copyright © {title} All rights reserved.</div>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
