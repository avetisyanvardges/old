class _MapServices {
  _goBackInMap = false;

  setGoBackInMap = (event) => {
    this._goBackInMap = event;
  };
  getGoBackInMap = () => {
    return this._goBackInMap;
  };
}

const MapServices = new _MapServices();

export default MapServices;
