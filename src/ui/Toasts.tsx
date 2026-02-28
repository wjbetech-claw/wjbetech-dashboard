import React, {createContext, useContext, useState, useCallback} from 'react'

type Toast = { id: string; message: string }

const ToastsContext = createContext<{ toasts: Toast[]; push: (m:string)=>void; remove: (id:string)=>void } | null>(null)

export function ToastsProvider({children}:{children:React.ReactNode}){
  const [toasts,setToasts]=useState<Toast[]>([])
  const push = useCallback((message:string)=>{
    const id = Math.random().toString(36).slice(2,9)
    setToasts(t=>[...t,{id,message}])
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4000)
  },[])
  const remove = useCallback((id:string)=>setToasts(t=>t.filter(x=>x.id!==id)),[])
  return (
    <ToastsContext.Provider value={{toasts,push,remove}}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 space-y-2 z-50">
        {toasts.map(t=> (
          <div key={t.id} className="bg-level-2 border-subtle rounded-md p-3 shadow-md">
            <div className="text-sm text-primary">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastsContext.Provider>
  )
}

export function useToasts(){
  const ctx = useContext(ToastsContext)
  if(!ctx) throw new Error('useToasts must be used within ToastsProvider')
  return ctx
}

export default ToastsProvider
