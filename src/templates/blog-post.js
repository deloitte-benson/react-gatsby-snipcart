import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import BuyButton from '../components/BuyButton'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const images = post.frontmatter.image
      .map(x => ({
        name: x.name,
        src: require(`./../pages${post.frontmatter.path}${x.src}.jpg`)
      }))

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
          link={[{
            href:"https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
            rel:"stylesheet",
            type:"text/css" 
          }]}
          script={[
            {
              type: 'text/javascript',
              src:"https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"
            },
            { 
              type: 'text/javascript',
              id: "snipcart",
              "data-api-key": "MDU1NzQyMWItMzkzYS00OTgwLWE3NTEtOTI1YWNhY2JmMDYxNjM3MDMwODQ4Nzk4OTY1NDI0",
              src:"https://cdn.snipcart.com/scripts/2.0/snipcart.js" 
            }
          ]}/>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
        </p>
        
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        
        <BuyButton post={post.frontmatter} images={images}>
        </BuyButton>

        <ul
          style={{
            marginTop: "45px",
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        price
        id
        path
        description
        image {
          name
          src
        }
        customFields { 
          name
          values 
        }
      }
    }
  }
`
