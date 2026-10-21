const RestaurantLogin = () => {
  return (
    <>
      <h3>Login Component</h3>

      <div>
        <div className="input-wrapper">
          <input type="email" placeholder="Email" className="input-field" />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <button className="button">Login</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
