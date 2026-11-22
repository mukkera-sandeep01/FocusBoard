import { useState } from 'react'
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react'

const slides = [
  {
    eyebrow: 'A SMALL REMINDER',
    title: 'Focus on progress, not perfection.',
    body: 'A little progress every day adds up to big results.',
  },
  {
    eyebrow: 'WORK SMARTER',
    title: 'Break big tasks into smaller steps.',
    body: 'Clear, manageable actions make it easier to get started.',
  },
  {
    eyebrow: 'TAKE A BREATH',
    title: 'Make time to recharge.',
    body: 'Short breaks can help you return with fresh energy.',
  },
]

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const changeSlide = (direction) => {
    setActive((current) => (current + direction + slides.length) % slides.length)
  }
  const slide = slides[active]

  return (
    <section className="focus-note" aria-label="Focus notes carousel">
      <div className="note-symbol"><Lightbulb size={22} /></div>
      <div className="note-copy" aria-live="polite">
        <span className="eyebrow">{slide.eyebrow}</span>
        <h3>{slide.title}</h3>
        <p>{slide.body}</p>
      </div>
      <div className="carousel-controls">
        <button className="icon-button" onClick={() => changeSlide(-1)} aria-label="Previous note">
          <ArrowLeft size={17} />
        </button>
        <div className="dots" aria-label={`Slide ${active + 1} of ${slides.length}`}>
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              className={`dot ${index === active ? 'active' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
        <button className="icon-button" onClick={() => changeSlide(1)} aria-label="Next note">
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  )
}
