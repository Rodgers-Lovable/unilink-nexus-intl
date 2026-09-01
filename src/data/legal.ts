/**
 * Legal documents, stored as structured content (never raw HTML).
 * Contact details and dates are pulled from `company.ts` so there is a single
 * place to update them.
 */

import { company, serviceLines } from "./company";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDocument = {
  slug: string;
  title: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
};

const contactBlock: LegalBlock[] = [
  { type: "p", text: company.legalName },
  {
    type: "list",
    items: [
      `Email: ${company.privacyEmail}`,
      `Telephone: ${company.phone}`,
      `Address: ${company.address}`,
    ],
  },
];

const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  updated: company.privacyPolicyUpdated,
  summary:
    "How UniLink Nexus International collects, uses, stores, shares and protects personal information across its website, tools and advisory services.",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        {
          type: "p",
          text: `${company.legalName} ("UniLink", "we", "us", or "our") respects your privacy and is committed to handling personal information responsibly, transparently and securely.`,
        },
        {
          type: "p",
          text: "This Privacy Policy explains how we collect, use, store, share and protect personal information when you:",
        },
        {
          type: "list",
          items: [
            "visit the UniLink Nexus International website;",
            "use the UniLink Pathway Advisor or other online tools;",
            "submit an application or education enquiry;",
            "request a consultation;",
            "contact us through our website, email, telephone, WhatsApp or other communication channels;",
            "participate in a UniLink programme, event or school activity; or",
            "otherwise interact with UniLink.",
          ],
        },
        {
          type: "p",
          text: "This Policy also explains the choices and rights you may have regarding your personal information.",
        },
        {
          type: "p",
          text: "UniLink's handling of personal information is subject to applicable privacy and data protection laws, including where applicable Burundi's Law No. 1/03 of 10 March 2026 on the Protection of Personal Data.",
        },
      ],
    },
    {
      heading: "2. Who We Are",
      blocks: [
        {
          type: "p",
          text: "UniLink Nexus International provides career, education pathway and international education guidance to students and families and may provide programmes and guidance services to schools.",
        },
        { type: "p", text: "Our services may include:" },
        { type: "list", items: serviceLines.map((s) => `${s};`) },
        { type: "p", text: "For privacy enquiries, you can contact us at:" },
        ...contactBlock,
      ],
    },
    {
      heading: "3. Information We Collect",
      blocks: [
        { type: "p", text: "The information we collect depends on how you interact with UniLink." },
        { type: "h3", text: "3.1 Contact information" },
        {
          type: "p",
          text: "When you contact us, request a consultation or submit an enquiry, we may collect:",
        },
        {
          type: "list",
          items: [
            "full name;",
            "email address;",
            "telephone or WhatsApp number;",
            "country of residence;",
            "preferred method of communication; and",
            "information contained in your enquiry or message.",
          ],
        },
        { type: "h3", text: "3.2 Student and academic information" },
        {
          type: "p",
          text: "When you use our education services or submit an application profile, we may collect information such as:",
        },
        {
          type: "list",
          items: [
            "nationality;",
            "country of residence;",
            "current education level;",
            "curriculum or qualification;",
            "academic institution;",
            "qualifications completed or being pursued;",
            "subjects studied;",
            "academic performance or grades where relevant;",
            "graduation or expected completion year;",
            "intended study level;",
            "preferred course or field of study;",
            "preferred study destinations;",
            "intended intake or study year; and",
            "other academic information you choose to provide.",
          ],
        },
        { type: "h3", text: "3.3 Pathway Advisor information" },
        {
          type: "p",
          text: "When you use the UniLink Pathway Advisor, we may collect information including:",
        },
        {
          type: "list",
          items: [
            "interests;",
            "subjects you enjoy or consider strengths;",
            "current academic stage;",
            "curriculum;",
            "general academic performance;",
            "career interests;",
            "preferred fields of study;",
            "preferred destinations;",
            "teaching-language preferences;",
            "approximate study budget;",
            "funding or scholarship considerations;",
            "travel preferences;",
            "target study year; and",
            "additional information you voluntarily provide.",
          ],
        },
        {
          type: "p",
          text: "This information may be used to generate educational pathway suggestions and help our advisers understand your goals.",
        },
        { type: "h3", text: "3.4 Application information" },
        { type: "p", text: "If you choose Start My Application, we may collect:" },
        {
          type: "list",
          items: [
            "personal and contact information;",
            "nationality and country of residence;",
            "academic history;",
            "previous or current educational institution;",
            "qualification information;",
            "intended course and study level;",
            "preferred destinations;",
            "preferred intake; and",
            "other information relevant to your education plans.",
          ],
        },
        {
          type: "p",
          text: "Submitting this information to UniLink does not by itself constitute an application to a university, college, scholarship provider, immigration authority or other third-party institution.",
        },
        { type: "h3", text: "3.5 Parent or guardian information" },
        {
          type: "p",
          text: "Where appropriate, particularly when working with younger students, we may collect information relating to a parent or legal guardian, including:",
        },
        {
          type: "list",
          items: [
            "name;",
            "relationship to the student;",
            "telephone number;",
            "email address; and",
            "consent or communication preferences.",
          ],
        },
        { type: "h3", text: "3.6 School and institutional information" },
        {
          type: "p",
          text: "When schools or other organisations interact with UniLink, we may collect:",
        },
        {
          type: "list",
          items: [
            "institution name;",
            "representative's name and position;",
            "professional contact information;",
            "programme requirements;",
            "student group information where appropriate; and",
            "communications relating to the programme.",
          ],
        },
        { type: "h3", text: "3.7 Technical information" },
        {
          type: "p",
          text: "When you use our website, certain information may be collected automatically, including:",
        },
        {
          type: "list",
          items: [
            "IP address;",
            "browser type;",
            "device type;",
            "operating system;",
            "pages visited;",
            "referring website;",
            "approximate location derived from technical information;",
            "date and time of access; and",
            "website interaction information.",
          ],
        },
        {
          type: "p",
          text: "Cookies and similar technologies may also be used as described in our Cookie Policy.",
        },
      ],
    },
    {
      heading: "4. How We Use Your Information",
      blocks: [
        { type: "p", text: "We may use personal information to:" },
        { type: "h3", text: "Provide education guidance" },
        { type: "p", text: "Including to:" },
        {
          type: "list",
          items: [
            "understand your education goals;",
            "explore career and subject options;",
            "identify possible education pathways;",
            "provide destination guidance;",
            "provide application support; and",
            "prepare for consultations.",
          ],
        },
        { type: "h3", text: "Operate the UniLink Pathway Advisor" },
        { type: "p", text: "Including to:" },
        {
          type: "list",
          items: [
            "analyse information you provide;",
            "generate possible career and education pathways;",
            "identify areas worth exploring;",
            "provide personalised explanations; and",
            "recommend appropriate next steps.",
          ],
        },
        { type: "h3", text: "Manage applications and enquiries" },
        { type: "p", text: "Including to:" },
        {
          type: "list",
          items: [
            "review submitted student profiles;",
            "contact prospective students;",
            "assign enquiries to advisers;",
            "provide application assistance;",
            "track enquiries; and",
            "communicate next steps.",
          ],
        },
        { type: "h3", text: "Communicate with you" },
        { type: "p", text: "Including through:" },
        {
          type: "list",
          items: [
            "email;",
            "telephone;",
            "WhatsApp; or",
            "another communication method you request.",
          ],
        },
        { type: "h3", text: "Improve our services" },
        {
          type: "p",
          text: "We may analyse website and service usage to understand how people use UniLink's services and improve our website, tools, guidance and user experience.",
        },
        { type: "h3", text: "Protect UniLink and its users" },
        { type: "p", text: "Including detecting:" },
        {
          type: "list",
          items: ["misuse;", "fraudulent information;", "security threats; and", "unauthorised access."],
        },
        { type: "h3", text: "Meet legal obligations" },
        {
          type: "p",
          text: "We may process information where required to comply with applicable laws, regulatory requirements or lawful requests.",
        },
      ],
    },
    {
      heading: "5. Our Basis for Processing Personal Information",
      blocks: [
        {
          type: "p",
          text: "Where applicable law requires a lawful basis for processing, UniLink will process personal information on an appropriate basis, which may include:",
        },
        {
          type: "list",
          items: [
            "Consent — where you have agreed to a particular use of your information.",
            "Providing requested services — where processing is necessary to respond to your enquiry or provide a service you requested.",
            "Legitimate operational purposes — where appropriate and permitted by law, such as securing and improving our services.",
            "Legal obligations — where processing is necessary to comply with applicable law.",
          ],
        },
        {
          type: "p",
          text: "Where consent is the basis for processing, you may withdraw your consent subject to applicable law.",
        },
      ],
    },
    {
      heading: "6. Artificial Intelligence and Automated Tools",
      blocks: [
        {
          type: "p",
          text: "UniLink may use automated systems, rules-based tools and artificial intelligence to support education guidance and pathway exploration.",
        },
        {
          type: "p",
          text: "For example, the UniLink Pathway Advisor may analyse information you provide to suggest:",
        },
        {
          type: "list",
          items: [
            "career areas worth exploring;",
            "degree or qualification pathways;",
            "possible study destinations; and",
            "suggested next steps.",
          ],
        },
        { type: "p", text: "These outputs are intended to support exploration and planning." },
        { type: "p", text: "They should not be considered:" },
        {
          type: "list",
          items: [
            "a university admission decision;",
            "confirmation of academic eligibility;",
            "a scholarship decision;",
            "immigration or visa advice;",
            "a guarantee of admission;",
            "a guarantee of funding; or",
            "a guarantee of any educational outcome.",
          ],
        },
        {
          type: "p",
          text: "Important education decisions should be reviewed with an appropriate adviser, institution or relevant authority.",
        },
        {
          type: "p",
          text: "Where third-party AI technology is used to process information, UniLink will seek to use it in accordance with applicable privacy requirements and appropriate safeguards.",
        },
      ],
    },
    {
      heading: "7. Children and Young People",
      blocks: [
        {
          type: "p",
          text: "Some UniLink services may be relevant to school-age students and other young people.",
        },
        {
          type: "p",
          text: "We recognise that children's and young people's personal information requires particular care.",
        },
        { type: "p", text: "Where appropriate, UniLink may:" },
        {
          type: "list",
          items: [
            "request age or education-stage information;",
            "limit information collected from younger users;",
            "require involvement or consent from a parent, guardian or school;",
            "provide age-appropriate privacy information; and",
            "apply additional safeguards when communicating with young people.",
          ],
        },
        {
          type: "p",
          text: "We do not intentionally request unnecessary sensitive personal information from children.",
        },
        {
          type: "p",
          text: "Parents or guardians who have questions about information relating to a child may contact us using the details provided in this Policy.",
        },
        {
          type: "p",
          text: "Our approach to working safely with children and young people is described further in our Safeguarding & Child Protection Policy.",
        },
      ],
    },
    {
      heading: "8. How We Share Information",
      blocks: [
        { type: "p", text: "UniLink does not sell personal information." },
        { type: "p", text: "We may share information where reasonably necessary with:" },
        { type: "h3", text: "UniLink staff and advisers" },
        {
          type: "p",
          text: "Authorised personnel may access information where required to provide services.",
        },
        { type: "h3", text: "Technology service providers" },
        { type: "p", text: "These may include providers of:" },
        {
          type: "list",
          items: [
            "website hosting;",
            "cloud infrastructure;",
            "databases;",
            "email;",
            "analytics;",
            "customer relationship management systems;",
            "communications;",
            "security; and",
            "artificial intelligence services.",
          ],
        },
        {
          type: "p",
          text: "Providers should only receive information reasonably necessary to perform their functions.",
        },
        { type: "h3", text: "Educational institutions" },
        {
          type: "p",
          text: "Where you have asked UniLink to assist with an actual application, relevant information may be shared with universities, colleges or other education providers.",
        },
        {
          type: "p",
          text: "We will not treat completion of the website's initial Apply Now form as permission to submit applications to arbitrary institutions.",
        },
        { type: "h3", text: "Professional and regulatory parties" },
        { type: "p", text: "Information may be disclosed where necessary to:" },
        {
          type: "list",
          items: [
            "professional advisers;",
            "regulators;",
            "courts;",
            "law enforcement authorities; or",
            "other parties where disclosure is legally required.",
          ],
        },
      ],
    },
    {
      heading: "9. International Transfers",
      blocks: [
        {
          type: "p",
          text: "Because UniLink works in international education and may use technology providers operating in different countries, personal information may sometimes be processed or stored outside the country in which it was collected.",
        },
        {
          type: "p",
          text: "Where such transfers occur, UniLink will take reasonable steps and apply safeguards required by applicable law to protect the information.",
        },
      ],
    },
    {
      heading: "10. Data Retention",
      blocks: [
        {
          type: "p",
          text: "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including to:",
        },
        {
          type: "list",
          items: [
            "provide requested services;",
            "manage student enquiries;",
            "maintain appropriate business records;",
            "resolve disputes;",
            "comply with legal obligations; and",
            "protect legitimate interests.",
          ],
        },
        {
          type: "p",
          text: "Retention periods may differ depending on the type of information and relationship with UniLink.",
        },
        {
          type: "p",
          text: "Information that is no longer required will be deleted, anonymised or otherwise handled in accordance with applicable requirements.",
        },
      ],
    },
    {
      heading: "11. Information Security",
      blocks: [
        {
          type: "p",
          text: "UniLink uses reasonable technical and organisational measures designed to protect personal information against:",
        },
        {
          type: "list",
          items: [
            "unauthorised access;",
            "accidental loss;",
            "misuse;",
            "alteration;",
            "disclosure; and",
            "destruction.",
          ],
        },
        { type: "p", text: "However, no internet-based system can guarantee absolute security." },
        {
          type: "p",
          text: "Users should also take appropriate steps to protect their own devices, accounts and communications.",
        },
      ],
    },
    {
      heading: "12. Your Privacy Rights",
      blocks: [
        {
          type: "p",
          text: "Depending on applicable law and your circumstances, you may have rights concerning your personal information, including the ability to request:",
        },
        {
          type: "list",
          items: [
            "access to information we hold about you;",
            "correction of inaccurate or incomplete information;",
            "deletion of information;",
            "restriction of certain processing;",
            "withdrawal of consent;",
            "objection to certain processing; and",
            "information about how your data is being used.",
          ],
        },
        { type: "p", text: "Some rights may be subject to legal limitations or exceptions." },
        { type: "p", text: `To submit a privacy request, contact: ${company.privacyEmail}` },
        {
          type: "p",
          text: "We may need to verify your identity before completing certain requests.",
        },
      ],
    },
    {
      heading: "13. Marketing Communications",
      blocks: [
        {
          type: "p",
          text: "UniLink may send educational updates, opportunities or marketing communications where permitted and where appropriate consent has been obtained.",
        },
        { type: "p", text: "You may opt out of marketing communications at any time." },
        {
          type: "p",
          text: "Opting out of marketing does not prevent us from sending communications necessary to respond to an enquiry or provide a requested service.",
        },
      ],
    },
    {
      heading: "14. Cookies and Analytics",
      blocks: [
        {
          type: "p",
          text: "UniLink may use cookies and similar technologies for purposes such as:",
        },
        {
          type: "list",
          items: [
            "essential website functionality;",
            "remembering preferences;",
            "understanding website performance;",
            "analytics; and",
            "improving user experience.",
          ],
        },
        {
          type: "p",
          text: "Where required, non-essential cookies will be subject to appropriate consent.",
        },
        { type: "p", text: "Further information is available in our Cookie Policy." },
      ],
    },
    {
      heading: "15. Third-Party Websites",
      blocks: [
        { type: "p", text: "Our website may contain links to:" },
        {
          type: "list",
          items: [
            "universities;",
            "government websites;",
            "scholarship providers;",
            "educational organisations; and",
            "other third-party services.",
          ],
        },
        {
          type: "p",
          text: "UniLink does not control the privacy practices of those organisations.",
        },
        {
          type: "p",
          text: "Users should review the relevant third party's privacy information before providing personal information.",
        },
      ],
    },
    {
      heading: "16. Changes to This Privacy Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy as our services, technology or legal obligations change.",
        },
        {
          type: "p",
          text: "The latest version will be published on this website with an updated Last Updated date.",
        },
        {
          type: "p",
          text: "Where significant changes materially affect how we use personal information, we may provide additional notice where appropriate.",
        },
      ],
    },
    {
      heading: "17. Contact Us",
      blocks: [
        {
          type: "p",
          text: "Questions, concerns or requests concerning this Privacy Policy or your personal information can be directed to:",
        },
        ...contactBlock,
      ],
    },
  ],
};

const termsOfUse: LegalDocument = {
  slug: "terms",
  title: "Terms of Use",
  updated: company.termsUpdated,
  summary:
    "The terms governing use of the UniLink Nexus International website, the Pathway Advisor and related digital tools and content.",
  sections: [
    {
      heading: "1. About These Terms",
      blocks: [
        {
          type: "p",
          text: `These Terms of Use ("Terms") govern your access to and use of the ${company.legalName} website, digital tools, content and online services.`,
        },
        { type: "p", text: "By accessing or using the website, you agree to these Terms." },
        {
          type: "p",
          text: "If you do not agree with them, you should not use the website or its interactive services.",
        },
        {
          type: "p",
          text: "Certain paid or specialised UniLink services may be governed by additional agreements or service terms.",
        },
      ],
    },
    {
      heading: "2. About UniLink",
      blocks: [
        {
          type: "p",
          text: "UniLink Nexus International provides career, education pathway and international education guidance.",
        },
        { type: "p", text: "Our services may include:" },
        { type: "list", items: serviceLines.map((s) => `${s};`) },
        {
          type: "p",
          text: "The website is intended to provide information, exploration tools and ways to connect with UniLink.",
        },
      ],
    },
    {
      heading: "3. Education Guidance",
      blocks: [
        {
          type: "p",
          text: "Information provided through the website is intended for educational planning and general guidance.",
        },
        { type: "p", text: "Education opportunities vary according to factors including:" },
        {
          type: "list",
          items: [
            "academic background;",
            "programme;",
            "institution;",
            "country;",
            "language requirements;",
            "finances;",
            "application timing; and",
            "institutional policies.",
          ],
        },
        {
          type: "p",
          text: "University requirements, tuition fees, deadlines, immigration rules, scholarship opportunities and other information can change.",
        },
        {
          type: "p",
          text: "You should verify important information with the relevant institution, government authority or other authoritative source before making significant decisions.",
        },
      ],
    },
    {
      heading: "4. UniLink Pathway Advisor",
      blocks: [
        { type: "p", text: "The UniLink Pathway Advisor is designed to help users explore possible:" },
        {
          type: "list",
          items: [
            "interests;",
            "career directions;",
            "subject choices;",
            "education pathways;",
            "degree areas;",
            "study destinations; and",
            "next steps.",
          ],
        },
        {
          type: "p",
          text: "The Pathway Advisor may use automated rules, algorithms and/or artificial intelligence.",
        },
        {
          type: "p",
          text: "Its outputs are recommendations for exploration, not final determinations.",
        },
        { type: "p", text: "A recommendation does not mean that:" },
        {
          type: "list",
          items: [
            "you are academically eligible for a particular institution;",
            "an institution will accept you;",
            "you qualify for a scholarship;",
            "you will receive a visa;",
            "a particular career is guaranteed to suit you; or",
            "a particular educational outcome is guaranteed.",
          ],
        },
        {
          type: "p",
          text: "Users should treat Pathway Advisor results as a starting point for further research and professional guidance.",
        },
      ],
    },
    {
      heading: "5. No Guarantee of Admission",
      blocks: [
        { type: "p", text: "UniLink cannot guarantee:" },
        {
          type: "list",
          items: [
            "admission to a university, college or other institution;",
            "acceptance into a particular programme;",
            "scholarship awards;",
            "financial assistance;",
            "visa approval;",
            "immigration outcomes;",
            "employment;",
            "academic success; or",
            "any other outcome controlled by a third party.",
          ],
        },
        {
          type: "p",
          text: "Admission decisions remain with the relevant educational institution.",
        },
        {
          type: "p",
          text: "Visa and immigration decisions remain with the relevant governmental authorities.",
        },
        {
          type: "p",
          text: "Scholarship decisions remain with the relevant scholarship provider.",
        },
      ],
    },
    {
      heading: "6. Apply Now and Application Profiles",
      blocks: [
        {
          type: "p",
          text: "The website may allow you to submit an application profile using Apply Now or Start My Application.",
        },
        {
          type: "p",
          text: "Submitting this form starts an enquiry or application-support process with UniLink.",
        },
        { type: "p", text: "It does not, by itself:" },
        {
          type: "list",
          items: [
            "submit an application to a university;",
            "apply for a visa;",
            "submit a scholarship application;",
            "create an admission offer; or",
            "guarantee that UniLink will recommend or submit an application to a particular institution.",
          ],
        },
        {
          type: "p",
          text: "UniLink may review the information and contact you to discuss appropriate next steps.",
        },
        {
          type: "p",
          text: "Where UniLink later assists with an actual institutional application, additional information, documents, consent, terms or fees may be required.",
        },
      ],
    },
    {
      heading: "7. Accuracy of Information You Provide",
      blocks: [
        {
          type: "p",
          text: "You agree to provide information that is, to the best of your knowledge:",
        },
        { type: "list", items: ["accurate;", "current;", "complete; and", "not deliberately misleading."] },
        { type: "p", text: "You must not knowingly provide:" },
        {
          type: "list",
          items: [
            "forged academic documents;",
            "falsified grades;",
            "fraudulent identity information;",
            "altered certificates;",
            "misleading financial documents; or",
            "other fraudulent material.",
          ],
        },
        {
          type: "p",
          text: "UniLink may refuse or discontinue assistance where it reasonably believes fraudulent or deliberately misleading information has been supplied.",
        },
      ],
    },
    {
      heading: "8. Applications and Third-Party Requirements",
      blocks: [
        {
          type: "p",
          text: "Educational institutions, immigration authorities and scholarship providers establish their own requirements.",
        },
        {
          type: "p",
          text: "You remain responsible for reviewing and satisfying relevant requirements, including:",
        },
        {
          type: "list",
          items: [
            "academic requirements;",
            "application deadlines;",
            "documentation;",
            "fees;",
            "language requirements;",
            "financial requirements; and",
            "immigration requirements.",
          ],
        },
        {
          type: "p",
          text: "Where UniLink provides assistance, that assistance does not transfer the ultimate responsibility for the accuracy and completeness of your application away from you.",
        },
      ],
    },
    {
      heading: "9. Scholarships and Funding Information",
      blocks: [
        {
          type: "p",
          text: "Any scholarship or funding information provided through UniLink is informational unless expressly stated otherwise.",
        },
        { type: "p", text: "Scholarships may:" },
        {
          type: "list",
          items: [
            "change;",
            "close;",
            "have limited availability;",
            "have specific eligibility requirements; or",
            "be administered entirely by third parties.",
          ],
        },
        {
          type: "p",
          text: "Mentioning a scholarship does not mean UniLink guarantees that a user is eligible or will receive funding.",
        },
      ],
    },
    {
      heading: "10. Visa and Immigration Information",
      blocks: [
        {
          type: "p",
          text: "Any immigration or visa information presented on the website is general educational information.",
        },
        { type: "p", text: "Immigration laws, processes, fees and requirements may change." },
        {
          type: "p",
          text: "Users should verify current requirements through the appropriate government or immigration authority.",
        },
        {
          type: "p",
          text: "Unless specifically authorised under applicable law, UniLink does not represent itself as providing legal immigration advice.",
        },
      ],
    },
    {
      heading: "11. Users Under 18",
      blocks: [
        { type: "p", text: "Some UniLink services may be used by school-age students." },
        {
          type: "p",
          text: "Users under 18 should involve a parent, legal guardian or responsible school representative where appropriate.",
        },
        {
          type: "p",
          text: "UniLink may require parental, guardian or school consent before providing certain services or collecting certain information from younger users.",
        },
        {
          type: "p",
          text: "Use of services involving children and young people may also be subject to UniLink's Safeguarding & Child Protection Policy.",
        },
      ],
    },
    {
      heading: "12. Acceptable Use",
      blocks: [
        { type: "p", text: "You must not use the website or UniLink tools to:" },
        {
          type: "list",
          items: [
            "submit false or fraudulent information;",
            "impersonate another person;",
            "interfere with website security;",
            "attempt unauthorised access to systems or information;",
            "introduce malicious software;",
            "scrape or extract substantial website data without permission;",
            "abuse automated or AI functionality;",
            "infringe intellectual property rights;",
            "harass UniLink personnel or other users; or",
            "use the service for unlawful purposes.",
          ],
        },
        { type: "p", text: "We may restrict access where misuse is detected." },
      ],
    },
    {
      heading: "13. Intellectual Property",
      blocks: [
        { type: "p", text: "Unless otherwise stated, website content including:" },
        {
          type: "list",
          items: [
            "text;",
            "graphics;",
            "branding;",
            "software;",
            "layouts;",
            "educational materials;",
            "pathway frameworks;",
            "tools; and",
            "original resources",
          ],
        },
        {
          type: "p",
          text: `belongs to ${company.legalName} or its licensors and is protected by applicable intellectual property laws.`,
        },
        {
          type: "p",
          text: "You may use publicly available content for personal, non-commercial educational purposes.",
        },
        {
          type: "p",
          text: "You may not reproduce, commercially distribute, modify or exploit substantial portions of UniLink content without permission.",
        },
      ],
    },
    {
      heading: "14. Third-Party Content and Links",
      blocks: [
        { type: "p", text: "The website may reference or link to third parties, including:" },
        {
          type: "list",
          items: [
            "universities;",
            "colleges;",
            "government authorities;",
            "scholarship providers;",
            "education organisations; and",
            "external resources.",
          ],
        },
        {
          type: "p",
          text: "A link does not necessarily constitute endorsement, partnership or representation.",
        },
        {
          type: "p",
          text: "In particular, the appearance of a university or institution on the website should not be interpreted as meaning that UniLink is an authorised representative or official partner of that institution unless explicitly stated and verified.",
        },
        {
          type: "p",
          text: "UniLink is not responsible for third-party websites or their content, availability or privacy practices.",
        },
      ],
    },
    {
      heading: "15. Website Availability",
      blocks: [
        {
          type: "p",
          text: "We aim to provide a reliable website but cannot guarantee uninterrupted or error-free operation.",
        },
        { type: "p", text: "We may:" },
        {
          type: "list",
          items: [
            "update features;",
            "modify content;",
            "suspend services;",
            "remove functionality; or",
            "perform maintenance",
          ],
        },
        { type: "p", text: "where reasonably necessary." },
      ],
    },
    {
      heading: "16. Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "To the extent permitted by applicable law, UniLink is not responsible for losses resulting solely from:",
        },
        {
          type: "list",
          items: [
            "reliance on outdated third-party information;",
            "decisions made independently by universities or other institutions;",
            "visa or immigration decisions;",
            "scholarship decisions;",
            "third-party website failures;",
            "circumstances outside UniLink's reasonable control; or",
            "treating exploratory automated recommendations as guaranteed outcomes.",
          ],
        },
        {
          type: "p",
          text: "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.",
        },
      ],
    },
    {
      heading: "17. Privacy",
      blocks: [
        {
          type: "p",
          text: `Use of personal information is governed by the ${company.legalName} Privacy Policy.`,
        },
        {
          type: "p",
          text: "By submitting personal information through the website, you acknowledge that it will be handled as described in that Policy and any relevant contextual privacy notice.",
        },
      ],
    },
    {
      heading: "18. Changes to These Terms",
      blocks: [
        { type: "p", text: "We may update these Terms to reflect changes in:" },
        {
          type: "list",
          items: [
            "our services;",
            "website functionality;",
            "technology;",
            "business practices; or",
            "applicable law.",
          ],
        },
        {
          type: "p",
          text: "The current version will be published on this website with its effective or last-updated date.",
        },
        {
          type: "p",
          text: "Continued use after an update constitutes acceptance to the extent permitted by applicable law.",
        },
      ],
    },
    {
      heading: "19. Governing Law",
      blocks: [
        {
          type: "p",
          text: `These Terms are governed by the laws of ${company.jurisdiction}, without prejudice to mandatory rights that may apply under other applicable law.`,
        },
        {
          type: "p",
          text: "Any dispute will be handled in accordance with applicable law and any dispute-resolution procedures agreed between UniLink and the relevant user.",
        },
      ],
    },
    {
      heading: "20. Contact",
      blocks: [
        { type: "p", text: "For questions concerning these Terms:" },
        { type: "p", text: company.legalName },
        {
          type: "list",
          items: [
            `Email: ${company.legalEmail}`,
            `Telephone: ${company.phone}`,
            `Address: ${company.address}`,
          ],
        },
      ],
    },
  ],
};

const cookiePolicy: LegalDocument = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  updated: company.cookiePolicyUpdated,
  summary:
    "How UniLink Nexus International uses cookies and similar technologies on this website, and the choices available to you.",
  sections: [
    {
      heading: "1. About This Policy",
      blocks: [
        {
          type: "p",
          text: `This Cookie Policy explains how ${company.legalName} uses cookies and similar technologies on this website. It should be read together with our Privacy Policy, which explains how personal information is handled more generally.`,
        },
      ],
    },
    {
      heading: "2. What Cookies Are",
      blocks: [
        {
          type: "p",
          text: "Cookies are small text files placed on your device when you visit a website. Similar technologies include local storage, session storage and pixels. They allow a website to remember your actions and preferences over time.",
        },
        {
          type: "p",
          text: "This website also uses your browser's local and session storage to keep progress in tools such as the UniLink Pathway Advisor and the Start My Application form. That information stays on your device unless you choose to submit it.",
        },
      ],
    },
    {
      heading: "3. How We Use Cookies",
      blocks: [
        { type: "p", text: "We may use cookies and similar technologies for:" },
        {
          type: "list",
          items: [
            "essential website functionality;",
            "remembering preferences;",
            "keeping your progress in interactive tools;",
            "understanding website performance;",
            "analytics; and",
            "improving user experience.",
          ],
        },
        {
          type: "p",
          text: "Essential technologies are necessary for the website to function. Where required by applicable law, non-essential cookies will be subject to appropriate consent.",
        },
      ],
    },
    {
      heading: "4. Third-Party Cookies",
      blocks: [
        {
          type: "p",
          text: "Some cookies may be set by third-party services used to operate or analyse this website, such as hosting, analytics or communications providers. Those providers handle information in accordance with their own policies.",
        },
      ],
    },
    {
      heading: "5. Your Choices",
      blocks: [
        {
          type: "p",
          text: "Most browsers allow you to view, delete and block cookies through their settings. Clearing your browser storage will also remove any saved progress in the Pathway Advisor or application form.",
        },
        {
          type: "p",
          text: "Disabling essential cookies may affect how parts of this website work.",
        },
      ],
    },
    {
      heading: "6. Changes and Contact",
      blocks: [
        {
          type: "p",
          text: "We may update this Cookie Policy as our website and legal obligations change. The current version is always published here with its last-updated date.",
        },
        { type: "p", text: `Questions can be directed to ${company.privacyEmail}.` },
      ],
    },
  ],
};

const disclaimer: LegalDocument = {
  slug: "disclaimer",
  title: "Disclaimer",
  updated: company.disclaimerUpdated,
  summary:
    "The scope and limits of the guidance provided by UniLink Nexus International, including automated Pathway Advisor results.",
  sections: [
    {
      heading: "1. General Guidance Only",
      blocks: [
        {
          type: "p",
          text: `Information on this website is provided by ${company.legalName} for general educational planning purposes. It is not legal, financial, immigration or admissions advice.`,
        },
        {
          type: "p",
          text: "Requirements, costs, deadlines and immigration rules change over time and vary by institution, programme and country. Always verify important details with the relevant institution or authority before acting.",
        },
      ],
    },
    {
      heading: "2. No Guarantees",
      blocks: [
        { type: "p", text: "UniLink does not guarantee:" },
        {
          type: "list",
          items: [
            "admission to any university, college or programme;",
            "scholarship awards or other financial assistance;",
            "visa or immigration approval;",
            "employment or academic outcomes; or",
            "any other decision made by a third party.",
          ],
        },
        {
          type: "p",
          text: "Admission decisions rest with institutions, visa decisions with government authorities, and funding decisions with scholarship providers.",
        },
      ],
    },
    {
      heading: "3. Automated and AI-Assisted Results",
      blocks: [
        {
          type: "p",
          text: "The UniLink Pathway Advisor and similar tools produce exploratory suggestions using rules and, where applicable, artificial intelligence. Results indicate directions worth investigating — they are not eligibility assessments, admission decisions or professional advice.",
        },
      ],
    },
    {
      heading: "4. Third-Party Content",
      blocks: [
        {
          type: "p",
          text: "Links to universities, government sites, scholarship providers and other organisations are provided for convenience. A link is not an endorsement, partnership or representation, and UniLink is not responsible for third-party content or availability.",
        },
      ],
    },
    {
      heading: "5. Related Policies and Contact",
      blocks: [
        {
          type: "p",
          text: "This Disclaimer should be read together with our Terms of Use and Privacy Policy.",
        },
        { type: "p", text: `Questions can be directed to ${company.legalEmail}.` },
      ],
    },
  ],
};

export const legalDocuments: Record<string, LegalDocument> = {
  "privacy-policy": privacyPolicy,
  terms: termsOfUse,
  "cookie-policy": cookiePolicy,
  disclaimer,
};

export const legalLinks = [
  { label: "Privacy Policy", page: "privacy-policy" },
  { label: "Terms of Use", page: "terms" },
  { label: "Cookie Policy", page: "cookie-policy" },
  { label: "Disclaimer", page: "disclaimer" },
];
