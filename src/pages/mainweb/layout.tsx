// app/layout.tsx

import Script from 'next/script'
import Link from 'next/link'

export const metadata = {
  title: 'Kidza - Kindergarten',
  description: 'Kindergarten & School Template'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {/* ================= PRELOADER ================= */}
        <div id='preloader' className='preloader'>
          <div className='animation-preloader'>
            <div className='spinner'></div>
            <div className='txt-loading'>
              {'KIDZA'.split('').map((l, i) => (
                <span key={i} className='letters-loading'>
                  {l}
                </span>
              ))}
            </div>
            <p className='text-center'>Loading</p>
          </div>
        </div>

        {/* ================= BACK TO TOP ================= */}
        <button id='back-top' className='back-to-top'>
          <i className='far fa-arrow-up'></i>
        </button>

        {/* ================= CURSOR ================= */}
        <div className='mouseCursor cursor-outer'></div>
        <div className='mouseCursor cursor-inner'></div>

        {/* ================= OFFCANVAS ================= */}
        <div className='fix-area'>
          <div className='offcanvas__info'>
            <div className='offcanvas__wrapper'>
              <div className='offcanvas__content'>
                <div className='offcanvas__top d-flex justify-content-between'>
                  <div className='offcanvas__logo'>
                    <img src='/assets/img/logo/black-logo.svg' alt='Kidza' />
                  </div>
                </div>

                <h3>Hello There!</h3>
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
            </div>
          </div>
        </div>

        <div className='offcanvas__overlay'></div>

        {/* ================= HEADER ================= */}
        <header className='header-section'>
          <div className='header-top-section'>
            <div className='container'>
              <div className='header-top-wrapper'>
                <p>
                  Kindergarten is an early childhood educational environment
                  <a href='#'> Learn More</a>
                </p>
              </div>
            </div>
          </div>

          <div className='header-1'>
            <div className='container'>
              <div className='header-main'>
                <div className='header-left'>
                  <Link href='/' className='header-logo'>
                    <img src='/assets/img/logo/black-logo.svg' alt='Kidza' />
                  </Link>
                </div>

                <div className='mean__menu-wrapper'>
                  <nav>
                    <ul>
                      <li>
                        <Link href='/'>Home</Link>
                      </li>
                      <li>
                        <a href='#'>Programs</a>
                      </li>
                      <li>
                        <a href='#'>Blog</a>
                      </li>
                      <li>
                        <a href='#'>Shop</a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className='header-right'>
                  <a href='#' className='theme-btn'>
                    Start Learning <i className='icon-arrow-icon'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        {children}

        {/* ================= FOOTER ================= */}
        <footer className='footer-section'>
          <div className='container'>
            <div className='footer-widgets-wrapper'>
              <div className='row'>
                <div className='col-xl-4'>
                  <img src='/assets/img/footer/Logo.svg' alt='Kidza' />
                  <p>Kidza is an early childhood education school...</p>
                </div>

                <div className='col-xl-2'>
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <a href='#'>Courses</a>
                    </li>
                    <li>
                      <a href='#'>Program</a>
                    </li>
                  </ul>
                </div>
              </div>

              <p className='footer-bottom'>© Kidza 2026. All Rights Reserved</p>
            </div>
          </div>
        </footer>

        {/* ================= SCRIPTS ================= */}

        {/* Bootstrap only (safe) */}
        <Script src='/assets/js/bootstrap.bundle.min.js' strategy='lazyOnload' />

        {/* ❌ DO NOT LOAD THESE (replace later)
            jquery.js
            wow.js
            gsap.js
            meanmenu.js
        */}
      </body>
    </html>
  )
}
