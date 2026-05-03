// components/Contact.tsx

export default function Contact() {
  return (
    <section className='contact-section'>
      <div className='container'>
        <h2>Contact Us</h2>

        <form>
          <input placeholder='Name' />
          <input placeholder='Email' />
          <textarea placeholder='Message'></textarea>
        </form>
      </div>
    </section>
  )
}
