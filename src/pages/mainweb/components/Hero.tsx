// components/Hero.tsx

import Image from 'next/image'

export default function Hero() {
  return (
    <section className='hero-section hero-1 hero-bg fix'>
      <div className='container hero-container'>
        <div className='row g-4 align-items-center'>
          <div className='col-lg-5'>
            <div className='hero-content'>
              <h1 className='char-animation'>A Happy Place to Grow, Play And Learn</h1>

              <p>Kindergarten is an early childhood educational environment</p>

              <div className='hero-button'>
                <a href='#' className='theme-btn'>
                  Online Admission <i className='icon-arrow-icon'></i>
                </a>
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='hero-img'>
              <Image src='/assets/img/hero/hero1.png' alt='hero' width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
