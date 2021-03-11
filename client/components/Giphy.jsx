import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results

} from '@giphy/react-components'
import React, { useContext } from 'react';

// the search experience consists of the manager and its child components that use SearchContext
const SearchExperience = (props) => {
  const { visible, handleGifPost, user } = props;
  return (
  <SearchContextManager apiKey={'OMYdnr7zGbV26NlsG3xZ5dAqeY87OD88'} theme={{mode: 'dark'}}>
      <Components visible={visible} handleGifPost={handleGifPost} user={user}/>
  </SearchContextManager>
)}

// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const Components = (props) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const { visible, handleGifPost, user } = props;
  const isVisible = visible ? 'visible' : 'hidden';
  return (
      <div style={{'visibility' : isVisible}}>
          <SearchBar/>
          <Grid key={searchKey} columns={3} width={800} fetchGifs={fetchGifs} noLink={true} onGifClick={(e) => {
            handleGifPost(e, user.username, e.embed_url, user.id, 'gif')
          }}/>
      </div>
  )
}

export default SearchExperience;


//  import React from 'react';
// import { Grid } from '@giphy/react-components'
// import { GiphyFetch } from '@giphy/js-fetch-api'

// // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
// const gf = new GiphyFetch('OMYdnr7zGbV26NlsG3xZ5dAqeY87OD88');

// // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
// // const fetchGifs = (offset) => gf.trending({ offset, limit: 10 })

// // Render the React Component and pass it your fetchGifs as a prop
// export default function Giphy(props) {

// const fetchGifs = (offset) => gf.search('cats', { sort: 'relevant', limit: 10, types: 'gifs' })
//   return (
//     <Grid width={800} columns={3} fetchGifs={fetchGifs} />
//   );
// }

{/* <iframe src="https://giphy.com/embed/l2JJDdD7cv4xdGGis" style={{border: "none"}}/> */}