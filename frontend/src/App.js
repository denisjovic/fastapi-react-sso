import React from 'react';
import queryString from 'query-string';

function App() {
  const url = `https://idp.defensepoint.com/auth/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

  function redirectToKeycloak() {
    window.location.href = url;
  }

  const auth_code = queryString.parse(window.location.search);

  const handleSubmit = () => {
    const the_code = {
      code: auth_code.code,
    };

    fetch('http://localhost:8000/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(the_code),
    }).then((res) => console.log(res.status));
  };

  return (
    <div>
      {!auth_code.code ? (
        <button onClick={() => redirectToKeycloak()}>log in</button>
      ) : (
        <button
          onClick={() =>
            (window.location.href =
              'https://idp.defensepoint.com/auth/realms/indysoft-demo/protocol/openid-connect/logout?redirect_uri=http://localhost:3000')
          }
        >
          logout
        </button>
      )}
      <h1>
        {auth_code.code
          ? `Authorization code is ${auth_code.code}`
          : 'Click to button to log in'}
      </h1>
      {auth_code.code && <button onClick={handleSubmit}>send auth code</button>}
    </div>
  );
}

export default App;
