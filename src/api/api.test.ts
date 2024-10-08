import { searchUsers } from "./api";

describe('searchUsers', () => {
  it('должен вернуть объект SearchResult с items и total_count', async () => {
    const query = 'test';
    const response = await searchUsers(query);
    expect(response).toHaveProperty('items');
    expect(response).toHaveProperty('total_count');
  });

  it('должен вернуть массив объектов User с деталями', async () => {
    const query = 'test';
    const response = await searchUsers(query);
    expect(response.items).toBeInstanceOf(Array);
    response.items.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('avatar_url');
      expect(user).toHaveProperty('public_repos');
      expect(user).toHaveProperty('followers');
      expect(user).toHaveProperty('following');
    });
  });

  it('должен бросить ошибку, если запрос API fails', async () => {
    const query = 'test';
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.reject(new Error('API request failed'));
    });
    await expect(searchUsers(query)).rejects.toThrowError('API request failed');
  });
//   it('должен корректно обрабатывать пагинацию', async () => {
//     const query = 'test';
//     const perPage = 5;
//     const page = 2;
//     const response = await searchUsers(query, 'followers', 'desc', perPage, page);
//     expect(response.items).toHaveLength(perPage);
//   });
});
