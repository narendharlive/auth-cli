import { MyBlog1Page } from './app.po';

describe('my-blog1 App', function() {
  let page: MyBlog1Page;

  beforeEach(() => {
    page = new MyBlog1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
