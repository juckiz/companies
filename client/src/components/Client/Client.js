function getCompanies(callback) {
    return fetch('/companies', {
        accept: "application/json"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { getCompanies };
export default Client;
