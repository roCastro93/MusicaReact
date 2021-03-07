import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './component/Formulario';
import Cancion from './component/Letra';
import Informacion from './component/Informacion';
import Axios from 'axios';



const App = () => {
  //Utilizar useState con 3 state diferentes 
  const [artista, setArtista] = useState('');
  const [letra, setLetra] = useState([]);
  const [info, setInfo] = useState({});

  // Metodo para consultar la API de letras de canciones
  const consultarAPILetra = async busqueda => {
    const { artista, cancion } = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    //Consultar API
    const resultado = await Axios(url);

    //Almacenar el artista que se busco
    setArtista(artista);

    //Almacenar la letra en el state
    setLetra(resultado.data.lyrics);
  }

  //Metodo para consultar la API de informacion

  const consultarAPIinfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await Axios(url);
      setInfo(resultado.data.artists[0]);
    }
  }

  useEffect(() => {
    consultarAPIinfo();
  }, [artista]
  )

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;
