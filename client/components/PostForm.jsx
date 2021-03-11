import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTitle, updateBody, savePost, getMyPosts, getPosts, giphyVisible } from '../actions/actions';
import socketIOClient from 'socket.io-client';

const mapStateToProps = (state) => {
  return {
    newPostTitle: state.posts.newPostTitle,
    newPostBody: state.posts.newPostBody,
    user: state.scratch.user,
    visible: state.scratch.giphyVisible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTitle: (value) => dispatch(updateTitle(value)),
    updateBody: (value) => dispatch(updateBody(value)),
    handleSubmit: (e, title, body, id, type) => {
      e.preventDefault();
      if (!title || !body) return;

      dispatch(savePost(title, body, id, type));
    },
    handleGetUserPosts: (e) => {
      e.preventDefault();
      dispatch(getMyPosts());
    },
    handleGetAllPosts: (e) => {
      e.preventDefault();
      dispatch(getPosts());
    },
    handleToggleVisibility: (e, visiblility) => {
      e.preventDefault();
      console.log('POSTFORM VISIBLE CHECK: ', visiblility);
      dispatch(giphyVisible());
    }
  };
};


class PostForm extends Component {

  render() {
    return (
      <center className="PostForm">
        <form
          onSubmit={(e) =>{
            var socket= io()
            console.log(this.props);
            this.props.handleSubmit(
              e,
              this.props.user.username,
              this.props.newPostBody,
              this.props.user.id,
              'textPost'
            )
            socket.emit('new post', `emitting from PostForm: ${this.props.newPostBody}`);
            // reset textarea after submitting
            document.getElementById('textArea').value = '';
          }
        }
        >
          {/* <input
            placeholder="Add a title"
            onChange={(e) => this.props.updateTitle(e.target.value)}
          /> */}
          <br />
          <textarea id="textArea"
            placeholder="Add your message"
            onChange={(e) => this.props.updateBody(e.target.value)}
          />
          <br />
          <button type="submit">Add Post</button>
          <button onClick={(e) => {this.props.handleToggleVisibility(e, this.props.visible)}}>Giphy</button>
          <button onClick={(e) => {this.props.handleGetUserPosts(e)}}>See my Posts</button>
          <button onClick={(e) => {this.props.handleGetAllPosts(e)}}>See all Posts</button>
        </form>
      </center>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
