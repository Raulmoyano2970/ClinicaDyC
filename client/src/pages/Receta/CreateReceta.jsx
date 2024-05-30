import React from 'react';
import { TextInput } from 'flowbite-react';
import ModalReceta from './ModalReceta';

const CreateReceta = () => {
    return(
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
                <div className='pt-8'>
                    <div className='items-start text-lg'>
                        <h1 className='font-semibold pb-2'>Diagnostico</h1>
                        <TextInput
                        type='text'
                        placeholder='Diagnostico de paciente'
                        className=''
                        />
                    </div>
                </div>
                <div className='pt-8'>
                    <div className='items-start text-lg'>
                        <h1 className='font-semibold pr-1 pb-2'>Observaciones5</h1>
                        <TextInput
                            type='text'
                            placeholder='Observaciones'
                            className=''
                        />
                    </div>
                </div>
            </ModalReceta>
    )
}

export default CreateReceta;