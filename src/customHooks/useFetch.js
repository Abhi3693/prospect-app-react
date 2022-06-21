function useFetch() {
  const headers = { 'Content-Type': 'application/json' };

  function makeApiCall(url, method = 'GET', body = null) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ error }) => {
          return Promise.reject(error);
        });
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  return {
    makeApiCall,
  }
}

export default useFetch;