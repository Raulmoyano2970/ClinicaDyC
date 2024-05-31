import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PiPrinterLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import ModalReceta from './ModalReceta';

//VISTA PERFIL PACIENTE
export default function VerReceta() {
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
        <ModalReceta>
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
                        <h1 className='font-semibold pl-4'>Diagnostico</h1>
                        <p>Hola</p>
                    </div>
                </div>
                <div className='text-lg pt-10'>
                    <hr class="flex justify-center w-64 h-px mx-auto bg-gray-300 border-0 rounded md:my-1 dark:bg-gray-700"/>
                    <h1 className='flex justify-center font-semibold'>Firma Medico</h1>
                </div>
                <div className="download pt-2">
                    <button
                        className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                        >Descargar
                        <IoCloudDownloadOutline className="pl-2 inline w-7 h-7"/>
                    </button>
                    <button
                        className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                        >Imprimir 
                        <PiPrinterLight className="pl-1 inline w-7 h-7"/>
                    </button>
                    <button
                        className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                        >Guardar
                        <CiSaveDown2 className="pl-1 inline w-7 h-7"/>
                    </button>
                </div>
        </ModalReceta>
    )
}