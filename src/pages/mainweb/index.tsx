// app/page.tsx

import Header from '@/src/pages/mainweb/components/Header'
import Hero from '@/src/pages/mainweb/components/Hero'
import About from '@/src/pages/mainweb/components/About'
import Programs from '@/src/pages/mainweb/components/Programs'
import Classes from '@/src/pages/mainweb/components/Classes'
import Choose from '@/src/pages/mainweb/components/Choose'
import Team from '@/src/pages/mainweb/components/Team'
import Counter from '@/src/pages/mainweb/components/Counter'
import Session from '@/src/pages/mainweb/components/Session'
import Testimonial from '@/src/pages/mainweb/components/Testimonial'
import Blog from '@/src/pages/mainweb/components/Blog'
import Contact from '@/src/pages/mainweb/components/Contact'
import Footer from '@/src/pages/mainweb/components/Footer'

export default function HomePage() {
  const programs = [{ id: 1, title: 'Toddler', age: '1.5–3', desc: 'Learning basics' }]

  const teachers = [{ id: 1, name: 'John', role: 'Teacher', image: '/assets/img/team/team1.png' }]

  const blogs = [{ id: 1, title: 'Fun Learning', date: '2026' }]

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Programs data={programs} />
      <Classes />
      <Choose />
      <Team teachers={teachers} />
      <Counter />
      <Session />
      <Testimonial />
      <Blog blogs={blogs} />
      <Contact />
      <Footer />
    </>
  )
}
