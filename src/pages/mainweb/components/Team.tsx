// components/Team.tsx

import Image from 'next/image'

export default function Team({ teachers }: any) {
  return (
    <section className='team-section'>
      <div className='container'>
        <h2>Our Teachers</h2>

        <div className='row'>
          {teachers.map((t: any) => (
            <div key={t.id} className='col-md-4'>
              <Image src={t.image} alt={t.name} width={200} height={200} />
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
