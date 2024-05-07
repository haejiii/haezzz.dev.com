import { graphql, useStaticQuery } from 'gatsby'
import { useTheme, THEME_MODE } from '../../theme'

const GithubIconButton = () => {
  const { mode } = useTheme()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              github
            }
          }
        }
      }
    `
  )

  return (
    <button className="icon" onClick={() => window.open(site.siteMetadata.social.github)}>
      <svg
        fill={mode === THEME_MODE.LIGHT ? '#000' : '#fff'}
        viewBox="0 0 72 72"
        width="25"
        height="25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m36.01,1.35c19.06,0 34.5,15.9 34.5,35.53c0,15.78 -9.99,29.14 -23.8,33.77c0,-0.01 0.01,-0.03 0.01,-0.03s-2.33,-1.12 -2.29,-3.14c0.06,-2.2 0,-7.35 0,-9.25c0,-3.24 -2,-5.54 -2,-5.54s15.65,0.18 15.65,-17.01c0,-6.63 -3.36,-10.09 -3.36,-10.09s1.77,-7.07 -0.62,-10.08c-2.67,-0.3 -7.45,2.64 -9.49,4c0,0 -3.23,-1.36 -8.61,-1.36c-5.38,0 -8.61,1.36 -8.61,1.36c-2.04,-1.36 -6.83,-4.29 -9.49,-4c-2.39,3.01 -0.62,10.08 -0.62,10.08s-3.36,3.46 -3.36,10.09c0,17.19 15.64,17.01 15.64,17.01s-1.57,1.83 -1.91,4.53c-1.09,0.38 -2.7,0.84 -4,0.84c-3.39,0 -5.98,-3.39 -6.93,-4.96c-0.93,-1.55 -2.85,-2.85 -4.63,-2.85c-1.18,0 -1.75,0.61 -1.75,1.3s1.65,1.17 2.75,2.44c2.29,2.71 2.24,8.79 10.41,8.79c0.89,0 2.7,-0.23 4.05,-0.41c0,1.9 0,3.93 0.03,5.11c0.04,2.01 -2.29,3.14 -2.29,3.14s0.01,0.01 0.01,0.03c-13.81,-4.63 -23.8,-18 -23.8,-33.77c0,-19.62 15.45,-35.53 34.5,-35.53l0.01,0z" />
      </svg>
    </button>
  )
}

export default GithubIconButton
