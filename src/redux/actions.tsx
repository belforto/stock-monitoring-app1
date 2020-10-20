

export const LOAD_NEWS = "LOAD_NEWS";

export const fetchNews = news => ({
  type: LOAD_NEWS,
  payload: { news }
});

export const fetchNewsFunction = () => {
  return async dispatch => {
    console.log("pokrenuta akcija");

    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json =>
        dispatch({
          type: LOAD_NEWS,
          payload: json
        })
      );
  };
};
