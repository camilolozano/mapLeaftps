import { OpenMapPage } from './app.po';

describe('open-map App', () => {
  let page: OpenMapPage;

  beforeEach(() => {
    page = new OpenMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
