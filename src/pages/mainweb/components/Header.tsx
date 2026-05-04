// components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
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
                <img src='/assets/img/logo/black-logo.svg' alt='logo' />
              </Link>
            </div>

            <nav className='main-menu'>
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
              </ul>
            </nav>

            <div className='header-right'>
              <a href='#' className='theme-btn'>
                Start Learning <i className='icon-arrow-icon'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
