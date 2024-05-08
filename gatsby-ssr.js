/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import { THEME_KEY } from './src/theme'

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: 'en' })

  // NOTE: 페인팅 전 로컬 스토리지에 저장된 테마 모드를 불러와서 적용
  const preloadScript = `
    const localThemeMode = localStorage.getItem('${THEME_KEY}')
    const systemThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const currentMode = localThemeMode ?? systemThemeMode
    document.body.classList.add(currentMode)
  `
  setPreBodyComponents(<script key="theme" dangerouslySetInnerHTML={{ __html: preloadScript }} />)
}
