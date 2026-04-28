const api = {
  getHerois: () => {
    return JSON.parse(localStorage.getItem("herois")) || [];
  },

  addHeroi: (heroi) => {
    const lista = api.getHerois();
    lista.push(heroi);
    localStorage.setItem("herois", JSON.stringify(lista));
    return heroi;
  }
};