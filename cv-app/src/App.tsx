import { useEffect, useState } from 'react';
import BlogSection from './components/BlogSection';
import CertificationsSection from './components/CertificationsSection';
import ContactForm from './components/ContactForm';
import { getInitialLanguage, Language, translate } from './i18n';

type CareerItem = {
  key: string;
  titleKey: string;
  descriptionKey: string;
  dateKey?: string;
  dateText?: string;
  image?: string;
  imageAlt: string;
  inverted?: boolean;
  whiteBackground?: boolean;
  ending?: boolean;
};

const showBlog = true;
const sectionIds = ['aboutme', 'career', 'certifications', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

type AppProps = {
  initialLanguage?: Language;
};

const careerItems: CareerItem[] = [
  { key: 'item13', titleKey: 'career.item13.title', descriptionKey: 'career.item13.description', dateKey: 'career.item13.date', image: '/assets/img/about/13.png', imageAlt: 'Microsoft fundamentals certifications', whiteBackground: true },
  { key: 'item12', titleKey: 'career.item12.title', descriptionKey: 'career.item12.description', dateKey: 'career.item12.date', image: '/assets/img/about/12.svg', imageAlt: 'Plain Concepts', inverted: true, whiteBackground: true },
  { key: 'item11', titleKey: 'career.item11.title', descriptionKey: 'career.item11.description', dateKey: 'career.item11.date', image: '/assets/img/about/11.png', imageAlt: 'Microsoft Azure DevOps Engineer', whiteBackground: true },
  { key: 'item10', titleKey: 'career.item10.title', descriptionKey: 'career.item10.description', dateKey: 'career.item10.date', image: '/assets/img/about/10.png', imageAlt: 'Microsoft Azure Developer Associate', inverted: true, whiteBackground: true },
  { key: 'item9', titleKey: 'career.item9.title', descriptionKey: 'career.item9.description', dateKey: 'career.item9.date', image: '/assets/img/about/9.jpg', imageAlt: 'UNED studies' },
  { key: 'item8', titleKey: 'career.item8.title', descriptionKey: 'career.item8.description', dateKey: 'career.item8.date', image: '/assets/img/about/8.jpg', imageAlt: 'C# certification', inverted: true },
  { key: 'item7', titleKey: 'career.item7.title', descriptionKey: 'career.item7.description', dateKey: 'career.item7.date', image: '/assets/img/about/7.jpg', imageAlt: 'Team leader promotion' },
  { key: 'item6', titleKey: 'career.item6.title', descriptionKey: 'career.item6.description', dateKey: 'career.item6.date', image: '/assets/img/about/6.jpg', imageAlt: 'Clarcat', inverted: true },
  { key: 'item5', titleKey: 'career.item5.title', descriptionKey: 'career.item5.description', dateKey: 'career.item5.date', image: '/assets/img/about/5.jpg', imageAlt: 'Izertis' },
  { key: 'item4', titleKey: 'career.item4.title', descriptionKey: 'career.item4.description', dateKey: 'career.item4.date', image: '/assets/img/about/4.jpg', imageAlt: 'English B2', inverted: true },
  { key: 'item3', titleKey: 'career.item3.title', descriptionKey: 'career.item3.description', dateKey: 'career.item3.date', image: '/assets/img/about/3.jpg', imageAlt: 'International support' },
  { key: 'item2', titleKey: 'career.item2.title', descriptionKey: 'career.item2.description', dateKey: 'career.item2.date', image: '/assets/img/about/2.jpg', imageAlt: 'Clarcat', inverted: true },
  { key: 'item1', titleKey: 'career.item1.title', descriptionKey: 'career.item1.description', dateText: '2011-2013', image: '/assets/img/about/1.jpg', imageAlt: 'Student years' },
  { key: 'item0', titleKey: 'career.item0.title', descriptionKey: 'career.item0.description', imageAlt: 'Beginnings', inverted: true, ending: true },
];

function renderCareerItem(item: CareerItem, t: (key: string) => string) {
  const itemClassName = item.inverted ? 'timeline-inverted' : undefined;

  if (item.ending) {
    return (
      <li key={item.key} className={itemClassName}>
        <div className="timeline-image">
          <h4>
            {t('career.ending-line1')}
            <br />
            {t('career.ending-line2')}
            <br />
            {t('career.ending-line3')}
          </h4>
        </div>
        <div className="timeline-panel">
          <div className="timeline-heading">
            <h4 className="subheading">{t(item.titleKey)}</h4>
          </div>
          <div className="timeline-body">
            <p className="text-muted">{t(item.descriptionKey)}</p>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li key={item.key} className={itemClassName}>
      <div className="timeline-image">
        <img
          className="rounded-circle img-fluid"
          style={item.whiteBackground ? { backgroundColor: 'white' } : undefined}
          src={item.image}
          alt={item.imageAlt}
        />
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4>{item.dateText ?? (item.dateKey ? t(item.dateKey) : '')}</h4>
          <h4 className="subheading">{t(item.titleKey)}</h4>
        </div>
        <div className="timeline-body">
          <p className="text-muted">{t(item.descriptionKey)}</p>
        </div>
      </div>
    </li>
  );
}

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

      <section className="page-section" id="career">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">{t('career.title')}</h2>
            <h3 className="section-subheading text-muted">{t('career.subtitle')}</h3>
          </div>
          <ul className="timeline">{careerItems.map((item) => renderCareerItem(item, t))}</ul>
        </div>
      </section>

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
