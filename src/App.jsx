import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [nextStep, setNextStep] = useState('')
  const [error, setError] = useState('')

  const [followups, setFollowups] = useState(() => {
    const savedFollowups = localStorage.getItem('followups')
    return savedFollowups
      ? JSON.parse(savedFollowups)
      : [
          {
            id: 1,
            company: 'Nordmark Solutions',
            role: 'Frontend Intern',
            nextStep: 'Wait for feedback',
          },
          {
            id: 2,
            company: 'Pinecode Studio',
            role: 'Junior Frontend',
            nextStep: 'Send portfolio link',
          },
          {
            id: 3,
            company: 'Blue Fjord Digital',
            role: 'Web Content Assistant',
            nextStep: 'Prepare for interview',
          },
        ]
  })

  useEffect(() => {
    localStorage.setItem('followups', JSON.stringify(followups))
  }, [followups])

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    const trimmedNextStep = nextStep.trim()

    if (
      trimmedCompany === '' ||
      trimmedRole === '' ||
      trimmedNextStep === ''
    ) {
      setError('Please fill in all fields.')
      return
    }

    setError('')

    const newFollowup = {
      id: Date.now(),
      company: trimmedCompany,
      role: trimmedRole,
      nextStep: trimmedNextStep,
    }

    setFollowups([...followups, newFollowup])
    setCompany('')
    setRole('')
    setNextStep('')
  }

  return (
    <div className="page">
      <h1>Follow-Up Desk</h1>
      <h2>Keep track of your job follow-ups</h2>

      <form onSubmit={handleSubmit}>
        <h3>Add a new note</h3>

        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
        <input
          type="text"
          placeholder="Next step"
          value={nextStep}
          onChange={(event) => setNextStep(event.target.value)}
        />

        <button>Add note</button>
      </form>

      {error && <p className="errorMessage">{error}</p>}

      <h3>Application notes</h3>

      <ul className="notesList">
        {followups.map((item) => (
          <li className="noteItem" key={item.id}>
            <strong>{item.company}</strong>
            <div>{item.role}</div>
            <div>Next: {item.nextStep}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App