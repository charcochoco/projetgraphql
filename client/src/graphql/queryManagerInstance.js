import gql from "graphql-tag";
import graphqlClient from ".";

class QueryManager {
  async createPost(title, author, link) {
    const { data } = await graphqlClient.mutate({
      mutation: gql`
        mutation CreatePost($title: String!, $author: String!, $link: String!) {
          createPost(title: $title, author: $author, link: $link) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: {
        title,
        author,
        link,
      },
    });

    const createdPost = data.createPost;

    return {
      id: createdPost._id,
      title: createdPost.title,
      author: createdPost.author,
      link: createdPost.link,
      createdAt: createdPost.createdAt,
    };
  }
  async deletePost(postId) {
    const {data} = await graphqlClient.mutate({
      mutation: gql`
        mutation DeletePost($postId: ID!) {
          deletePost(id: $postId) {
            _id
          }
        }
      `,
      variables: {
        postId,
      },
    });
    console.log(data);
    return postId;
  }
  async createComment(content, author, postId) {
    const { data } = await graphqlClient.mutate({
      mutation: gql`
        mutation CreateComment($author: String!, $content: String!, $postId: ID!) {
          createComment(author: $author, content: $content, postId: $postId) {
            _id
            content
            author
            postId
          }
        }
      `,
      variables: {
        author,
        content,
        postId,
      },
    });

    const createdComment = data.createComment;

    return {
      id: createdComment._id,
      content: createdComment.content,
      author: createdComment.author,
      postId: createdComment.postId,
    };
  }
  async getPosts(order = "asc") {
    const { data } = await graphqlClient.query({
      query: gql`
        query GetPosts($order: String!) {
          posts(order: $order) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: {
        order,
      },
    });

    return data.posts;
  }
  async getPost(id) {
    const { data } = await graphqlClient.query({
      query: gql`
        query GetPost($id: ID!) {
          post(id: $id) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data.post;
  }
  async getPostComments(postId) {
    const { data } = await graphqlClient.query({
      query: gql`
        query GetCommentsByPostId($postId: ID!) {
          commentsByPostId(postId: $postId) {
            _id
            content
            author
            postId
            createdAt
          }
        }
      `,
      variables: {
        postId,
      },
    });

    return data.commentsByPostId;
  }
}

export default new QueryManager();
