import { MeantoPage } from './app.po';

describe('meanto App', () => {
  let page: MeantoPage;

  beforeEach(() => {
    page = new MeantoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
