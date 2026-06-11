import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextValue'
import api from '../api/axios'

const resizeAvatarFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const image = new Image()

      image.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = 360
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
        const width = Math.round(image.width * scale)
        const height = Math.round(image.height * scale)

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, width, height)

        resolve(canvas.toDataURL('image/jpeg', 0.78))
      }

      image.onerror = () => reject(new Error('Could not read this image.'))
      image.src = reader.result
    }

    reader.onerror = () => reject(new Error('Could not open this file.'))
    reader.readAsDataURL(file)
  })

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext)
  const fileInputRef = useRef(null)
  const [username, setUsername] = useState(currentUser?.username || '')
  const [avatar, setAvatar] = useState(currentUser?.avatar || '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [avatarChanged, setAvatarChanged] = useState(false)
  const avatarSrc = avatar.trim() || '/noavatar.jpg'

  const handleAvatarFile = async (file) => {
    setMessage('')
    setError('')

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file for your profile picture.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Please choose an image smaller than 5MB.')
      return
    }

    try {
      const resizedAvatar = await resizeAvatarFile(file)
      setAvatar(resizedAvatar)
      setAvatarChanged(true)
      setSelectedFileName(file.name)
      setMessage('New profile picture is ready. Save changes to update it.')
    } catch (error) {
      setError(error.message || 'Could not prepare this image.')
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleAvatarFile(event.dataTransfer.files?.[0])
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')

    try {
      const payload = {}
      const trimmedUsername = username.trim()

      if (trimmedUsername !== (currentUser?.username || '')) {
        payload.username = trimmedUsername
      }

      if (avatarChanged || avatar.trim() !== (currentUser?.avatar || '')) {
        payload.avatar = avatar.trim()
      }

      if (!Object.keys(payload).length) {
        setMessage('No profile changes to save.')
        return
      }

      const res = await api.put('/api/users/profile', payload)

      updateUser(res.data.user)
      setUsername(res.data.user.username || '')
      setAvatar(res.data.user.avatar || '')
      setAvatarChanged(false)
      setSelectedFileName('')
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
    <main className="min-h-[calc(100vh-70px)] bg-[#fff8ef] px-4 py-10 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-[0_28px_90px_rgba(154,79,20,0.14)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[420px] bg-[#160d07] p-7 text-white sm:p-10">
            <img
              src={avatarSrc}
              alt=""
              onError={(e) => {
                e.currentTarget.src = '/noavatar.jpg'
              }}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#160d07]/96 via-[#2d160a]/80 to-orange-500/46" />
            <div className="absolute inset-0 bg-linear-to-t from-[#160d07] via-transparent to-transparent" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-100">
                  Your YumLab space
                </p>
                <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                  Make your profile feel like you.
                </h1>
              </div>

              <div className="mt-10 rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm leading-7 text-white/78">
                  Upload a fresh profile picture, polish your username, and keep
                  your cooking corner looking warm.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">
                      Username
                    </p>
                    <p className="mt-1 truncate font-bold">
                      {currentUser?.username || 'Food lover'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">
                      Account
                    </p>
                    <p className="mt-1 truncate font-bold">
                      {currentUser?.email || 'No email'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="p-5 sm:p-8 lg:p-10">
            <div className="grid gap-8 xl:grid-cols-[260px_1fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
                  Profile picture
                </p>
                <div className="mt-5 flex flex-col items-center rounded-[30px] border border-orange-100 bg-[#fffaf3] p-5 text-center shadow-[0_18px_48px_rgba(154,79,20,0.08)]">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-orange-300 opacity-35 blur-2xl" />
                    <img
                      src={avatarSrc}
                      alt={`${currentUser?.username || 'User'} avatar`}
                      onError={(e) => {
                        e.currentTarget.src = '/noavatar.jpg'
                      }}
                      className="relative h-40 w-40 rounded-full border-4 border-white object-cover shadow-[0_18px_40px_rgba(154,79,20,0.22)]"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-1 rounded-full bg-[#1a1008] px-4 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(26,16,8,0.24)] transition hover:-translate-y-0.5 hover:bg-orange-500"
                    >
                      Change
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleAvatarFile(event.target.files?.[0])}
                    className="sr-only"
                  />

                  <div
                    onDragOver={(event) => {
                      event.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`mt-6 w-full rounded-[24px] border border-dashed p-5 transition ${
                      isDragging
                        ? 'border-orange-400 bg-orange-100'
                        : 'border-orange-200 bg-white'
                    }`}
                  >
                    <p className="font-serif text-2xl font-bold text-[#1a1008]">
                      Drop image here
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#7a6148]">
                      Or choose a file from your device. JPG, PNG, or WebP up to
                      5MB works nicely.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 h-11 rounded-full border border-orange-100 bg-orange-50 px-5 text-xs font-bold text-orange-500 transition hover:border-orange-200 hover:bg-orange-100"
                    >
                      Choose file
                    </button>
                    {selectedFileName && (
                      <p className="mt-3 truncate text-xs font-semibold text-[#9b7b60]">
                        Selected: {selectedFileName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
                    Profile settings
                  </p>
                  <h2 className="mt-3 break-words font-serif text-4xl font-bold leading-tight text-[#1a1008] sm:text-5xl">
                    Hello, {username || 'User'}.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#755943]">
                    Keep your account details simple and recognizable for your
                    YumLab cooking sessions.
                  </p>
                </div>

                <div className="mt-7 grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#3b2512]">
                      Username
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="h-13 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#3b2512]">
                      Paste avatar URL
                    </span>
                    <input
                      type="text"
                      value={avatar.startsWith('data:image/') ? '' : avatar}
                      onChange={(e) => {
                        setAvatar(e.target.value)
                        setAvatarChanged(true)
                        setSelectedFileName('')
                        setMessage('')
                        setError('')
                      }}
                      placeholder="https://example.com/avatar.jpg"
                      className="h-13 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                    {avatar.startsWith('data:image/') && (
                      <p className="mt-2 text-xs font-semibold text-[#9b7b60]">
                        A local image is selected. Save changes to use it.
                      </p>
                    )}
                  </label>

                  <div className="rounded-[24px] border border-orange-100 bg-[#fffaf3] px-5 py-4">
                    <p className="text-sm font-semibold text-[#7a6148]">Email</p>
                    <p className="mt-1 break-words text-base font-bold text-[#3b2512]">
                      {currentUser?.email || 'No email added'}
                    </p>
                  </div>
                </div>

                {message && (
                  <p className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {message}
                  </p>
                )}
                {error && (
                  <p className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                    {error}
                  </p>
                )}

                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 rounded-2xl bg-linear-to-r from-orange-400 to-red-500 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(249,115,22,0.42)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSaving ? 'Saving changes...' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="h-12 rounded-2xl border border-red-100 bg-red-50 px-6 text-sm font-bold text-red-500 shadow-[0_10px_24px_rgba(239,68,68,0.12)] transition hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-[0_16px_32px_rgba(239,68,68,0.22)]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
              .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Profile
