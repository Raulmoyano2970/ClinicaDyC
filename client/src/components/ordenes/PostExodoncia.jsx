import { Alert, Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CommentPostExodoncia({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 1000) {
      return;
    }
    const strippedComment = stripHtml(comment);
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: strippedComment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (value) => {
    setComment(value);
  };

    return (
        <div className='max-w-2xl mx-auto w-full'>
            {currentUser && (
            <form onSubmit={handleSubmit} className=''>
                <div className=''>
                    <div>
                        <h3 className=''>Estimado paciente: </h3>
                    </div>
                    <div>
                        <p>Se informa que luego de ser sometido a una exodoncia usted debe cumplir las siguientes indicaciones: </p>
                    </div>
                    <div>
                        <p>1. Reposo relativo por dos días. Reposo deportivo por 5 días. Dormir con la cabeza elevada por dos días. </p>
                    </div>
                    <div>
                        <p>2. Régimen papilla licuada fría/tibia por dos días. Luego continuar con régimen blando hasta el control.  </p>
                    </div>
                    <div>
                        <p>3. Frío local intermitente por dos días. Luego calor local por 2 días. </p>
                    </div>
                    <div>
                        <p>4. Higiene oral con cepillado suave después de cada comida.  </p>
                    </div>
                    <div>
                        <p>5. No fumar ni beber alcohol.  </p>
                    </div>
                    <div>
                        <p>6. Solicitar control SOS en caso de: dolor intenso que no cede con la analgesia, sangrado activo, fiebre, dolor o dificultad para tragar. </p>
                    </div>
                </div>
                <div className='flex place-content-end items-center mt-5'>
                    <Button type='submit'>
                    Guardar
                    </Button>
                </div>
                {commentError && (
                    <Alert color='failure' className='mt-5'>
                    {commentError}
                    </Alert>
                )}
            </form>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
            <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                        Estas eliminando este archivo completamente del registro, eliminar?
                        </h3>
                        <div className='flex justify-center gap-4'>
                        <Button
                            color='failure'
                            onClick={() => handleDelete(commentToDelete)}
                        >
                            Si, eliminar
                        </Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>
                            No, cancelar
                        </Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
        </div>
  );
}
