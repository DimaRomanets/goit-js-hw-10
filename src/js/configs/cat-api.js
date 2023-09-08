import axios from "axios";
const URL = 'https://api.thecatapi.com/v1/';
axios.defaults.baseURL = URL;
const APi_KEY = `live_ZWoJQF8I4GgaVpMvLc2NlYZz116qM3HFf4TYpGZBNEamhDmp85EZzc3Jl84GaOnu`;
axios.defaults.headers.common["x-api-key"] = APi_KEY;




    export  function fetchBreeds() {
        const BREEDS_URL = `breeds`;
        return axios.get(BREEDS_URL).then((res) => {
            if (res.status !== 200) {
                throw new Error(res.status);
            }
            return res.data;
        })
      };

  
   
        export function fetchCatByBreed(breedId) {
            const IMAGES_URL = `images/search`;
            const params = new URLSearchParams({
              breed_ids: breedId,
            });
            return axios.get(`${IMAGES_URL}?${params}`).then(res => {
              if (res.status !== 200) {
                throw new Error(res.status);
              }
              return res.data[0];
            });
          }

