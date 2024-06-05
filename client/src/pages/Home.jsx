import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="bg-[url('/assets/bg-medical-image.jpg')] bg-cover bg-center flex items-center justify-center imghome">
      <div className="flex flex-col gap-6 p-6 px-3 max-w-6xl mx-auto text-center">
        <h1 className='text-white text-3xl font-bold lg:text-6xl'>Somos DyC Coloproctologia</h1>
        <p className='text-white text-xs sm:text-sm'>
          Nuestra sociedad dedicada a la investigacion de la medicina actual
        </p>
      </div>
      {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div> */}

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
}
