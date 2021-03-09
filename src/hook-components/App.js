import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './Header';
import FormSearch from './FormSearch';
import ImageCard from './ImageCard';
import Loading from './Loading';

import './App.css';

// component
function App() {
  const [loading, setLoading] = useState(false);
  // destructring của array trong javascript
  const [keyword, setKeyword] = useState('');
  const [offset, setOffset] = useState(0);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const [loading, setLoading] = useState(() => {
  //   return false;
  // });
  // const [state, setState] = useState({
  //   loading: false,
  //   offset: 0,
  //   ...
  // })


  const deboundFetchMemo = useMemo(() => {
    const debounceFetch = debounce((newKeyword) => {
      fetchData(newKeyword);
    }, 1000);
    return debounceFetch;
  }, []);



  const renderImages = () => {
    return images.map((image, idx) => {
      return (
        <ImageCard
          key={idx}
          src={image.src}
          alt={image.alt}
          title={image.title}
        />
      )
    })
  }

  const fetchData = async (keyword, offset = 0) => {
    const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${offset}&rating=g&lang=vi`;
    setLoading(true);

    const res = await axios({
      url: urlApi,
      method: 'GET',
    });

    const newImages = res.data.data.map(img => {
      return {
        src: img.images.downsized.url,
        alt: img.title,
        title: img.title
      }
    });
    const total = res.data.pagination.total_count;

    const newStateImages =
      offset === 0 ? newImages : [...images, ...newImages];

    const hasMore = newStateImages.length <= total;

    setImages(newStateImages);
    setLoading(false);
    setOffset(offset);
    setHasMore(hasMore);
  }

  const fetchMoreData = () => {
    fetchData(keyword, offset + 25)
  }

  // const debounceFetch = debounce((newKeyword) => {
  //   fetchData(newKeyword);
  // }, 1000);

  const handleChangeKeyword = (newKeyword) => {
    setKeyword(newKeyword);
    deboundFetchMemo(newKeyword);
  }

  return (
    <div className="App">
      <div className="container mb-4">
        <Header loading={loading} />
        <FormSearch
          handleChangeKeyword={handleChangeKeyword}
          keyword={keyword}
          submitForm={fetchData}
        />
      </div>
      <div className="container">
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={images.length ? <Loading /> : null}
          scrollThreshold="100px"
          endMessage={
            <div>
              <b>Yay! You have seen it all</b>
            </div>
          }
        >
          {renderImages()}
        </InfiniteScroll>
      </div>
    </div>
  )

}

export default App;
