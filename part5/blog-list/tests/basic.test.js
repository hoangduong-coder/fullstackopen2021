const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('basic testing', () => {
  test('total likes', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog);
    expect(result).toBe(36);
  });

  test('the most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog);
    expect(result.likes).toBe(12);
  });

  test('the most likes', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog);
    expect(result.author).toBe('Edsger W. Dijkstra');
  });
});
