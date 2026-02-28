import React from 'react'

export default function EmptyState({title, description, action}: {title:string, description?:string, action?:React.ReactNode}){
  return (
    <div className="bg-level-1 border-subtle rounded-md p-6 text-center" role="status" aria-live="polite">
      <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
      {description && <p className="text-sm text-muted mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
