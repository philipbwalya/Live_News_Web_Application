import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews =async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
  ) => {
  // graphQl query
  const query = gql`
  query myQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  ) {
    myQuery(
      access_key: $access_key
      categories: $categories
      countries: "gb, us,"
      sort: "published_desc"
      keywords: $keywords
    ) {
      data {
        author
        category
        image
        description
        country
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }`;


  // fetch function with next js 13 caching
  const res = await fetch('https://bomjesusdaserra.stepzen.net/api/waxen-squirrel/__graphql',{ 
    method: 'POST',
    cache: isDynamic? "no-cache" : "default",
    next: isDynamic ? {revalidate: 0} : {revalidate: 20},
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body:JSON.stringify({
      query,
      variables: {
        access_key:process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      },
    }),
  });

  console.log(
    "LOADING NEW DATA FROM API for category >>>",
    category,
    keywords
  );

  const newsResponse = await res.json();

  // sort function by images vs not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);

  // return news
  return news ;
};


export default fetchNews;

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=02de9d8dd5259b06319e206a1b6d14aa"