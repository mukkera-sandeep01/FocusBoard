import { CalendarDays, MoreHorizontal, Pencil, Trash2, Check } from 'lucide-react'

function formatDate(date) {
  if (!date) return 'No due date'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' })
}

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const handleCheckClick = () => {
    const newStatus = task.status === 'Completed' ? 'To do' : 'Completed'
    onStatusChange(task.id, newStatus)
  }

  return (
    <article className="task-row">
      <button
        type="button"
        className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}
        onClick={handleCheckClick}
        aria-label={task.status === 'Completed' ? `Mark ${task.title} as not completed` : `Mark ${task.title} as completed`}
      >
        {task.status === 'Completed' && <Check size={13} />}
      </button>
      <div className="task-main">
        <h3 className={task.status === 'Completed' ? 'task-done' : ''}>{task.title}</h3>
        <p>{task.description || task.category}</p>
      </div>
      <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      <span className={`status status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
      <span className="task-date"><CalendarDays size={14} /> {formatDate(task.dueDate)}</span>
      <div className="task-actions">
        <button className="icon-button small" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={15} /></button>
        <button className="icon-button small danger-hover" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={15} /></button>
        <select
          className="status-select"
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          aria-label={`Change status for ${task.title}`}
        >
          <option>To do</option><option>In progress</option><option>Completed</option>
        </select>
      </div>
      <MoreHorizontal className="mobile-more" size={18} />
    </article>
  )
}
   