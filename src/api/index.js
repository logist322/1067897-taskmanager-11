const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getTasks() {
    return this._sendRequest({
      url: `tasks`
    })
      .then((res) => res.json());
  }

  createTask(task) {
    return this._sendRequest({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  deleteTask(id) {
    return this._sendRequest({url: `tasks/${id}`, method: Method.DELETE});
  }

  updateTask(id, task) {
    return this._sendRequest({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(task),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((res) => res.json());
  }

  sync(data) {
    return this._sendRequest({
      url: `tasks/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _sendRequest({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
