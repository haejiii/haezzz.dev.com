import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { startCase } from 'lodash'

import Layout from '@/layout'
import SEO from '@/components/seo'

const TagPostListTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tagName = pageContext.tag

  return (
    <Layout location={location} title={siteTitle} subTitle={startCase(tagName)}>
      <ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <section className="left">
                  <div className="date">{post.frontmatter.date}</div>
                </section>
                <section className="right">
                  <h5>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagPostListTemplate

export const Head = ({ pageContext }) => {
  const tagName = pageContext.tag

  return <SEO title={startCase(tagName)} keywords={[tagName]} />
}

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true }, tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          tags
        }
      }
    }
  }
`
