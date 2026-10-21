const RestaurantSignUp = () => {
  return (
    <>
      <h3>SignUp Component</h3>

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
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Restaurant Name"
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <input type="text" placeholder="City" className="input-field" />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Full Address"
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <input type="tel" placeholder="Contact No." className="input-field" />
        </div>

        <div className="input-wrapper">
          <button className="button">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
