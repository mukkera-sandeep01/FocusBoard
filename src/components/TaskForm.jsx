import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyTask = {
  title: '',
  description: '',
  category: 'Personal',
  status: 'To do',
  priority: 'Medium',
  dueDate: '',
}

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || emptyTask)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(task || emptyTask)
    setError('')
  }, [task])

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Please enter a task title.')
      return
    }
    if (!form.dueDate) {
      setError('Please choose a due date.')
      return
    }
    onSave({ ...form, title: form.title.trim() })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">{task ? 'UPDATE YOUR WORK' : 'MAKE IT HAPPEN'}</span>
            <h2 id="form-title">{task ? 'Edit task' : 'Create a task'}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X size={19} /></button>
        </div>
        <form onSubmit={submit} className="task-form">
          <label>
            Task title <span className="required">*</span>
            <input name="title" value={form.title} onChange={update} placeholder="e.g. Prepare presentation" autoFocus />
          </label>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={update} placeholder="Add a few details..." rows="3" />
          </label>
          <div className="form-grid">
            <label>
              Status
              <select name="status" value={form.status} onChange={update}>
                <option>To do</option><option>In progress</option><option>Completed</option>
              </select>
            </label>
            <label>
              Priority
              <select name="priority" value={form.priority} onChange={update}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
          </div>
          <div className="form-grid">
            <label>
              Category
              <select name="category" value={form.category} onChange={update}>
                <option>Personal</option><option>Planning</option><option>Design</option>
                <option>Development</option><option>Testing</option><option>Documentation</option>
                <option>Work</option>
              </select>
            </label>
            <label>
              Due date <span className="required">*</span>
              <input type="date" name="dueDate" value={form.dueDate} onChange={update} />
            </label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button type="button" className="button button-quiet" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
