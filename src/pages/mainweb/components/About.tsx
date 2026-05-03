// components/About.tsx

import Image from 'next/image'

export default function About() {
  return (
    <section className='about-section section-padding fix'>
      <div className='container'>
        <div className='about-wrapper'>
          <div className='row g-4 align-items-center'>
            <div className='col-lg-6'>
              <div className='about-image-box'>
                <div className='about-image'>
                  <Image src='/assets/img/about/about-1.png' alt='about' width={400} height={400} />
                </div>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='about-content'>
                <span className='sub-title'>About Us</span>

                <h2>
                  Safe, Fun & <span>Educational</span>
                </h2>

                <p>Dolor sit amet, consectetur adipiscing elit...</p>

                <a href='#' className='theme-btn'>
                  Online Admission
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
