// components/Blog.tsx

export default function Blog({ blogs }: any) {
  return (
    <section className='news-section'>
      <div className='container'>
        <h2>Latest News</h2>

        {blogs.map((b: any) => (
          <div key={b.id}>
            <h3>{b.title}</h3>
            <p>{b.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
