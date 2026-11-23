type Translate = (key: string) => string;

type Certification = {
  title: string;
  issuer: string;
  image: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
};

const certifications: Certification[] = [
  {
    title: 'Microsoft Certified: DevOps Engineer Expert',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png',
    href: 'https://www.credly.com/badges/5b409fa1-9775-443d-92d4-54cb341c36d8/public_url',
    size: 'lg',
  },
  {
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png',
    href: 'https://www.credly.com/badges/bca38b48-dc78-443a-9f6f-d335b765b436/public_url',
    size: 'md',
  },
  {
    title: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/61f56aa4-16fd-403c-90bc-1d90dba1fa99/image.png',
    href: 'https://www.credly.com/badges/0ccafb84-be15-42cb-86a2-4c1f89814fb7/public_url',
    size: 'md',
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png',
    href: 'https://www.credly.com/badges/4102d1fd-ae18-4e75-9c60-4779a1d1510f/public_url',
    size: 'sm',
  },
  {
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png',
    href: 'https://www.credly.com/badges/0162a09d-49e1-4c05-86aa-7d52606c5c9a/public_url',
    size: 'sm',
  },
  {
    title: 'Microsoft Certified: Power Platform Fundamentals',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/2a6251f2-737b-4bf6-9190-d77570cc76fc/CERT-Fundamentals-Power-Platform.png',
    href: 'https://www.credly.com/badges/43bfaf4c-fbd4-43c0-9cbb-68bd97a07450/public_url',
    size: 'sm',
  },
  {
    title: 'AZ-400: Designing and Implementing Microsoft DevOps Solutions',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/107e2eb6-f394-40eb-83d2-d8c9b7d34555/exam-az400-600x600.png',
    href: 'https://www.credly.com/badges/365e5531-1337-45e7-b4f2-151365999016/public_url',
    size: 'lg',
  },
  {
    title: 'Kusto Detective Agency - Complete',
    issuer: 'Microsoft Azure Data Explorer',
    image: 'https://images.credly.com/size/110x110/images/6726e724-5ce8-477e-93f5-6b39d6933273/image.png',
    href: 'https://www.credly.com/badges/985f8d38-a4fa-4f40-a197-aae90bc317f4/public_url',
    size: 'md',
  },
  {
    title: 'MCSA: Web Applications - Certified 2019',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/083da79c-cc92-4709-b8dc-aa50583a355c/MCSA-Web-Applications-2019.png',
    href: 'https://www.credly.com/badges/ba057773-1bd9-42e9-91d7-a6aa264ceb03/public_url',
    size: 'sm',
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
    size: 'md',
  },
  {
    title: 'Exam 483: Programming in C#',
    issuer: 'Microsoft',
    image: 'https://images.credly.com/size/110x110/images/78e39333-d0db-4931-b231-13bdb37040cc/Programming_in_C_23-01.png',
    href: 'https://www.credly.com/badges/a94f713e-62b1-47ba-b995-60d8526d39de/public_url',
    size: 'sm',
  },
];

function renderCertification(certification: Certification) {
  return (
    <a
      key={certification.title}
      className={`certification-card certification-card--${certification.size ?? 'md'}`}
      title={certification.title}
      href={certification.href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className="certification-card__eyebrow">Certification</span>
      <div className="certification-card__content">
        <div className="certification-card__image-wrap">
          <img className="certification-card__image" src={certification.image} width="110" height="110" alt={certification.title} />
        </div>
        <div className="certification-card__details">
          <div className="certification-card__title">{certification.title}</div>
          <div className="certification-card__issuer">{certification.issuer}</div>
        </div>
      </div>
    </a>
  );
}

export default function CertificationsSection({ t }: { t: Translate }) {
  return (
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading text-uppercase" style={{ overflowWrap: 'break-word' }}>
          {t('certifications.title')}
        </h2>
        <h3 className="section-subheading text-muted">{t('certifications.subtitle')}</h3>
      </div>
      <div className="certifications-grid">{certifications.map(renderCertification)}</div>
    </div>
  );
}
