import {ScrollView, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Text} from 'react-native-paper';
import Search from '../components/Search';
import NewsFeed, {NewsSkeleton} from '../components/NewsFeed';
import {AuthContext} from '../routes/AuthProvider';

export default function HomeScreen({navigation}) {
  const {search, firstNews, setFirstNews} = useContext(AuthContext);

  const [isFetchingNews, setFetchingNews] = useState(true);

  const [news, setNews] = useState(null);

  const [query, setQuery] = useState('');
  // If true,then only the search results are displayed
  const [isSearch, setSearch] = useState(false);

  const onQueryChange = query => {
    setSearch(query.length <= 0 ? false : true);
    setQuery(query);
  };

  let controller = new AbortController();
  let signal = controller.signal;
  const fetchNews = () => {
    let url =
      'https://newsapi.org/v2/everything?' +
      'q=agriculture&' +
      'from=2022-04-28&' +
      'sortBy=popularity&' +
      'apiKey=4601e2dde36f4926b8de200d91e551d2';

    var req = new Request(url);
    fetch(req, {
      method: 'GET',
      signal,
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        setNews(response);
        setFirstNews(response);
        setFetchingNews(false);
      })
      .catch(e => {
        if (__DEV__) console.log(e);
      });
  };

  useEffect(() => {
    fetchNews();
    // Abort fetch when component unmounts
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // set
    if (isSearch) {
      searchResult = search(firstNews.articles, query);
    }
    isSearch ? setNews({articles: searchResult}) : fetchNews();

    //
  }, [query]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingVertical: 10, paddingHorizontal: 20}}
      contentContainerStyle={{paddingVertical: 20}}>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text style={{fontSize: 25}}>VEGGIES</Text>
      </View>

      <Search
        query={query}
        setQuery={onQueryChange}
        // search={onSearch}
        // news={news}
      />

      {isFetchingNews ? (
        <>
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
        </>
      ) : (
        news?.articles.map((articleObject, index) => (
          <NewsFeed
            image={{uri: articleObject['urlToImage']}}
            title={articleObject['title']}
            description={articleObject['description']}
            author={articleObject['author']}
            date={new Date(articleObject['publishedAt'])}
            key={articleObject['url'] + index}
            onPress={() =>
              navigation.navigate('NEWS_FEED-MODAL', {
                url: articleObject['url'],
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}
