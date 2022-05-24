import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import FilmesDataService from "../services/Filmes.service";

export default function EditComponent() {
  const [titulo, settitulo] = useState("");
  const [DescricaoFilme, setDescricaoFilme] = useState("");
  const [foto, setfoto] = useState("");
  const [selectgeneroId, setselectgenero] = useState("");
  const [generos, setgeneros] = useState([]);

  useEffect(() => {
    FilmesDataService.getAllGeneros()
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data;
          console.log(data);
          setgeneros(data);
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // ignorar o warning 'react hook useeffect has a missing dependency'
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputTitulo">Titulo </label>
          <input
            type="text"
            className="form-control"
            placeholder="Titulo"
            value={titulo}
            onChange={(value) => settitulo(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6 mt-2">
          <label htmlFor="inputDescricao">Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            value={DescricaoFilme}
            onChange={(value) => setDescricaoFilme(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6 mt-2">
          <label htmlFor="inputFoto">Foto</label>
          <input
            type="text"
            className="form-control"
            placeholder="foto.png"
            value={foto}
            onChange={(value) => setfoto(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6 mt-2">
          <label htmlFor="inputGenero">Género</label>
          <select
            id="inputGenero"
            className="form-control"
            onChange={(value) => setselectgenero(value.target.value)}
          >
            <option defaultValue>Escolha um género:</option>
            {generos.map((generos, index) => (
              <option key={index} value={generos.id}>
                {generos.DescricaoGenero}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4"
        onClick={() => SendSave()}
      >
        Save
      </button>
    </div>
  );
  function SendSave() {
    if (titulo === "") {
      alert("Insira um titulo!");
    } else if (foto === "") {
      alert("Insira uma foto!");
    } else if (selectgeneroId === "") {
      alert("Escolha um género!");
    } else {
      const datapost = {
        titulo: titulo,
        DescricaoFilme: DescricaoFilme,
        foto: foto,
        generoId: selectgeneroId,
      };
      FilmesDataService.create(datapost)
        .then((response) => {
          if (response.data.success === true) {
            alert(response.data.message);
            console.log(datapost);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
