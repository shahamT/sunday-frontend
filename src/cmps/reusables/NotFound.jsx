import { useNavigate } from "react-router-dom"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="not-found">
      <div className="not-found-content">
        <img src="/assets/img/logo/sn-icon.png" alt="SNoogle logo" className="not-found-logo" />
        <h1>Page Not Found</h1>
        <p>Oops, the page you’re looking for doesn’t exist.</p>
        <button onClick={() => navigate('/home')}>Go Home</button>
      </div>
    </section>
  )
}

