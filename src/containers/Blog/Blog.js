import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          const posts = response.data.splice(0, 6);   //Limit the amount of data that will be rendered.
          const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'Uladzimir'   //Add some data to understand that we can change the data before setting it to the state.
            }
          })
          this.setState({posts: updatedPosts});
        })
  }
  selectedIdHandler = id => {
    this.setState({selectedPostId: id});
  }
    render () {
      const posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.selectedIdHandler(post.id)}/>
      })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
