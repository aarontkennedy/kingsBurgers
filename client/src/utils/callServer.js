import axios from "axios";

export default {
  setUser: function (profile) {
    return axios.post("/api/eaters", profile);
  },
  addBurger: function (burgerName, burgerDescription) {
    return axios.post("/api/burgers", {name: burgerName, 
      description: burgerDescription});
  },
  addBurgerEaten: function (eaterID, burgerID, burgerRating) {
    return axios.post("/api/burgerseaten", {eater_id: eaterID, 
      burger_id: burgerID, rating: burgerRating});
  },
  getBurgerStats: function () {
    return axios.get("/api/count");
  },
  getBurgersEaten: function (eaterID) {
    return axios.get(`/api/burgerseaten/${eaterID.trim()}`);
  },
  getBurgerSuggestion: function (eaterID) {
    return axios.get(`/api/burgersuggestion/${eaterID.trim()}`);
  },
  getThreeBurgerSuggestions: function (eaterID) {
    return axios.get(`/api/threeburgersuggestions/${eaterID.trim()}`);
  }
};