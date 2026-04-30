const footerColumns = {
  Banking: ["Overview", "Features", "Solutions", "Pricing", "Releases"],
  Resources: ["Blog", "Newsletter", "Events", "Tutorials", "Support"],
  Social: ["X", "LinkedIn", "YouTube"],
};

export default function SiteFooter() {
  return (
    <footer className="af-footer">
      <div className="af-shell">
        {/* <div className="af-footer-grid">
          {Object.entries(footerColumns).map(([title, links]) => (
            <div key={title}>
              <h3 className="af-footer-title">{title}</h3>
              <ul className="af-footer-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="af-footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
        <div className="w-layout-grid footer-top-wrapper">
          <div className="footer-left-wrapper">
            <a href="#" className="logo-link w-nav-brand">
              <img src="https://cdn.prod.website-files.com/69eb670ad1c4f1d2d8dec6ed/69eb670cd1c4f1d2d8dec78a_AstralFund%20Logo.svg" loading="lazy" alt="AstralFund logo"/>
            </a>
            <div className="text-medium">
              Join our newsletter to stay up to date on features and releases.
            </div>
            <div className="footer-form-blog w-form">
              <form
                id="email-form"
                name="email-form"
                className="foot-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted");
                }}
              >
                <label className="w-checkbox">
                  <div className="w-checkbox-input w-checkbox-input--inputType-custom badge"></div>

                  <input
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                  />

                  <span className="w-form-label" htmlFor="checkbox">
                    Checkbox
                  </span>
                </label>

                <input
                  className="form-input w-input"
                  maxLength={256}
                  name="Email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />

                <input
                  type="submit"
                  className="button w-button"
                  value="Subscribe"
                />
              </form>

              <div className="text-small">
                We care about your data. View our{" "}
                <a href="#" className="text-link">Privacy Policy</a>.
              </div>

              <div className="success-message w-form-done" tabIndex={-1} role="region">
                <div>Thank you! Your submission has been received!</div>
              </div>

              <div className="error-message w-form-fail" tabIndex={-1} role="region">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>

          <div className="w-layout-grid footer-menu-wrapper">
            <div className="footer-link-list">
              <div className="footer-link-list-heading">Banking</div>
              <a href="#" className="footer-link w-inline-block">Overview</a>
              <a href="#" className="footer-link w-inline-block">Features</a>
              <a href="#" className="footer-link w-inline-block">
                Solutions <span className="badge">New</span>
              </a>
              <a href="#" className="footer-link w-inline-block">Pricing</a>
              <a href="#" className="footer-link w-inline-block">Releases</a>
            </div>

            <div className="footer-link-list">
              <div className="footer-link-list-heading">Resources</div>
              <a href="#" className="footer-link w-inline-block">Blog</a>
              <a href="#" className="footer-link w-inline-block">Newsletter</a>
              <a href="#" className="footer-link w-inline-block">Events</a>
              <a href="#" className="footer-link w-inline-block">Tutorials</a>
              <a href="#" className="footer-link w-inline-block">Support</a>
            </div>

            <div className="footer-link-list">
              <div className="footer-link-list-heading">Social</div>
              <a href="#" className="footer-social-link w-inline-block">
              <div className="footer-social-icon w-embed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8 4.8085H18V0.0106242H15.6C13.9803 -0.0886379 12.3958 0.511278 11.2483 1.65823C10.1009 2.80517 9.50069 4.38898 9.6 6.00797V8.40691H6V13.2048H9.6V24H14.4V13.2048H16.8L18 8.40691H14.4V7.20744C14.4 6.00797 14.4 4.8085 16.8 4.8085Z" fill="currentColor"></path>
                </svg>
              </div>
              </a>
              <a href="#" className="footer-social-link w-inline-block">
              <div className="footer-social-icon w-embed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8063 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8063 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" fill="currentColor"></path>
                <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="currentColor"></path>
                <path d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z" fill="currentColor"></path>
                </svg>
              </div>
              </a>
              <a href="#" className="footer-social-link w-inline-block">
              <div className="footer-social-icon w-embed">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0585144 22.4004L9.32465 10.0455L0 0.000391123H2.0986L10.2623 8.795L16.8584 0.000391123H24L14.2125 13.0503L22.8918 22.4004H20.7932L13.2748 14.3007L7.20014 22.4004H0.0585144ZM3.14467 20.8589H6.42555L20.9134 1.54213H17.6325L3.14467 20.8589Z" fill="currentColor"></path>
                </svg>
              </div>
              </a>
              <a href="#" className="footer-social-link w-inline-block">
              <div className="footer-social-icon w-embed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"></path>
                </svg>
              </div>
              </a>
            </div>
          </div>
        </div>

 

        {/* <div className="af-footer-bottom">
          <p>© 2026 AstralFund Financial. All rights reserved.</p>
          <div className="af-footer-legal">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div> */}
        <div className="footer-bottom-wrapper">
          <div className="text-small text-color-light">© 2023 AstralFund&nbsp;Financial. All rights reserved.</div>
            <div className="w-layout-grid footer-legal-list">
              <a href="#" className="footer-legal-link">Terms</a>
              <a href="#" className="footer-legal-link">Privacy</a>
              <a href="#" className="footer-legal-link">Cookies</a>
            </div>
          </div>
      </div>
    </footer>
  );
}
