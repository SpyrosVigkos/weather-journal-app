export default class FetchWrapper {
  constructor(baseURL) {
    console.log(baseURL);
    this.baseURL = baseURL;
  }

  get(endpoint) {
    const finalUrl = this.baseURL + endpoint;
    console.log("finalUrl :", finalUrl);
    return fetch(finalUrl, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}
