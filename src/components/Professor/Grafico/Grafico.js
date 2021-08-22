//Librerias
import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { Select, Button } from "antd";
import { BarChartOutlined } from '@ant-design/icons';

//Componentes
import Modal from '../../Modal';

//Estilo
import './Grafico.scss';

export default function Grafico(props) {
  const { parameters } = props;
  const [option, setOption] = useState(parameters[0].name);
  const [reloadGrafica, setReloadGrafica] = useState(false);
  const { Option } = Select;
  const [ejeX, setEjeX] = useState(null);
  const [ejeY, setEjeY] = useState(null);

  //Constantes para el modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);



  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Intentos'
      }
    },
    yaxis: {
  
    }
  }


  const series = [
    {
      name: "Sesion",
      data: []
    }
  ]



  //Para para extraer opciones del select
  const renderOptions = parameters.map((p) => {
    return (<Option key={p.name}> {p.name}</Option>)
  });

  const handleChange = (value) => {
    setOption(value);
  }


  //Parte encargada de graficar la selección
  const graficar = () => {
    parameters.forEach(par => {
      if (par.name == option) {
        series[0].data = par.values
      }
    });

    series[0].data.forEach((s, index) => {
      options.xaxis.categories.push(index + 1)
    })
    //options.yaxis.title.text = option;
    setIsVisibleModal(true);
    setModalTitle("Gráfico del parámetro " + option + " por intentos");
    setModalContent(
        <Chart
          options={options}
          series={series}
          type="bar"
          width="500"
        />
    )
  }



  return (
    <div className="grafico">

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        afterClose={() => Modal.destroyAll()}
      >
        {modalContent}
      </Modal>

      <div className="grafico__selector">
        <Select className="grafico__selector__select" onSelect={handleChange}>
          {renderOptions}
        </Select>
        <Button onClick={graficar}>
          <BarChartOutlined />
        </Button>
      </div>

      <div className="grafico__mixed-chart">
        {/* <Grafica options={ejeX} series={ejeY}/> */}
      </div>
    </div>

  );
}

