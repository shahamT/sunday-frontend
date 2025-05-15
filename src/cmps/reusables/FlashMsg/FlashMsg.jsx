import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../../../services/base/event-bus.service.js"
import './FlashMsg.scss'


export function FlashMsg() {
    const [msg, setMsg] = useState(null)
    const [visible, setVisible] = useState(false)
    const timeoutRef = useRef()
    const entranceDelayRef = useRef()
  
    useEffect(() => {
      const unsubscribe = eventBusService.on('show-flash-msg', (msg) => {
        setMsg(msg)
  
        // Wait a tick to trigger animation
        entranceDelayRef.current = setTimeout(() => {
          setVisible(true)
        }, 10)
  
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          closeMsg()
        }, 3000)
      })
  
      return () => {
        unsubscribe()
        clearTimeout(timeoutRef.current)
        clearTimeout(entranceDelayRef.current)
      }
    }, [])
  
    function closeMsg() {
      setVisible(false)
      setTimeout(() => {
        setMsg(null)
      }, 300)
    }
  
    if (!msg) return null
  
    return (
      <section className={`flash-msg ${msg.type} ${visible ? 'show' : ''}`}>
        <div className={`icon ${msg.type === 'success' ?'i-Check' : 'i-Alert' }`}></div><p>{msg.txt}</p>
      </section>
    )
  }

//   usage
// showErrorMsg('i am an error')
// showSuccessMsg('i am a success')