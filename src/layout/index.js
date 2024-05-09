import './index.scss'

import { Link } from 'gatsby'

import GithubIconButton from '../components/github-button'
import ThemeSwitch from '../components/theme-switch'
import { ThemeProvider } from '../theme'

/**
 * TODO. 카테고리별 컨텐츠 제공
 * Posts - 최근 조회수 순 5개 컨텐츠 제공 및 모든 컨텐츠 최신 순으로 정렬
 * Tags - 태그별 컨텐츠 제공 or 모든 태그 표시
 * Story - 스토리 묶음 컨텐츠 제공
 */

const CATEGORY_LIST = [
  { path: '/', title: 'Posts' },
  { path: '/tags', title: 'Tags' },
  { path: '/story', title: 'Story' },
  // { path: '/about', title: 'About' },
]

const Layout = ({ location, title, social, children }) => {
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
              <li key={_.path} className="category-item bold">
                <Link to={_.path}>{_.title}</Link>
              </li>
            ))}
          </ul>
          <ThemeSwitch />
        </div>
      </header>
      <main className="layout-main">
        {isRootPath && <h1 className="title">{pageTitle}</h1>}
        {children}
      </main>
      <footer className="layout-footer">
        <GithubIconButton />
        <div>
          Copyright © <a href={social?.github}>{title}</a> All rights reserved.
        </div>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
