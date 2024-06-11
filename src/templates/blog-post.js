import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '@/layout'
import SEO from '@/components/seo'
import TableOfContents from '@/components/table-of-contents'
import PostContents from '@/components/post-contents'

const BlogPostTemplate = ({ data: { site, markdownRemark: post }, location }) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <TableOfContents content={post.tableOfContents} />
      <PostContents
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        html={post.html}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
      }
      tableOfContents
    }
  }
`
