type Translate = (key: string) => string;

type ExperienceItem = {
  key: string;
  titleKey: string;
  descriptionKey: string;
  dateKey?: string;
  dateText?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  inverted?: boolean;
  ending?: boolean;
};

const experienceItems: ExperienceItem[] = [
  { key: 'item13', titleKey: 'career.item13.title', descriptionKey: 'career.item13.description', dateKey: 'career.item13.date', image: '/assets/img/about/13.png', imageAlt: 'Microsoft fundamentals certifications', category: 'Certification' },
  { key: 'item12', titleKey: 'career.item12.title', descriptionKey: 'career.item12.description', dateKey: 'career.item12.date', image: '/assets/img/about/12.svg', imageAlt: 'Plain Concepts', category: 'Team', inverted: true },
  { key: 'item11', titleKey: 'career.item11.title', descriptionKey: 'career.item11.description', dateKey: 'career.item11.date', image: '/assets/img/about/11.png', imageAlt: 'Microsoft Azure DevOps Engineer', category: 'Certification' },
  { key: 'item10', titleKey: 'career.item10.title', descriptionKey: 'career.item10.description', dateKey: 'career.item10.date', image: '/assets/img/about/10.png', imageAlt: 'Microsoft Azure Developer Associate', category: 'Certification', inverted: true },
  { key: 'item9', titleKey: 'career.item9.title', descriptionKey: 'career.item9.description', dateKey: 'career.item9.date', image: '/assets/img/about/9.jpg', imageAlt: 'UNED studies', category: 'Study' },
  { key: 'item8', titleKey: 'career.item8.title', descriptionKey: 'career.item8.description', dateKey: 'career.item8.date', image: '/assets/img/about/8.jpg', imageAlt: 'C# certification', category: 'Certification', inverted: true },
  { key: 'item7', titleKey: 'career.item7.title', descriptionKey: 'career.item7.description', dateKey: 'career.item7.date', image: '/assets/img/about/7.jpg', imageAlt: 'Team leader promotion', category: 'Leadership' },
  { key: 'item6', titleKey: 'career.item6.title', descriptionKey: 'career.item6.description', dateKey: 'career.item6.date', image: '/assets/img/about/6.jpg', imageAlt: 'Clarcat', category: 'Role', inverted: true },
  { key: 'item5', titleKey: 'career.item5.title', descriptionKey: 'career.item5.description', dateKey: 'career.item5.date', image: '/assets/img/about/5.jpg', imageAlt: 'Izertis', category: 'Role' },
  { key: 'item4', titleKey: 'career.item4.title', descriptionKey: 'career.item4.description', dateKey: 'career.item4.date', image: '/assets/img/about/4.jpg', imageAlt: 'English B2', category: 'Study', inverted: true },
  { key: 'item3', titleKey: 'career.item3.title', descriptionKey: 'career.item3.description', dateKey: 'career.item3.date', image: '/assets/img/about/3.jpg', imageAlt: 'International support', category: 'Project' },
  { key: 'item2', titleKey: 'career.item2.title', descriptionKey: 'career.item2.description', dateKey: 'career.item2.date', image: '/assets/img/about/2.jpg', imageAlt: 'Clarcat', category: 'Role', inverted: true },
  { key: 'item1', titleKey: 'career.item1.title', descriptionKey: 'career.item1.description', dateText: '2011-2013', image: '/assets/img/about/1.jpg', imageAlt: 'Student years', category: 'Study' },
  { key: 'item0', titleKey: 'career.item0.title', descriptionKey: 'career.item0.description', imageAlt: 'Beginnings', category: 'Start', inverted: true, ending: true },
];

function renderExperienceItem(item: ExperienceItem, t: Translate) {
  const dateText = item.dateText ?? (item.dateKey ? t(item.dateKey) : '');
  const title = t(item.titleKey);
  const description = t(item.descriptionKey);

  const markerContent = item.image ? (
    <img className="career-marker__image" src={item.image} alt={item.imageAlt ?? title} />
  ) : (
    <span className="career-marker__dot" />
  );

  if (item.ending) {
    return (
      <li key={item.key} className="career-item career-item--ending">
        <div className="career-marker" aria-hidden="true">
          {markerContent}
        </div>
        <article className="career-card career-card--highlight">
          <div className="career-card__header">
            <div>
              <p className="career-card__date">{t('career.ending-line1')} {t('career.ending-line2')} {t('career.ending-line3')}</p>
              <h4>{title}</h4>
            </div>
          </div>
          {description ? <p className="career-card__body">{description}</p> : null}
        </article>
      </li>
    );
  }

  return (
    <li key={item.key} className={`career-item${item.inverted ? ' career-item--alt' : ''}`}>
      <div className="career-marker" aria-hidden="true">
        {markerContent}
      </div>
      <article className="career-card">
        <div className="career-card__header">
          <div className="career-card__title-group">
            <div className="career-card__title-wrap">
              <p className="career-card__date">{dateText}</p>
              <h4>{title}</h4>
            </div>
          </div>
          <div className="career-card__actions">
            <span className="career-card__pill">{item.category ?? 'Milestone'}</span>
          </div>
        </div>
        {description ? <p className="career-card__body">{description}</p> : null}
      </article>
    </li>
  );
}

export default function ExperienceSection({ t }: { t: Translate }) {
  return (
    <section className="page-section" id="career">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">{t('career.title')}</h2>
          <h3 className="section-subheading text-muted">{t('career.subtitle')}</h3>
        </div>
        <ul className="career-timeline">{experienceItems.map((item) => renderExperienceItem(item, t))}</ul>
      </div>
    </section>
  );
}
