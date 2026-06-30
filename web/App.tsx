import { useState } from 'react'
import type { Post } from '../src/types'
import { useCats } from '../src/hooks/useCats'
import { currentUser } from '../src/data/userData'
import Navbar from '../src/components/NavBar/Navbar'
import Stories from '../src/components/Stories/Stories'
import Feed from '../src/components/Feed/Feed'
import Profile from '../src/components/Profile/Profile'
import PostDetail from '../src/components/PostDetail/PostDetail'

function App() {
  const { posts, loading, error } = useCats()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeView, setActiveView] = useState<'feed' | 'profile'>('feed')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {
      if (prev.has(postId)) {
        return new Set(Array.from(prev).filter((id) => id !== postId))
      }
      return new Set([...prev, postId])
    })
  }

  return (
    <div className="app">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <div className="layout">
        <main className="main">
          {loading && <p className="loadingMsg">Cargando gatos...</p>}
          {error && <p className="errorMsg">{error}</p>}
          {!loading && !error && activeView === 'feed' && (
            <>
              <Stories posts={posts} />
              <Feed
                posts={posts}
                likedIds={likedIds}
                onToggleLike={handleToggleLike}
                onSelectPost={setSelectedPost}
              />
            </>
          )}
          {!loading && !error && activeView === 'profile' && (
            <Profile
              user={currentUser}
              posts={posts}
              onSelectPost={setSelectedPost}
            />
          )}
        </main>
      </div>
      <PostDetail
        post={selectedPost}
        liked={selectedPost ? likedIds.has(selectedPost.id) : false}
        onToggleLike={handleToggleLike}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}

export default App
