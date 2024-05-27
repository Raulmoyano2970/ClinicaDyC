import React from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import patient_8638075 from '../assets/patient_8638075.png';
import adduser from '../assets/add-user.png';
import CommentSection from '../components/CommentSection';
import DashSidebar from '../components/DashSidebar';

//VISTA PERFIL PACIENTE
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* DASHBOARD PATIENT */}
      <main className='p-2 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {/* BUTTON BACK */}
        <div className="flex gap-4 pt-1">
          <Link
              to="/dashboard?tab=posts"
              className="rounded-lg py-3 px-4 text-md bg-gray-500 bg-opacity-10"
            >
              <IoArrowBackOutline />
            </Link>
            <div className='flex'>
              <h1 className="self-center text-xl font-semibold">{post && post.contenido}</h1>
            </div>
        </div>
        {/* CONTAINER CARDS */}
        <div className='grid grid-cols-12 gap-6 my-2 items-start'>
          {/* LEFT CARD */}
          <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-6 lg:sticky top-28">
            <div class="space-y-4 xl:space-y-6">
              <img class="mx-auto rounded-full h-36 w-36" src={'https://static.vecteezy.com/system/resources/previews/021/352/965/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png'} alt="author avatar"/>
              <div class="space-y-2">
                <div class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                  <h3 class="text-xl font-semibold">{post && post.contenido}</h3>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.title}</p>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.edad}</p>
                  <p class="text-gray-500 dark:text-indigo-300">cel: {post && post.celular}</p>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.email}</p>
                  <p class="text-gray-500 dark:text-indigo-300">Tel emergencia: {post && post.celularemergencia}</p>
                  <Button color='gray' pill size='xs'>
                    {post && post.category}
                  </Button>
                  <Button color='gray' pill size='xs'>
                    {post && post.sanguineo}
                  </Button>
                  <Button color='gray' pill size='xs'>
                    {post && post.direccion}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT CARD */}
          <div className="col-span-12 lg:col-span-8 bg-gray-500 bg-opacity-10 rounded-xl p-6">
            <div className='grid grid-cols-3 pb-5'>
              <h1 className='flex text-center items-center'>
                Historial Medico
              </h1>
              <p></p>
              <Button className='w-full gap-4 hover:opacity-80 transitions text-white text-sm font-medium px-2 py-1 rounded'>
                Nueva Receta
              </Button>
            </div>
            <div class="grid grid-cols-12 gap-6 my-2 bg-gray-500 bg-opacity-10 rounded-lg p-6">
              <div class="flex col-span-2 ">
                <h1>Fecha</h1>
              </div>
              <div class="flex col-span-9">
                <div>
                  <h1 className='text-gray-500 pr-2'>Observaciones:</h1>
                </div>
                <div
                  className='pr-12 max-w-2xl mx-auto w-full post-content'
                  dangerouslySetInnerHTML= {{__html:post && post.content }}
                ></div>
              <div className='flex col-span-1'>
                <Link class="text-lg font-bold text-teal-600">
                  Ver
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
        <CommentSection postId={post._id} />
      </main>
    </div>
  );
}

{/* <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <div>
          <h1 className='p-5'>
            Paciente N*
          </h1>
        </div>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.title}
        </h1>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.contenido}
        </h1>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.celular}
        </h1>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.celularemergencia}
        </h1>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.email}
        </h1>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.edad}
        </h1>
        <Link
          to={`/search?category=${post && post.category}`}
          className='self-center mt-5'
          >
          <Button color='gray' pill size='xs'>
            {post && post.category}
          </Button>
        </Link>
        {/* <img
          src={post && post.image}
          alt={post && post.title}
          className='mt-10 p-3 max-h-[600px] w-full object-cover'
        /> */}
        {/* <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className='italic'>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className='p-3 max-w-2xl mx-auto w-full post-content'
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div> */}
        {/* <div className='max-w-4xl mx-auto w-full'>
          <CallToAction />
        </div> */}
        // <CommentSection postId={post._id} />

        {/* <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            </div> */}
      // </main> */}