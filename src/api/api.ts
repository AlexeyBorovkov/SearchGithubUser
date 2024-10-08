interface SearchResult {
    items: User[];
    total_count: number;
  }
  
  interface User {
    id: number;
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  }
  
  const API_URL = "https://api.github.com";
  const TOKEN = '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'; 
  
  const fetchApi = async (url: string) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };
  
  export const searchUsers = async (
    query: string,
    sort: string = "followers",
    order: string = "desc",
    perPage: number = 10,
    page: number = 1
  ): Promise<SearchResult> => {
    const url = `/search/users?q=${query}&sort=${sort}&order=${order}&per_page=${perPage}&page=${page}`;
    const response = await fetchApi(url);
    const searchResult: SearchResult = {
      items: response.items,
      total_count: response.total_count,
    };
  
    const usersWithDetails = await Promise.all(
      searchResult.items.map(async (user) => {
        const userDetailsUrl = `/users/${user.login}`;
        const userDetailsResponse = await fetchApi(userDetailsUrl);
        return {
          ...user,
          ...userDetailsResponse,
          followers: userDetailsResponse?.followers,
          following: userDetailsResponse?.following,
          public_repos: userDetailsResponse?.public_repos,
        };
      })
    );
  
    return {
      items: usersWithDetails,
      total_count: searchResult.total_count,
    };
  };
  