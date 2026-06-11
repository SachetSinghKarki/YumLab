import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextValue'
import api from '../api/axios'

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext)
  const [username, setUsername] = useState(currentUser?.username || '')
  const [avatar, setAvatar] = useState(currentUser?.avatar || '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const avatarSrc = avatar.trim() || '/noavatar.jpg'

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await api.put(
        '/api/users/profile',
        {
          username,
          avatar,
        }
      )

      updateUser(res.data.user)
      setUsername(res.data.user.username || '')
      setAvatar(res.data.user.avatar || '')
      setMessage('Profile updated successfully.')
    } catch (error) {
      console.log(error.message)
      setError(error.response?.data?.msg || 'Profile update failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.log(error.message)
    } finally {
      updateUser(null)
      navigate('/login', { replace: true })
    }
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fff7ed] px-4 py-10 sm:px-6 lg:px-10">
      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_24px_70px_rgba(154,79,20,0.14)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-80 bg-linear-to-br from-orange-400 via-red-400 to-[#3b2512] p-8 text-white sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,247,237,0.22),transparent_36%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-100">
                Your profile
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Welcome back, {currentUser?.username || 'food lover'}.
              </h1>
            </div>
            <p className="mt-8 max-w-sm text-sm leading-6 text-white/80">
              Keep your YumLab profile fresh and ready for your next craving.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10 lg:items-start lg:text-left">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-orange-300 blur-2xl opacity-35" />
            <img
              src={avatarSrc}
              alt={`${currentUser?.username || 'User'} avatar`}
              onError={(e) => {
                e.currentTarget.src = '/noavatar.jpg'
              }}
              className="relative h-36 w-36 rounded-full border-4 border-white object-cover shadow-[0_18px_40px_rgba(154,79,20,0.22)] sm:h-44 sm:w-44"
            />
          </div>

          <form onSubmit={handleProfileUpdate} className="mt-8 w-full">
            <p className="text-sm font-semibold text-orange-500">Username</p>
            <h2 className="mt-2 break-words font-serif text-4xl font-bold text-[#1a1008]">
              {username || 'User'}
            </h2>

            <label className="mt-6 block text-left">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Update username
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                required
              />
            </label>

            <label className="mt-5 block text-left">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Avatar image URL
              </span>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </label>

            {message && (
              <p className="mt-4 text-sm font-semibold text-green-600">
                {message}
              </p>
            )}
            {error && (
              <p className="mt-4 text-sm font-semibold text-red-500">
                {error}
              </p>
            )}

            <div className="mt-6 w-full rounded-2xl border border-orange-100 bg-orange-50/70 px-5 py-4 text-left">
              <p className="text-sm font-semibold text-[#7a6148]">Email</p>
              <p className="mt-1 break-words text-base font-bold text-[#3b2512]">
                {currentUser?.email || 'No email added'}
              </p>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="h-12 rounded-2xl bg-linear-to-r from-orange-400 to-red-500 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(249,115,22,0.42)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="h-12 rounded-2xl border border-red-100 bg-red-50 px-6 text-sm font-bold text-red-500 shadow-[0_10px_24px_rgba(239,68,68,0.12)] transition hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-[0_16px_32px_rgba(239,68,68,0.22)]"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Profile
