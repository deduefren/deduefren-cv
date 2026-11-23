type Translate = (key: string) => string;

type Certification = {
  title: string;
  issuer: string;
  image: string;
  href: string;
  detailsHref?: string;
  examBadgeHref?: string;
  earnedOn?: string;
  size?: 'sm' | 'md' | 'lg';
};

const associateBadge = 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-associate-badge.svg?branch=main';

const certifications: Certification[] = [
  {
    title: 'Microsoft Certified: DevOps Engineer Expert',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/devops-engineer?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/',
    examBadgeHref: 'https://www.credly.com/badges/365e5531-1337-45e7-b4f2-151365999016/public_url',
    earnedOn: '2021-08-06',
    size: 'lg',
  },
  {
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-developer?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/',
    earnedOn: '2020-12-16',
  },
  {
    title: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/61f56aa4-16fd-403c-90bc-1d90dba1fa99/image.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-ai-engineer?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
    earnedOn: '2022-12-28',
  },
  {
    title: 'Microsoft Certified: Azure Data Scientist Associate',
    issuer: 'Microsoft',
    image: associateBadge,
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-data-scientist?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/',
    earnedOn: '2023-02-15',
  },
  {
    title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    image: associateBadge,
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/fabric-analytics-engineer-associate?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/',
    earnedOn: '2024-06-02',
  },
  {
    title: 'Microsoft Certified: Fabric Data Engineer Associate',
    issuer: 'Microsoft',
    image: associateBadge,
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/fabric-data-engineer-associate?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/',
    earnedOn: '2025-06-14',
  },
  {
    title: 'Microsoft Certified: Azure Cosmos DB AI Developer Associate',
    issuer: 'Microsoft',
    image: associateBadge,
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-cosmos-db-developer-specialty?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-cosmos-db-developer-specialty/',
    earnedOn: '2023-09-23',
  },
  {
    title: 'Microsoft Certified: Azure AI Apps and Agents Developer Associate',
    issuer: 'Microsoft',
    image: associateBadge,
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-ai-apps-and-agents-developer-associate?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/',
    earnedOn: '2026-10-18',
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-ai-fundamentals?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
    earnedOn: '2022-06-30',
    size: 'sm',
  },
  {
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/azure-data-fundamentals?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/',
    earnedOn: '2022-06-29',
    size: 'sm',
  },
  {
    title: 'Microsoft Certified: Power Platform Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/2a6251f2-737b-4bf6-9190-d77570cc76fc/CERT-Fundamentals-Power-Platform.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification/power-platform-fundamentals?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/',
    earnedOn: '2022-06-28',
    size: 'sm',
  },
  {
    title: 'MCSA: Web Applications',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/083da79c-cc92-4709-b8dc-aa50583a355c/MCSA-Web-Applications-2019.png',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification-o-/mcsa-web-applications-certification?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/certifications/mcsa-web-applications-certification/',
    earnedOn: '2019-01-25',
    size: 'sm',
  },
  {
    title: 'Microsoft Certified Professional',
    issuer: 'Microsoft',
    image: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-general-badge.svg?branch=main',
    href: 'https://learn.microsoft.com/en-us/users/deduefren/credentials/certification-o-/nouid.1519?tab=credentials-tab',
    detailsHref: 'https://learn.microsoft.com/en-us/credentials/',
    earnedOn: '2018-10-24',
    size: 'sm',
  },
  {
    title: 'Kusto Detective Agency - Complete',
    issuer: 'Microsoft Azure Data Explorer',
    image: 'https://images.credly.com/size/110x110/images/6726e724-5ce8-477e-93f5-6b39d6933273/image.png',
    href: 'https://www.credly.com/badges/985f8d38-a4fa-4f40-a197-aae90bc317f4/public_url',
  },
  {
    title: 'Exam 486: Developing ASP.NET MVC Web Applications',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/cbab3216-025d-4601-86ee-c5970b348d48/Developing_ASP.NET_MVC_Web_Applications-01.png',
    href: 'https://www.credly.com/badges/9c735927-76fb-4c87-b683-5d1f7abafdc8/public_url',
    size: 'sm',
  },
  {
    title: 'MCSD: App Builder - Certified 2019',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/33afb7c7-f2b9-401a-b81c-9ca736f4cd68/MCSD-App-Builder-2019.png',
    href: 'https://www.credly.com/badges/5567acc0-7399-471b-a1d2-d12b019db180/public_url',
  },
  {
    title: 'Exam 483: Programming in C#',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/78e39333-d0db-4931-b231-13bdb37040cc/Programming_in_C_23-01.png',
    href: 'https://www.credly.com/badges/a94f713e-62b1-47ba-b995-60d8526d39de/public_url',
    size: 'sm',
  },
];

function formatDate(value: string, locale: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

function renderCertification(certification: Certification, t: Translate, locale: string) {
  return (
    <article key={certification.title} className={`certification-card certification-card--${certification.size ?? 'md'}`}>
      <span className="certification-card__eyebrow">{t('certifications.credential-label')}</span>
      <div className="certification-card__content">
        <div className="certification-card__image-wrap">
          <img className="certification-card__image" src={certification.image} width="110" height="110" alt="" />
        </div>
        <div className="certification-card__details">
          <a className="certification-card__title" href={certification.href} target="_blank" rel="noreferrer noopener">
            {certification.title}
          </a>
          <div className="certification-card__issuer">{certification.issuer}</div>
          {certification.earnedOn ? <p className="certification-card__date">{t('certifications.earned-label')}: {formatDate(certification.earnedOn, locale)}</p> : null}
        </div>
      </div>
      {certification.detailsHref || certification.examBadgeHref ? (
        <div className="certification-card__links">
          {certification.detailsHref ? (
            <a className="certification-card__details-link" href={certification.detailsHref} target="_blank" rel="noreferrer noopener">
              {t('certifications.details-link')}
            </a>
          ) : null}
          {certification.examBadgeHref ? (
            <a className="certification-card__details-link" href={certification.examBadgeHref} target="_blank" rel="noreferrer noopener">
              {t('certifications.devops-exam-link')}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default function CertificationsSection({ t, locale }: { t: Translate; locale: string }) {
  return (
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading text-uppercase" style={{ overflowWrap: 'break-word' }}>
          {t('certifications.title')}
        </h2>
        <h3 className="section-subheading text-muted">{t('certifications.subtitle')}</h3>
      </div>
      <div className="certifications-grid">{certifications.map((certification) => renderCertification(certification, t, locale))}</div>
    </div>
  );
}
