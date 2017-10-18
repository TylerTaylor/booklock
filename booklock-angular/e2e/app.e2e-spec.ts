import { BooklockAngularPage } from './app.po';

describe('booklock-angular App', () => {
  let page: BooklockAngularPage;

  beforeEach(() => {
    page = new BooklockAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
