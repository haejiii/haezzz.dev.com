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
const Layout = ({
  // location,
  title,
  social,
  children,
}) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider>
      <header className="header">
        <div className="left-section">
          <Link className="logo" to="/" replace={false}>
            <div>{title}</div>
          </Link>
        </div>
        <div className="right-section">
          <ul className="category-list">
            <li className="category-item">Posts</li>
            <li className="category-item active">Tags</li>
            <li className="category-item">Story</li>
          </ul>
          <ThemeSwitch />
        </div>
      </header>
      <main>
        <div className="main-container">{children}</div>
      </main>
      <footer>
        <GithubIconButton />
        <div>
          Copyright © <a href={social?.github}>{title}</a> All rights reserved.
        </div>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
