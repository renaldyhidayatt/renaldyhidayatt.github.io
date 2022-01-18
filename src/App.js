import './App.css'

function App() {
  return (
    <div>
      <div className="site-content">
        <h1 className="glitch" data-glitch="Renaldy Hidayat">Renaldy Hidayat</h1>
      </div>
      <hr />
      <section className='about'>
        <div className='title-container'>
          <h2>About</h2>
          <p className='about-title'>
            I have always loved to push the boundaries of what I am capable of when it comes to coding. I am passionate about creating unique and stunning websites that don't follow your typical ruberic. I strive to learn more about the ever-evolving internet to better myself through experience.
          </p>
        </div>
        <div className='container'>
          <div className='image'>
            <img src="assets/institutional.jpg" alt="" />
          </div>
        </div>
      </section>

      <hr />

      <section className="portfolio defaultMargin" id="portfolio">
        <div className="title__container">
          <h2>Our Portfolio</h2>
          <p>We have already built amazing things for our customers.</p>
        </div>
        <div className="container">
          <div className="design">
            <div className="background"></div>
            <div className="portfolio__container">
              <h3>New Django</h3>
              <p>An impressive website for any kind of News.</p>
              <div className="image">
                <img src="./assets/po2.png" alt="" />
              </div>
            </div>
          </div>
          <div className="portfolio__container">
            <h3>Portfloio Website</h3>
            <p>A portolio that lands you all the offers you need.</p>
            <div className="image">
              <img src="./assets/po1.png" alt="" />
            </div>
          </div>
          <div className="design right">
            <div className="background"></div>
            <div className="portfolio__container">
              <h3>Ecommerce React</h3>
              <p> Ecommerce Fastapi react with Payment gateway </p>
              <div className="image">
                <img src="./assets/po3.png" alt="fastapi" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tagbar">
        <div className="label">Follow Me</div>
        <div className="spacer"></div>
        <div className="item"><span>Github</span></div>
        <div className="item"><span>Instagram</span></div>
      </div>
      <hr />
      <div className="lower__footer">
        <span>Enjoy te low price. We are tracking any intention of piracy.</span>
        <span>&copy; 2021 all rights reserved.</span>
      </div>
    </div>
  );
}

export default App;
