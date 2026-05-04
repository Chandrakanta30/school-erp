// components/Programs.tsx

type Program = {
  id: number
  title: string
  age: string
  desc: string
}

export default function Programs({ data }: { data?: Program[] }) {
  const programs = data?.length ? data : [{ id: 1, title: 'Toddler', age: '1.5 - 3 years', desc: 'Learning basics' }]

  return (
    <section className='program-section section-padding pt-0 fix'>
      <div className='container'>
        <div className='row g-4'>
          {programs.map(program => (
            <div className='col-xl-3 col-lg-4 col-md-6' key={program.id}>
              <div className='program-box-item'>
                <div className='program-icon'>
                  <img src='/assets/img/program/book.png' alt='' />
                </div>

                <div className='program-content'>
                  <h3>{program.title}</h3>
                  <span>({program.age})</span>
                  <p>{program.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
