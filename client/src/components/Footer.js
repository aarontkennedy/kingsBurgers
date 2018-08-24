import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid mt-5">
      <ul>
          <li>
              <a href="http://www.kingsplacebar.com">Official King's Bar & Grill Site
              </a>
          </li>
          <li>
              <a href="https://www.facebook.com/kings.place.5">King's on Facebook
              </a>
          </li>
          <li>
              <a href="https://github.com/aarontkennedy/kingsBurgers">GitHub Repo
                  <i className="fab fa-github"></i>
              </a>
          </li>
          <li>made by
              <a href="https://aarontkennedy.github.io"> Aaron Kennedy
                  <i className="far fa-envelope"></i>
              </a>
          </li>
      </ul>
  </footer>);
  }

}

export default Footer;