import { SweMixPage } from './app.po';

describe('swe-mix App', () => {
  let page: SweMixPage;

  beforeEach(() => {
    page = new SweMixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
