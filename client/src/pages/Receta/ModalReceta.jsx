import React from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { MdOutlineCloudDownload } from 'react-icons/md';
import { AiOutlinePrinter } from 'react-icons/ai';
import './receta.css'

const ModalReceta = ({children, state, setState}) => {
    return (
        <>
            {state &&
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            <h3>Receta</h3>    
                        </EncabezadoModal>
                        <BotonCerrar onClick={()=> setState(false)}>
                            <Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="-5 -5 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></Link>
                        </BotonCerrar>
                        <div className="p-2">
                            {children}
                        </div>
                        <div className="download pt-2">
                            <button
                                className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                            >Descargar
                            <MdOutlineCloudDownload className="pl-2 inline w-7 h-7"/>
                            </button>
                            <button
                                className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                            >
                                Imprimir <AiOutlinePrinter className="pl-1 inline w-7 h-7"/>
                            </button>
                            </div>
                    </ContenedorModal>
                </Overlay>
            }
        </>
    )
}

export default ModalReceta;

const Overlay = styled.div`
    color: black;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #ffffff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    padding: 20px;
`;

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3{
        font-weight: 500;
        font-size: 16px;
        color: teal;
    }
`;

const BotonCerrar = styled.div`
    position: absolute;
    top: 15px;
    right: 20px;

    width: 30px;
    height: 30px;
    border: none;
    background: teal;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: white;

    &:hover{
        background: #014646;
    }
`;