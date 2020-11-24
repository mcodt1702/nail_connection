import config from "../config";

const VenueAuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/loginve`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default VenueAuthApiService;
