import puppeteer from 'puppeteer'

describe('Home', () => {
    let browser
    let page

    beforeAll(async () => {
         browser = await puppeteer.launch({headless:false})
         page = await browser.newPage();
    })

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    })

    afterEach(() => page.close())


    it('home should be rendered successfully', async () => {
        const text = await page.evaluate(() => document.body.innerHTML)
        expect(text).toContain('Popular Movies')
    })

    it('home href', async () => {
        expect(`${location.href}`).toContain('localhost')
    })
    it('search function on home page e2etests', async () => {
        await page.waitFor(1000);
        await page.click('#root > div > div > div > div.logo-container > div > input');
        await page.keyboard.type('a star is born');
        await page.keyboard.press('Enter')
        await page.waitFor(1000);
        const text = await page.evaluate(() => document.body.innerHTML)
        expect(text).toContain('A Star Is Born')


    })
    it('click a movie should go to movie detail page', async () => {
        await page.waitFor(1000);
        page.click('#root > div > div > div > div.home-content > div.movies-list > div:nth-child(1) > div.card-item-gallery > a')
        await page.waitFor(1000);
        const text = await page.evaluate(() => document.body.innerHTML)
        expect(text).toContain('In a series of escalating encounters, security guard Dav')
    })
    it('click previous button on a movie detail page should go to home page', async () => {
        await page.waitFor(1000);
        page.click('#root > div > div > div > div.home-content > div.movies-list > div:nth-child(1) > div.card-item-gallery > a')
        await page.waitFor(1000);
        page.click('#root > div > div > section > div.movie-header > span')
        await page.waitFor(1000);
        const text = await page.evaluate(() => document.body.innerHTML)
        expect(text).toContain('Popular Movies')
    })
    afterAll(() => browser.close())
})
