import { useEffect, useState } from 'react';
import BlogSection from './components/BlogSection';
import CertificationsSection from './components/CertificationsSection';
import ContactForm from './components/ContactForm';
import ExperienceSection from './components/ExperienceSection';
import { getInitialLanguage, Language, translate } from './i18n';

const showBlog = true;
const sectionIds = ['aboutme', 'career', 'certifications', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

type AppProps = {
  initialLanguage?: Language;
};

export default function App({ initialLanguage }: AppProps) {
  const [language] = useState<Language>(initialLanguage ?? getInitialLanguage());
  const [activeSection, setActiveSection] = useState<SectionId>('aboutme');
  const t = (key: string) => translate(language, key);

  useEffect(() => {
    function resolveFromHash() {
      const hashValue = window.location.hash.replace('#', '');
      if (sectionIds.includes(hashValue as SectionId)) {
        setActiveSection(hashValue as SectionId);
      }
    }

    function resolveFromScroll() {
      const navHeight = document.getElementById('mainNav')?.clientHeight ?? 74;
      const probeY = window.scrollY + navHeight + 8;
      let nextActive: SectionId = 'aboutme';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (section.offsetTop <= probeY) {
          nextActive = id;
        }
      }

      setActiveSection(nextActive);
    }

    resolveFromHash();
    resolveFromScroll();

    window.addEventListener('hashchange', resolveFromHash);
    window.addEventListener('scroll', resolveFromScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', resolveFromHash);
      window.removeEventListener('scroll', resolveFromScroll);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
          <span className="navbar-brand">deduefren</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item"><a className={`nav-link${activeSection === 'aboutme' ? ' active' : ''}`} href="#aboutme" onClick={() => setActiveSection('aboutme')}>{t('about.title')}</a></li>
              <li className="nav-item"><a className={`nav-link${activeSection === 'career' ? ' active' : ''}`} href="#career" onClick={() => setActiveSection('career')}>{t('career.title')}</a></li>
              <li className="nav-item"><a className={`nav-link${activeSection === 'certifications' ? ' active' : ''}`} href="#certifications" onClick={() => setActiveSection('certifications')}>{t('certifications.title')}</a></li>
              <li className="nav-item"><a className={`nav-link${activeSection === 'contact' ? ' active' : ''}`} href="#contact" onClick={() => setActiveSection('contact')}>{t('contact.title')}</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">{t('landing.welcome')}</div>
          <div className="row">
            <div className="col">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src="/assets/img/team/1.jpg" alt="Daniel Efren Diaz Ureta" />
                <h4>Daniel Efr&eacute;n D&iacute;az Ureta</h4>
                <p className="text-muted">{t('landing.job-title')}</p>
                <a className="btn btn-primary btn-social mx-2" href="https://www.linkedin.com/in/deduefren/" target="_blank" title="Linkedin" rel="noreferrer noopener"><i className="fab fa-linkedin-in"></i></a>
                <a className="btn btn-primary btn-social mx-2" href="https://www.credly.com/users/daniel-efren-diaz-ureta.34cdc423/badges" target="_blank" title="Credly" rel="noreferrer noopener">C</a>
                <a className="btn btn-primary btn-social mx-2" href="https://github.com/deduefren" target="_blank" title="Github" rel="noreferrer noopener"><i className="fab fa-github"></i></a>
                <a className="btn btn-primary btn-social mx-2" href="https://learn.microsoft.com/en-gb/users/deduefren/" target="_blank" title="Microsoft" rel="noreferrer noopener"><i className="fab fa-microsoft"></i></a>
                <div style={{ marginTop: '0.5em' }}>
                  <a className="btn btn-primary btn-social mx-2" href="https://twitter.com/deduefren" target="_blank" title="Twitter" rel="noreferrer noopener"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-primary btn-social mx-2" href="https://www.instagram.com/deduefren/" target="_blank" title="Instagram" rel="noreferrer noopener"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-primary btn-social mx-2" href="https://www.flickr.com/people/danielefren/" target="_blank" title="Flickr" rel="noreferrer noopener"><i className="fab fa-flickr"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="page-section" id="aboutme">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">{t('about.title')}</h2>
            <h3 className="section-subheading text-muted">{t('about.subtitle')}</h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fab fa-leanpub fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">{t('about.learning-title')}</h4>
              <p className="text-muted">{t('about.learning-description')}</p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">{t('about.net-title')}</h4>
              <p className="text-muted">{t('about.net-description')}</p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-cloud fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">{t('about.backend-title')}</h4>
              <p className="text-muted">{t('about.backend-description')}</p>
            </div>
          </div>
          <div className="row text-center justify-content-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-heart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">{t('about.passion-title')}</h4>
              <p className="text-muted">{t('about.passion-description')}</p>
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection t={t} />

      <section className="page-section" id="certifications">
        <CertificationsSection t={t} />
      </section>

      {showBlog ? (
        <section className="page-section" id="blog">
          <BlogSection language={language} t={t} />
        </section>
      ) : null}

      <section className="page-section" id="contact">
        <ContactForm t={t} />
      </section>

      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">deduefren 2023</div>
          </div>
        </div>
      </footer>
    </>
  );
}
