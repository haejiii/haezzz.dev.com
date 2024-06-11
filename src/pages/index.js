import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '@/layout'
import SEO from '@/components/seo'

const PostsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
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
                  <h4>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h4>
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

export default PostsPage

export const Head = () => <SEO title="All posts" />

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
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
