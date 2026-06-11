import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextValue'

const Navbar = () => {
  const location = useLocation()
  const { currentUser } = useContext(AuthContext)
  const avatarSrc = currentUser?.avatar || '/noavatar.jpg'
  const active =
    location.pathname === '/about'
      ? 'about'
      : location.pathname === '/contact'
        ? 'contact'
        : 'home'
  
  const links = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 flex min-h-[70px] items-center justify-between gap-3 border-b border-[#f0e0cc] bg-[#fff9f2]/95 px-3 py-3 shadow-[0_4px_24px_rgba(220,130,60,0.07)] backdrop-blur md:px-10">
      <Link to="/" className="flex min-w-0 items-center gap-2.5 no-underline">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_10px_26px_rgba(154,79,20,0.16)]">
          <img
            src="/logo.png"
            alt="YumLab logo"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <span className="block truncate font-serif text-lg font-bold leading-tight tracking-tight text-[#1a1008] sm:text-xl md:text-2xl">
            Yum<span className="text-orange-500">Lab</span>
          </span>
          <span className="hidden truncate text-[10px] font-bold uppercase tracking-[0.22em] text-[#b38353] sm:block">
            Video cooking studio
          </span>
        </div>
      </Link>

      <ul className="m-0 flex min-w-0 list-none items-center gap-1 p-0">
        {links.map(({ id, label, href }) => (
          <li key={id} className="hidden sm:block">
            <Link
              to={href}
              className={`rounded-full px-3 py-2 text-sm font-medium no-underline transition-all duration-200 md:px-4 ${
                active === id
                  ? 'bg-linear-to-r from-orange-400 to-red-500 text-white shadow-[0_3px_12px_rgba(249,115,22,0.3)]'
                  : 'text-[#5c3d1e] hover:bg-orange-50 hover:text-orange-500'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}

        <li className="ml-1 md:ml-2">
          {currentUser ? (
            <Link
              to="/profile"
              className="flex max-w-[48vw] items-center gap-2 rounded-full border border-orange-100 bg-white/90 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-[#3b2512] no-underline shadow-[0_10px_28px_rgba(154,79,20,0.13)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white hover:shadow-[0_14px_34px_rgba(154,79,20,0.18)] sm:max-w-[240px] md:gap-3 md:pr-4"
            >
              <img
                src={avatarSrc}
                alt={`${currentUser.username || 'User'} avatar`}
                onError={(e) => {
                  e.currentTarget.src = '/noavatar.jpg'
                }}
                className="h-11 w-11 shrink-0 rounded-full border-2 border-orange-100 object-cover shadow-[0_4px_12px_rgba(249,115,22,0.2)]"
              />
              <span className="min-w-0 truncate">
                {currentUser.username || 'User'}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-linear-to-r from-orange-400 to-red-500 px-4 py-2 text-sm font-semibold text-white no-underline shadow-[0_4px_14px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_rgba(249,115,22,0.45)] md:px-5"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
