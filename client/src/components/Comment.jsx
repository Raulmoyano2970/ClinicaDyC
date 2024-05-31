import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea, Dropdown } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PiPrinterLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import ModalReceta from '../pages/Receta/ModalReceta';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  //Modal
  const [estadoModal, setEstadoModal] = useState(false);
  const { postSlug } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggleHide = () => {
    setIsHidden(!isHidden);
  };

  if (isHidden) {
    return null; // Completely hide the comment if isHidden is true
  }

  return (
    <div className='flex '>
      <div className='grid grid-cols-12'>
        {/* <div className='flex items-center'>
          <span className='font-bold  mr-1 text-xs truncate nombreuser'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs spanfecha'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div> */}
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                onClick={handleSave}
              >
                Guardar
              </Button>
              <Button
                type='button'
                size='sm'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <>
            <ModalReceta
              state= {estadoModal}
              setState = {setEstadoModal}
            >
              <div className='flex items-start text-lg font'>
                  <h3 className='font-semibold pr-1'>Nombre: </h3>
                  <p>{post && post.contenido}</p>
              </div>
              <div className='flex items-start text-lg font'>
                  <h3 className='font-semibold pr-1'>Rut:</h3>
                  <p>{post && post.title}</p>
              </div>
              <div className='flex items-start text-lg font'>
                  <h3 className='font-semibold pr-1'>Edad: </h3>
                  <p> {post && post.edad} </p>
              </div>
              <div className='flex items-start text-lg font'>
                  <h3 className='font-semibold pr-1'>Sexo:</h3>
                  <p>{post && post.category}</p>
              </div>
              <div className='pt-4'>
                  <div className='text-lg'>
                      <h3 className='font-semibold'>Diagnostico</h3>
                      <p>Hola</p>
                  </div>
              </div>
              <div className='text-lg pt-10'>
                  <hr class="flex justify-center w-64 h-px mx-auto bg-gray-300 border-0 rounded md:my-1 dark:bg-gray-700"/>
                  <h3 className='flex justify-center font-semibold'>Firma Medico</h3>
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
            <p className='flex col-span-10 text-black-700 pr-2'>{comment.content}</p>
            <div className='flex flex-1 col-span-2 items-center text-xs dark:border-gray-700 max-w-fit gap-2 self-start'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-white megusta ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-white border-0	'>
                {/* {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')} */}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <Dropdown size='sm'>
                    <Dropdown.Item onClick={() => setEstadoModal(!estadoModal)}>
                      Ver
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleEdit}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete(comment._id)}>
                      Eliminar
                    </Dropdown.Item>
                    {/* <Dropdown.Item onClick={handleToggleHide}>
                      {isHidden ? 'Mostrar' : 'Ocultar'}
                    </Dropdown.Item> */}
                  </Dropdown>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}