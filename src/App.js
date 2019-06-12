import React, { Component } from "react";
// import { render } from "react-dom";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";

import "./App.css";
// import ControlPanel from "./control-panel";
import CityPin from "./city-pin";
import CityInfo from "./city-info";

// import CITIES from "./data/cities.json";

const TOKEN = "";

const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -22.3034451,
        longitude: -53.8229657,
        zoom: 15,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      lngLat: [] // esse é o vetor de objetos com os dados do pin (marcador), por enquanto tem apenas longitude e latitude, mas podem ser acrescentado outros parâmetros.
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={city.lng} latitude={city.lat}>
        <CityPin size={25} onClick={() => this.setState({ popupInfo: city })} />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  handleClick = map => {
    // o parâmetro map retorna diversos atributos, dê uma olhada quando tiver tempo
    // a princípio estou pegando os valores de um vetor de objetos definido no state
    // esses valores podem, e devem, vir de uma base de dados
    // para manter os objetos anteriores é preciso pegar o que já tinha e acrescentar o novo
    this.setState({
      lngLat: [...this.state.lngLat, { lng: map.lngLat[0], lat: map.lngLat[1] }]
    });
    // aqui você poderia aproveitar para salvar as informações no banco de dados.
  };

  render() {
    const { viewport, lngLat } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
        onClick={this.handleClick} // Ao clicar no mapa é executada a função handleClick
      >
        {lngLat.map(this._renderCityMarker)}

        {/* {this._renderPopup()} */}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}

export default App;
