import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea, Dropdown } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

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
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200 imagenmodal'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold  mr-1 text-xs truncate nombreuser'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs spanfecha'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
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
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Guardar
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-black pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-white hover:text-blue-500 megusta ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-white'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <Dropdown label="" size='sm' gradientDuoTone='purpleToBlue' outline>
                    <Dropdown.Item onClick={handleEdit}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete(comment._id)}>
                      Borrar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleToggleHide}>
                      {isHidden ? 'Mostrar' : 'Ocultar'}
                    </Dropdown.Item>
                  </Dropdown>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}








// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import { FaThumbsUp } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Button, Textarea, Dropdown } from 'flowbite-react';

// export default function Comment({ comment, onLike, onEdit, onDelete }) {
//   const [user, setUser] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isHidden, setIsHidden] = useState(false);
//   const [editedContent, setEditedContent] = useState(comment.content);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await fetch(`/api/user/${comment.userId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     getUser();
//   }, [comment]);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedContent(comment.content);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`/api/comment/editComment/${comment._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: editedContent,
//         }),
//       });
//       if (res.ok) {
//         setIsEditing(false);
//         onEdit(comment, editedContent);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleToggleHide = () => {
//     setIsHidden(!isHidden);
//   };

//   return (
//     <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
//       <div className='flex-shrink-0 mr-3'>
//         <img
//           className='w-10 h-10 rounded-full bg-gray-200 imagenmodal'
//           src={user.profilePicture}
//           alt={user.username}
//         />
//       </div>
//       <div className='flex-1'>
//         <div className='flex items-center mb-1'>
//           <span className='font-bold  mr-1 text-xs truncate nombreuser'>
//             {user ? `@${user.username}` : 'anonymous user'}
//           </span>
//           <span className='text-gray-500 text-xs spanfecha'>
//             {moment(comment.createdAt).fromNow()}
//           </span>
//         </div>
//         {isHidden ? (
//           <p className='text-gray-500 italic'></p>
//         ) : (
//           <>
//             {isEditing ? (
//               <>
//                 <Textarea
//                   className='mb-2'
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                 />

//                 <div className='flex justify-end gap-2 text-xs'>
//                   <Button
//                     type='button'
//                     size='sm'
//                     gradientDuoTone='purpleToBlue'
//                     onClick={handleSave}
//                   >
//                     Guardar
//                   </Button>
//                   <Button
//                     type='button'
//                     size='sm'
//                     gradientDuoTone='purpleToBlue'
//                     outline
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancelar
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className='text-black pb-2'>{comment.content}</p>
//                 <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
//                   <button
//                     type='button'
//                     onClick={() => onLike(comment._id)}
//                     className={`text-white hover:text-blue-500 megusta ${
//                       currentUser &&
//                       comment.likes.includes(currentUser._id) &&
//                       '!text-blue-500'
//                     }`}
//                   >
//                     <FaThumbsUp className='text-sm' />
//                   </button>
//                   <p className='text-white'>
//                     {comment.numberOfLikes > 0 &&
//                       comment.numberOfLikes +
//                         ' ' +
//                         (comment.numberOfLikes === 1 ? 'like' : 'likes')}
//                   </p>
//                   {currentUser &&
//                     (currentUser._id === comment.userId ||
//                       currentUser.isAdmin) && (
//                       <Dropdown label="" size='sm' gradientDuoTone='purpleToBlue' outline>
//                         <Dropdown.Item onClick={handleEdit}>
//                           Editar
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={() => onDelete(comment._id)}>
//                           Borrar
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={handleToggleHide}>
//                           {isHidden ? 'Mostrar' : 'Ocultar'}
//                         </Dropdown.Item>
//                       </Dropdown>
//                     )}
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import { FaThumbsUp } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Button, Textarea } from 'flowbite-react';

// export default function Comment({ comment, onLike, onEdit, onDelete }) {
//   const [user, setUser] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isHidden, setIsHidden] = useState(false);
//   const [editedContent, setEditedContent] = useState(comment.content);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await fetch(`/api/user/${comment.userId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     getUser();
//   }, [comment]);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedContent(comment.content);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`/api/comment/editComment/${comment._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: editedContent,
//         }),
//       });
//       if (res.ok) {
//         setIsEditing(false);
//         onEdit(comment, editedContent);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleToggleHide = () => {
//     setIsHidden(!isHidden);
//   };

//   return (
//     <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
//       <div className='flex-shrink-0 mr-3'>
//         <img
//           className='w-10 h-10 rounded-full bg-gray-200 imagenmodal'
//           src={user.profilePicture}
//           alt={user.username}
//         />
//       </div>
//       <div className='flex-1'>
//         <div className='flex items-center mb-1'>
//           <span className='font-bold  mr-1 text-xs truncate nombreuser'>
//             {user ? `@${user.username}` : 'anonymous user'}
//           </span>
//           <span className='text-gray-500 text-xs spanfecha'>
//             {moment(comment.createdAt).fromNow()}
//           </span>
//         </div>
//         {isHidden ? (
//           <p className='text-gray-500 italic'></p>
//         ) : (
//           <>
//             {isEditing ? (
//               <>
//                 <Textarea
//                   className='mb-2'
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                 />

//                 <div className='flex justify-end gap-2 text-xs'>
//                   <Button
//                     type='button'
//                     size='sm'
//                     gradientDuoTone='purpleToBlue'
//                     onClick={handleSave}
//                   >
//                     Guardar
//                   </Button>
//                   <Button
//                     type='button'
//                     size='sm'
//                     gradientDuoTone='purpleToBlue'
//                     outline
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancelar
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className='text-black pb-2'>{comment.content}</p>
//                 <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
//                   <button
//                     type='button'
//                     onClick={() => onLike(comment._id)}
//                     className={`text-white hover:text-blue-500 megusta ${
//                       currentUser &&
//                       comment.likes.includes(currentUser._id) &&
//                       '!text-blue-500'
//                     }`}
//                   >
//                     <FaThumbsUp className='text-sm' />
//                   </button>
//                   <p className='text-white'>
//                     {comment.numberOfLikes > 0 &&
//                       comment.numberOfLikes +
//                         ' ' +
//                         (comment.numberOfLikes === 1 ? 'like' : 'likes')}
//                   </p>
//                   {currentUser &&
//                     (currentUser._id === comment.userId ||
//                       currentUser.isAdmin) && (
//                       <>
//                         <button
//                           type='button'
//                           onClick={handleEdit}
//                           className='text-white hover:text-blue-500'
//                         >
//                           Editar
//                         </button>
//                         <button
//                           type='button'
//                           onClick={() => onDelete(comment._id)}
//                           className='text-white hover:text-red-500'
//                         >
//                           Borrar
//                         </button>
//                       </>
//                     )}
//                 </div>
//               </>
//             )}
//           </>
//         )}
//         <div className='flex justify-end mt-2'>
//           <Button
//             type='button'
//             size='sm'
//             gradientDuoTone='purpleToBlue'
//             outline
//             onClick={handleToggleHide}
//           >
//             {isHidden ? 'Mostrar' : 'Ocultar'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }