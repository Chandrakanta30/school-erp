// components/Programs.tsx

export default function Programs() {
  return (
    <section className='program-section section-padding pt-0 fix'>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-xl-3 col-lg-4 col-md-6'>
            <div className='program-box-item'>
              <div className='program-icon'>
                <img src='/assets/img/program/book.png' />
              </div>

              <div className='program-content'>
                <h3>Toddler</h3>
                <span>(1.5 – 3 years)</span>
                <p>Dolor sit amet...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
