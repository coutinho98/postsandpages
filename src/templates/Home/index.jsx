import { useState, useEffect, useCallback } from "react";

import "./styles.css";

import { Posts } from "../../componnets/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../componnets/Button";
import { TextInput } from "../../componnets/textInput";

export const Home = () => {
  /*  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  }; */

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPages] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteresPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos, page, postsPerPage);
  }, []);

  useEffect(() => {
    console.log("Oi");
    handleLoadPosts(page, postsPerPage);
  }, [handleLoadPosts]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPages(nextPage);
  };
  const handleChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {" "}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteresPosts.length > 0 && <Posts posts={filteresPosts} />}
      {filteresPosts.length === 0 && <p>Não existe posts</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

/* export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteresPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container"> */

/* {!!searchValue && <h1>Search value: {searchValue}</h1>} */

/*        <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteresPosts.length > 0 && <Posts posts={filteresPosts} />}
        {filteresPosts.length === 0 && <p>Não existe posts</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
 */
