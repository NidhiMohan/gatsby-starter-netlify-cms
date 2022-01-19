import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const EventPostTemplate = ({
    // content,
    // contentComponent,
    description,
    title,
    helmet,
}) => {
    // const PostContent = contentComponent || Content;

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <p>{description}</p>
                        {/* <PostContent content={content} /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

EventPostTemplate.propTypes = {
    // content: PropTypes.node.isRequired,
    // contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
};

const EventPost = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <EventPostTemplate
                // content={post.html}
                // contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Event">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                title={post.frontmatter.title}
            />
        </Layout>
    );
};

EventPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default EventPost;

export const pageQuery = graphql`
  query EventPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
