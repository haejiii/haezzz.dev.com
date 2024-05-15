import { Link, graphql } from 'gatsby'

import Layout from '@/layout'
import SEO from '@/components/seo'

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = data.allMarkdownRemark.group

  return (
    <Layout location={location} title={siteTitle}>
      <ol className="tag-list">
        {tags.map(_ => {
          return (
            <li key={_.fieldValue}>
              <Link to={`/tags/${_.fieldValue}`}>
                {_.fieldValue.toUpperCase()} ({_.totalCount})
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagsPage

export const Head = ({ data }) => {
  const tags = data.allMarkdownRemark.group

  return <SEO title="All Tags" keywords={tags.map(_ => _.fieldValue)} />
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
