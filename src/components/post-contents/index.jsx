import { Link } from 'gatsby'

import './index.scss'

const PostContents = ({ title, date, description, tags, html }) => {
  return (
    <article className="blog-post" itemScope itemType="http://schema.org/Article">
      <header>
        <h1 itemProp="headline">{title}</h1>
        <p>{date}</p>
      </header>
      <div className="desc">
        <p>{description}</p>
      </div>
      <section dangerouslySetInnerHTML={{ __html: html }} itemProp="articleBody" />
      <footer>
        <div className="blog-post-tags">
          {tags.map(_ => (
            <Link to={`/tags/${_}`}>{_}</Link>
          ))}
        </div>
      </footer>
    </article>
  )
}

export default PostContents
