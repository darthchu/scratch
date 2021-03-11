import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, savePost } from '../actions/actions';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx';
import Navbar from './Navbar.jsx';
import Giphy from './Giphy.jsx';

const mapStateToProps = (state) => {
  //
  return {
    posts: state.posts,
    userId: state.scratch.user.id,
    giphyVisible: state.scratch.giphyVisible,
    user: state.scratch.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
    handleGifPost: (e, title, body, id, type) => {
      if (!title || !body) return;
      dispatch(savePost(title, body, id, type));
    },
  };
};

class PostsContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts() {
    if (Array.isArray(this.props.posts.posts)) {
      return this.props.posts.posts.map((post, i) => {
        let currPost;
        if (post.type === 'gif') {
          currPost = (
            <Post
              key={`Post ${i}`}
              title={post.title}
              body={<iframe src={`${post.body}`} style={{"border": "none"}} />}
              userId={post.user_id}
              styling={post.user_id === this.props.userId ? 'MyPost' : null}
            />
          );
        } else {
          currPost = (
            <Post
              key={`Post ${i}`}
              title={post.title}
              body={post.body}
              userId={post.user_id}
              styling={post.user_id === this.props.userId ? 'MyPost' : null}
            />
          );
        }
        return currPost;
      });
    }
  }

  render() {
    return (
      <center>
        <Navbar />
        <center className="PostsContainer">
          <div className="allPosts">{this.renderPosts()}</div>
          <PostForm />
          <Giphy
            visible={this.props.giphyVisible}
            handleGifPost={this.props.handleGifPost}
            user={this.props.user}
          />
        </center>
      </center>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
