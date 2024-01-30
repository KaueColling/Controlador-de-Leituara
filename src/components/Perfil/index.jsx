import React, { useState, useEffect } from 'react';
import './perfil.css'

function Perfil() {

  return (
    <div className='DivPrincipalPerfil'>
      <img src="/FotoPerfil.jpg" className='FotoPerfil'/>
      <h1 className='NomeUser'>Kaue Correa Colling</h1>
    </div>
  );
}

export default Perfil;
