import { Component } from "react";

import "./styles.css";

import { Posts } from "../../componnets/Posts";
import { loadPosts } from "../../utils/loadPosts";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(0, 4),
      allPosts: postsAndPhotos,
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>
    );
  }
}

export default Home;
