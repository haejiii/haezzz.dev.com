import './index.scss'

const TableOfContents = ({ content }) => {
  return (
    <div className="table-of-content-wrap">
      <div className="table-of-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default TableOfContents
