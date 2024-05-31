import React from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import CommentSection from '../components/CommentSection';
import DashSidebar from '../components/DashSidebar';
import { TextInput } from 'flowbite-react';
import ModalReceta from './Receta/ModalReceta';
import CommentDiagnostic from '../components/CommentDiagnostic';
import VerReceta from './Receta/VerReceta';

//VISTA PERFIL PACIENTE
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  //Modal
  const [estadoModal, setEstadoModal] = useState(false);

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
              className="rounded-lg py-3 px-4 text-white bg-teal-600 hover:bg-teal-800"
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
          <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-6 top-28">
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
              <Link 
                onClick={() => setEstadoModal(!estadoModal)}
                className='w-full flex justify-center p-4 bg-teal-600 hover:bg-teal-800 text-white text-sm font-medium rounded-lg'>
                Nueva Receta
              </Link>
              <div className='w-full gap-4 transitions text-white text-sm font-medium px-2 py-1 rounded'>
                <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                >
                  <div className='flex items-start text-lg font'>
                      <h1 className='font-semibold pr-1'>Nombre: </h1>
                      <p>{post && post.contenido}</p>
                  </div>
                  <div className='flex items-start text-lg font'>
                      <h1 className='font-semibold pr-1'>Rut:</h1>
                      <p>{post && post.title}</p>
                  </div>
                  <div className='flex items-start text-lg font'>
                      <h1 className='font-semibold pr-1'>Edad: </h1>
                      <p> {post && post.edad} </p>
                  </div>
                  <div className='flex items-start text-lg font'>
                      <h1 className='font-semibold pr-1'>Sexo:</h1>
                      <p>{post && post.category}</p>
                  </div>
                  <div className='pt-4'>
                      <div className='text-lg'>
                          <h1 className='font-semibold pb-3'>Diagnostico</h1>
                          <CommentDiagnostic postId={post._id} />
                      </div>
                  </div>
                </ModalReceta>
              </div>
            </div>
            <CommentSection postId={post._id}/>
          </div>
        </div>
      </main>
    </div>
  );
}