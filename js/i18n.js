/* ==========================================================
   TRADUZIONI DEL SITO: italiano (predefinito, scritto nell'HTML),
   inglese e spagnolo. Nessuna libreria esterna.

   Come funziona:
   - Ogni testo tradotto ha un attributo data-i18n="chiave" (testo)
     oppure data-i18n-aria / data-i18n-alt / data-i18n-content (attributi).
   - Il testo italiano resta nell'HTML: se una chiave non ha traduzione
     in una lingua, resta l'italiano.
   - La lingua viene scelta cosí:
       1. scelta salvata dal visitatore (pulsanti IT / EN / ES);
       2. altrimenti il Paese ricavato dall'IP (ipapi.co);
       3. altrimenti la lingua del browser; infine inglese.
   ========================================================== */
(function () {
  'use strict';

  var LINGUE = ['it', 'en', 'es'];
  var CHIAVE_SALVATA = 'sito-lingua';

  // Paesi (codice ISO) che ricevono lo spagnolo; gli altri, se noti, ricevono l'inglese
  var PAESE_LINGUA = {
    IT: 'it', SM: 'it', VA: 'it',
    ES: 'es', MX: 'es', AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', CU: 'es',
    DO: 'es', EC: 'es', SV: 'es', GT: 'es', HN: 'es', NI: 'es', PA: 'es', PY: 'es',
    PE: 'es', PR: 'es', UY: 'es', VE: 'es', GQ: 'es'
  };

  // Testi usati dallo script (form, pulsanti Amazon, etichette): riferimento italiano
  var IT_SCRIPT = {
    'buy': 'Acquista su Amazon',
    'buyAria': 'Acquista {t} su Amazon (si apre in una nuova scheda)',
    'social.aria': '{p} di Giuseppe Zanoni (si apre in una nuova scheda)',
    'contact.subject': 'Messaggio dal sito - ',
    'contact.bodyName': 'Nome: ',
    'contact.bodyEmail': 'Email: ',
    'contact.status': 'Si apre il tuo programma di posta con il messaggio pronto da inviare.'
  };

  var DIZIONARIO = {
    en: {
      'meta.title': "Giuseppe Zanoni — Author | Books and Biography",
      'meta.description': "Giuseppe Zanoni: children's books set in the Venice lagoon and the BLACKFRAME geopolitical thrillers. Discover the works and buy them on Amazon.",
      'meta.cvTitle': "Giuseppe Zanoni — IT Project Manager | Résumé",
      'meta.cvDescription': "Professional résumé of Giuseppe Zanoni, IT Project Manager and IT Manager: IT projects, infrastructure, ERP and digital transformation.",
      'skip': "Skip to content",
      'logo.aria': "Giuseppe Zanoni, back to the top",
      'menu.aria': "Open or close the menu",
      'nav.aria': "Main navigation",
      'nav.home': "Home",
      'nav.bio': "Biography",
      'nav.books': "Books",
      'nav.cv': "Résumé",
      'nav.contact': "Contact",
      'amazon.aria': "Visit Giuseppe Zanoni's Amazon profile (opens in a new tab)",
      'hero.eyebrow': "Writer · also known as «Lo Zio Beppe» (Uncle Beppe)",
      'hero.subtitle': "From the lagoons of Venice to geopolitical thrillers.",
      'hero.discover': "Discover the books",
      'hero.amazon': "Visit Amazon",
      'scroll.aria': "Scroll to the biography",
      'scroll.label': "Scroll",
      'bio.eyebrow': "Biography",
      'bio.title': "The author",
      'bio.statsAria': "Author figures",
      'bio.stat1': "works",
      'bio.stat2': "narrative worlds",
      'bio.stat3': "languages for Leo",
      'bio.photoAlt': "Black-and-white portrait of Giuseppe Zanoni",
      'bio.lead': "IT Manager, Giuseppe Zanoni builds worlds.",
      'bio.p1': "He has developed two distinct literary voices: on one side, children's books set in the Venice lagoon, with talking animals and vivid colours; on the other, the BLACKFRAME series of geopolitical thrillers, where algorithms, financial markets and invisible structures of power intertwine.",
      'bio.p2': "The common thread is Venice, present throughout his work like a quiet canal.",
      'bio.p3': "He writes for the curious: children who want to understand the world, and adults who suspect the world is more complicated than it looks.",
      'bio.more': "Discover his works →",
      'scene.aria': "Behind the pages",
      'scene.alt': "Giuseppe Zanoni sitting at a desk, handwriting on a sheet of paper",
      'books.eyebrow': "Bibliography",
      'books.title': "The Works",
      'books.indexAria': "Index of works",
      'group.adults': "Stories for adults",
      'group.kids': "Fairy tales for children",
      'badge.thriller': "Geopolitical thriller · BLACKFRAME",
      'badge.romance': "Venetian romantic comedy",
      'badge.narrative': "Vicino al fuoco · Fiction",
      'badge.history': "Vicino al fuoco · Historical comedy",
      'badge.kids': "Children's book",
      'badge.coloring': "Children's book · Colouring book",
      'book.foundations': "Foundations",
      'book.shadow': "The Shadow Protocol",
      'book.cat': "Technically, It's the Cat's Fault",
      'book.leo': "Leo the Little Crab and the Secret of the Lagoon",
      'cover.shadow': "Cover of The Shadow Protocol",
      'cover.foundations': "Cover of Foundations",
      'cover.usignolo': "Cover of L'Usignolo di Rialto",
      'cover.cat': "Cover of Technically, It's the Cat's Fault",
      'cover.mirano': "Cover of Il cielo di Mirano",
      'cover.leo': "Cover of Leo the Little Crab and the Secret of the Lagoon",
      'cover.montagna': "Cover of La montagna che russava",
      'cover.storielle': "Cover of Storielle Veneziane da Colorare",
      'cover.crescere': "Cover of Crescere con leggerezza: storielle per bambini",
      'desc.shadow': "A financial algorithm vanishes from the radar and leaves behind a trail of questions. Who built it, and for what purpose?",
      'desc.foundations': "The foundations of an invisible system of power begin to crack, one truth at a time.",
      'desc.usignolo': "Among campi, bridges and cafés overlooking the Grand Canal, an unexpected encounter changes the rhythm of a summer day.",
      'desc.cat': "A household mishap, an overly logical explanation and a chain of misunderstandings. When cats are involved, nothing is really anyone's fault.",
      'desc.mirano': "Mirano, 1761: an impertinent goose and a bucket of lime bring together two lives that were never meant to meet. A Venetian comedy of feasts, fog and a secret. Written with Raoul Lazzari.",
      'desc.leo': "Leo is a curious little crab who, one morning, discovers a secret hidden in the lagoon's waters.",
      'desc.montagna': "A hundred years ago the mountain snored. In Roccasorda, eleven-year-old Brina, with very sharp ears, is the only one who hears that Mount Dormiglione has started snoring again: whenever it snores, the snow comes down.",
      'desc.storielle': "Twenty magical stories set in Venice, with pages to colour: a winged lion who guards dreams, a gondola that longs to fly.",
      'desc.crescere': "Stories to help children discover themselves and the world, among enchanted villages and the landscapes of Japan, with Lila, Laura, Finn and Han.",
      'award.montagna': "Winner, second place at the national competition «Il racconto nel cassetto», AssoAli, 23rd edition 2026",
      'buy': "Buy on Amazon",
      'buyAria': "Buy {t} on Amazon (opens in a new tab)",
      'cv.eyebrow': "Profession",
      'cv.title': "Résumé",
      'cv.lead': "IT Manager and consultant for technology projects.",
      'cv.p': "At work I bring the same method I use for writing: structure, precision and attention to detail.",
      'cv.btn': "Read the résumé",
      'social.eyebrow': "Social",
      'social.title': "Follow me",
      'social.aria': "{p} of Giuseppe Zanoni (opens in a new tab)",
      'social.ig.p': "Behind the scenes of the books, the Venice lagoon and news from the BLACKFRAME series.",
      'social.ig.go': "Follow on Instagram →",
      'social.fb.p': "News, presentations and meetings with the readers of my stories.",
      'social.fb.go': "Follow on Facebook →",
      'social.li.p': "My path as an IT Manager and reflections on technical work.",
      'social.li.go': "Connect on LinkedIn →",
      'contact.eyebrow': "Contact",
      'contact.title': "Write to the author",
      'contact.p': "For questions, collaborations or meetings with readers, leave a message.",
      'contact.name': "Name",
      'contact.email': "Email",
      'contact.message': "Message",
      'contact.send': "Send message",
      'contact.subject': "Message from the website - ",
      'contact.bodyName': "Name: ",
      'contact.bodyEmail': "Email: ",
      'contact.status': "Your email app is opening with the message ready to send.",
      'footer.rights': "All rights reserved.",
      'footer.cvAria': "Professional résumé of Giuseppe Zanoni",
      'footer.socialNav': "Social profiles",
      'cvp.back': "← Back to the author's website",
      'cvp.eyebrow': "Professional résumé",
      'cvp.summary': "Mirano (VE), Italy · IT consultant and IT Manager with over ten years of experience managing IT projects and infrastructure in structured, multi-site companies.",
      'cvp.download': "Download the CV (PDF)",
      'cvp.contactBtn': "Get in touch",
      'cvp.profile': "Profile",
      'cvp.p1': "I coordinate technology evolution and digital transformation projects, from requirements analysis to go-live, managing internal stakeholders, suppliers and technology partners within time, budget, SLA and KPI targets.",
      'cvp.p2': "I combine a solid technical base (infrastructure, systems, networks, security) with the ability to bridge IT and business functions. Based in Veneto, I hold a driving licence (category B).",
      'cvp.skills': "Key skills",
      'cvp.sk1': "IT project management (end-to-end)",
      'cvp.sk2': "Requirements analysis and functional specifications",
      'cvp.sk3': "Stakeholder, supplier and partner management",
      'cvp.sk4': "Planning of timelines, budget and resources",
      'cvp.sk5': "Project risk management",
      'cvp.sk7': "Digital transformation · Industry 4.0/5.0",
      'cvp.sk8': "ITSM and ticketing (Jira, ServiceNow, Confluence)",
      'cvp.sk9': "Windows/Linux systems, networks, cloud and on-premise",
      'cvp.sk10': "Cybersecurity and GDPR",
      'cvp.sk11': "Coordination and training of technical teams",
      'cvp.experience': "Professional experience",
      'cvp.j1.title': "IT Consultant",
      'cvp.j1.meta': "Comunicagroup S.r.l., Treviso · 2025 – present · IT and telecommunications multi-service agency",
      'cvp.j1.b1': "Management and development of ICT projects and of IT and telecommunications solutions for client companies.",
      'cvp.j1.b2': "Analysis of client needs, translated into requirements and specifications; coordination of suppliers and technology partners.",
      'cvp.j1.b3': "Systems support on infrastructure, networks and security, with attention to timelines, costs and service continuity.",
      'cvp.j2.b1': "Coordination of digitalisation projects (implementation of ERP Mago .N and CPQ) from requirements analysis to go-live, managing internal stakeholders and external suppliers.",
      'cvp.j2.b2': "Governance of timelines, IT budget and contracts with partners; management of infrastructure, security, backup and business continuity.",
      'cvp.j2.b3': "Leadership of Industry 4.0/5.0 initiatives supporting production and the supply chain.",
      'cvp.j3.b1': "Management of infrastructure projects and system migrations (Active Directory via LDAP, MDM, mail provider) for headquarters and branches.",
      'cvp.j3.b2': "Supplier coordination and ticketing management (Jira, Confluence, Odoo); administration of Google Workspace and document management.",
      'cvp.j4.b1': "Management of the corporate IT infrastructure and related projects in an international, structured environment.",
      'cvp.j4.b2': "IT service management and ticketing (ServiceNow, Jira, Confluence); administration of consoles (SCCM, Active Directory, Jamf, Airwatch); IT budget in SAP and team coordination.",
      'cvp.j5.b1': "Specialist technical support (Apple) and management of information systems.",
      'cvp.langs': "Languages",
      'cvp.lang1': "Italian (native)",
      'cvp.lang2': "English (C1)",
      'cvp.lang3': "Spanish (B1)"
    },
    es: {
      'meta.title': "Giuseppe Zanoni — Autor | Libros y biografía",
      'meta.description': "Giuseppe Zanoni: libros infantiles ambientados en la laguna de Venecia y thrillers geopolíticos de la serie BLACKFRAME. Descubre las obras y cómpralas en Amazon.",
      'meta.cvTitle': "Giuseppe Zanoni — IT Project Manager | Currículum",
      'meta.cvDescription': "Currículum profesional de Giuseppe Zanoni, IT Project Manager e IT Manager: proyectos IT, infraestructuras, ERP y transformación digital.",
      'skip': "Ir al contenido",
      'logo.aria': "Giuseppe Zanoni, volver al inicio",
      'menu.aria': "Abrir o cerrar el menú",
      'nav.aria': "Navegación principal",
      'nav.home': "Inicio",
      'nav.bio': "Biografía",
      'nav.books': "Libros",
      'nav.cv': "Currículum",
      'nav.contact': "Contacto",
      'amazon.aria': "Visita el perfil de Amazon de Giuseppe Zanoni (se abre en una nueva pestaña)",
      'hero.eyebrow': "Escritor · conocido también como «Lo Zio Beppe»",
      'hero.subtitle': "De las lagunas de Venecia a los thrillers geopolíticos.",
      'hero.discover': "Descubre los libros",
      'hero.amazon': "Visita Amazon",
      'scroll.aria': "Ir a la biografía",
      'scroll.label': "Desplázate",
      'bio.eyebrow': "Biografía",
      'bio.title': "El autor",
      'bio.statsAria': "Cifras del autor",
      'bio.stat1': "obras",
      'bio.stat2': "mundos narrativos",
      'bio.stat3': "idiomas para Leo",
      'bio.photoAlt': "Retrato en blanco y negro de Giuseppe Zanoni",
      'bio.lead': "IT Manager, Giuseppe Zanoni construye mundos.",
      'bio.p1': "Ha desarrollado dos voces literarias distintas: por un lado, libros infantiles ambientados en la laguna de Venecia, con animales parlantes y colores vivos; por otro, los thrillers geopolíticos de la serie BLACKFRAME, donde algoritmos, mercados financieros y estructuras de poder invisibles se entrelazan.",
      'bio.p2': "El hilo conductor es Venecia, presente en toda su obra como un canal silencioso.",
      'bio.p3': "Escribe para los curiosos: niños que quieren entender el mundo y adultos que sospechan que el mundo es más complicado de lo que parece.",
      'bio.more': "Descubre sus obras →",
      'scene.aria': "Detrás de las páginas",
      'scene.alt': "Giuseppe Zanoni sentado a un escritorio, escribiendo a mano en una hoja de papel",
      'books.eyebrow': "Bibliografía",
      'books.title': "Las obras",
      'books.indexAria': "Índice de obras",
      'group.adults': "Relatos para adultos",
      'group.kids': "Cuentos para niños",
      'badge.thriller': "Thriller geopolítico · BLACKFRAME",
      'badge.romance': "Comedia romántica veneciana",
      'badge.narrative': "Vicino al fuoco · Narrativa",
      'badge.history': "Vicino al fuoco · Comedia histórica",
      'badge.kids': "Libro infantil",
      'badge.coloring': "Libro infantil · Para colorear",
      'cover.shadow': "Portada de Il protocollo ombra",
      'cover.foundations': "Portada de Fondamenta",
      'cover.usignolo': "Portada de L'Usignolo di Rialto",
      'cover.cat': "Portada de Tecnicamente è colpa del gatto",
      'cover.mirano': "Portada de Il cielo di Mirano",
      'cover.leo': "Portada de Leo il piccolo granchio e il segreto della laguna",
      'cover.montagna': "Portada de La montagna che russava",
      'cover.storielle': "Portada de Storielle Veneziane da Colorare",
      'cover.crescere': "Portada de Crescere con leggerezza: storielle per bambini",
      'desc.shadow': "Un algoritmo financiero desaparece del radar y deja tras de sí una estela de preguntas. ¿Quién lo construyó y con qué fin?",
      'desc.foundations': "Los cimientos de un sistema de poder invisible empiezan a resquebrajarse, una verdad a la vez.",
      'desc.usignolo': "Entre campos, puentes y cafés frente al Gran Canal, un encuentro inesperado cambia el ritmo de un día de verano.",
      'desc.cat': "Un percance doméstico, una explicación demasiado lógica y una cadena de malentendidos. Cuando hay gatos de por medio, nada es realmente culpa de quien crees.",
      'desc.mirano': "Mirano, 1761: una oca impertinente y un cubo de cal hacen que se encuentren dos vidas que no debían cruzarse. Una comedia véneta de fiestas, niebla y un secreto. Escrita con Raoul Lazzari.",
      'desc.leo': "Leo es un pequeño cangrejo curioso que, una mañana, descubre un secreto escondido en las aguas de la laguna.",
      'desc.montagna': "Hace cien años la montaña roncó. En Roccasorda, Brina, de once años y oídos finísimos, es la única que oye que el monte Dormiglione ha vuelto a roncar: cada vez que ronca, cae la nieve.",
      'desc.storielle': "Veinte historias mágicas ambientadas en Venecia, con páginas para colorear: un león alado guardián de los sueños y una góndola que quiere volar.",
      'desc.crescere': "Historias para acompañar a los niños en el descubrimiento de sí mismos y del mundo, entre pueblos encantados y paisajes de Japón, con Lila, Laura, Finn y Han.",
      'award.montagna': "Ganador, segundo puesto en el concurso nacional «Il racconto nel cassetto», AssoAli, XXIII edición 2026",
      'buy': "Comprar en Amazon",
      'buyAria': "Comprar {t} en Amazon (se abre en una nueva pestaña)",
      'cv.eyebrow': "Profesión",
      'cv.title': "Currículum",
      'cv.lead': "IT Manager y consultor de proyectos tecnológicos.",
      'cv.p': "En el trabajo aplico el mismo método que uso para escribir: estructura, precisión y atención al detalle.",
      'cv.btn': "Leer el currículum",
      'social.eyebrow': "Redes",
      'social.title': "Sígueme",
      'social.aria': "{p} de Giuseppe Zanoni (se abre en una nueva pestaña)",
      'social.ig.p': "Detrás de escena de los libros, la laguna de Venecia y las novedades de la serie BLACKFRAME.",
      'social.ig.go': "Sigue en Instagram →",
      'social.fb.p': "Novedades, presentaciones y encuentros con quienes leen mis historias.",
      'social.fb.go': "Sigue en Facebook →",
      'social.li.p': "Mi trayectoria como IT Manager y reflexiones sobre el trabajo técnico.",
      'social.li.go': "Conéctate en LinkedIn →",
      'contact.eyebrow': "Contacto",
      'contact.title': "Escribe al autor",
      'contact.p': "Para preguntas, colaboraciones o encuentros con lectores, déjame un mensaje.",
      'contact.name': "Nombre",
      'contact.email': "Email",
      'contact.message': "Mensaje",
      'contact.send': "Enviar mensaje",
      'contact.subject': "Mensaje desde la web - ",
      'contact.bodyName': "Nombre: ",
      'contact.bodyEmail': "Email: ",
      'contact.status': "Se abre tu programa de correo con el mensaje listo para enviar.",
      'footer.rights': "Todos los derechos reservados.",
      'footer.cvAria': "Currículum profesional de Giuseppe Zanoni",
      'footer.socialNav': "Perfiles sociales",
      'cvp.back': "← Volver al sitio del autor",
      'cvp.eyebrow': "Currículum profesional",
      'cvp.summary': "Mirano (VE), Italia · Consultor y IT Manager con más de diez años de experiencia en la gestión de proyectos IT e infraestructuras en empresas estructuradas y multisede.",
      'cvp.download': "Descargar el CV (PDF)",
      'cvp.contactBtn': "Contáctame",
      'cvp.profile': "Perfil",
      'cvp.p1': "Coordino proyectos de evolución tecnológica y transformación digital, desde el análisis de requisitos hasta la puesta en marcha, gestionando stakeholders internos, proveedores y socios tecnológicos dentro de plazos, presupuesto, SLA y KPI.",
      'cvp.p2': "Combino una sólida base técnica (infraestructura, sistemas, redes, seguridad) con la capacidad de unir las áreas IT y de negocio. Resido en el Véneto y tengo carné de conducir (tipo B).",
      'cvp.skills': "Competencias clave",
      'cvp.sk1': "Gestión de proyectos IT (de principio a fin)",
      'cvp.sk2': "Análisis de requisitos y especificaciones funcionales",
      'cvp.sk3': "Gestión de stakeholders, proveedores y socios",
      'cvp.sk4': "Planificación de plazos, presupuesto y recursos",
      'cvp.sk5': "Gestión de riesgos de proyecto",
      'cvp.sk7': "Transformación digital · Industria 4.0/5.0",
      'cvp.sk8': "ITSM y ticketing (Jira, ServiceNow, Confluence)",
      'cvp.sk9': "Sistemas Windows/Linux, redes, cloud y on-premise",
      'cvp.sk10': "Ciberseguridad y RGPD",
      'cvp.sk11': "Coordinación y formación de equipos técnicos",
      'cvp.experience': "Experiencia profesional",
      'cvp.j1.title': "Consultor IT",
      'cvp.j1.meta': "Comunicagroup S.r.l., Treviso · 2025 – actualidad · Agencia de multiservicios informáticos y de telecomunicaciones",
      'cvp.j1.b1': "Gestión y desarrollo de proyectos TIC y de soluciones informáticas y de telecomunicaciones para empresas cliente.",
      'cvp.j1.b2': "Análisis de las necesidades de los clientes y traducción en requisitos y especificaciones; coordinación de proveedores y socios tecnológicos.",
      'cvp.j1.b3': "Soporte de sistemas en infraestructura, redes y seguridad, con atención a plazos, costes y continuidad del servicio.",
      'cvp.j2.b1': "Coordinación de proyectos de digitalización (implantación de ERP Mago .N y CPQ) desde el análisis de requisitos hasta la puesta en marcha, gestionando stakeholders internos y proveedores externos.",
      'cvp.j2.b2': "Gobernanza de plazos, presupuesto IT y contratos con socios; gestión de infraestructura, seguridad, backup y continuidad operativa.",
      'cvp.j2.b3': "Liderazgo de iniciativas Industria 4.0/5.0 de apoyo a la producción y a la cadena de suministro.",
      'cvp.j3.b1': "Gestión de proyectos de infraestructura y migraciones de sistemas (Active Directory vía LDAP, MDM, proveedor de correo) para sede y sucursales.",
      'cvp.j3.b2': "Coordinación de proveedores y gestión de ticketing (Jira, Confluence, Odoo); administración de Google Workspace y gestión documental.",
      'cvp.j4.title': "Administrador TIC",
      'cvp.j4.b1': "Gestión de la infraestructura IT corporativa y de sus proyectos en un entorno internacional y estructurado.",
      'cvp.j4.b2': "Gestión de servicios IT y ticketing (ServiceNow, Jira, Confluence); administración de consolas (SCCM, Active Directory, Jamf, Airwatch); presupuesto IT en SAP y coordinación del equipo.",
      'cvp.j5.b1': "Soporte técnico especializado (Apple) y gestión de los sistemas de información.",
      'cvp.langs': "Idiomas",
      'cvp.lang1': "Italiano (nativo)",
      'cvp.lang2': "Inglés (C1)",
      'cvp.lang3': "Español (B1)"
    }
  };

  var attuale = 'it';
  var sceltaManuale = false;

  function testo(chiave) {
    var d = DIZIONARIO[attuale];
    if (d && d[chiave] !== undefined) return d[chiave];
    return IT_SCRIPT[chiave] !== undefined ? IT_SCRIPT[chiave] : '';
  }

  // Salva i testi italiani originali, prima di qualsiasi cambio di lingua
  function memorizzaOriginali() {
    document.querySelectorAll('[data-i18n], [data-i18n-aria], [data-i18n-alt], [data-i18n-content]').forEach(function (el) {
      el.__it = {
        html: el.innerHTML,
        aria: el.getAttribute('aria-label'),
        alt: el.getAttribute('alt'),
        content: el.getAttribute('content')
      };
    });
  }

  function applica(lingua) {
    attuale = lingua;
    var d = DIZIONARIO[lingua] || {};
    var en = lingua === 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      el.innerHTML = d[k] !== undefined ? d[k] : el.__it.html;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', d[k] !== undefined ? d[k] : el.__it.aria);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', d[k] !== undefined ? d[k] : el.__it.alt);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-content');
      el.setAttribute('content', d[k] !== undefined ? d[k] : el.__it.content);
    });

    // Pulsanti "Acquista" dei libri e link ai social
    document.querySelectorAll('.step > .btn-gold').forEach(function (btn) {
      var titolo = btn.parentNode.querySelector('h3');
      var nome = titolo ? titolo.textContent.trim() : '';
      btn.textContent = testo('buy');
      btn.setAttribute('aria-label', testo('buyAria').replace('{t}', nome));
    });
    document.querySelectorAll('[data-social]').forEach(function (el) {
      el.setAttribute('aria-label', testo('social.aria').replace('{p}', el.getAttribute('data-social')));
    });

    // Copertina e link Amazon del libro "Tecnicamente è colpa del gatto": EN solo dove esiste
    document.querySelectorAll('img[data-it-src]').forEach(function (img) {
      img.setAttribute('src', en ? img.getAttribute('data-en-src') : img.getAttribute('data-it-src'));
    });
    document.querySelectorAll('a[data-it-href]').forEach(function (a) {
      a.setAttribute('href', en ? a.getAttribute('data-en-href') : a.getAttribute('data-it-href'));
    });

    document.documentElement.setAttribute('lang', lingua);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      var on = b.getAttribute('data-set-lang') === lingua;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function leggiSalvata() {
    try {
      var v = localStorage.getItem(CHIAVE_SALVATA);
      return LINGUE.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }

  function salva(lingua) {
    try { localStorage.setItem(CHIAVE_SALVATA, lingua); } catch (e) { /* memoria non disponibile */ }
  }

  function linguaDelBrowser() {
    var lista = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < lista.length; i++) {
      var c = String(lista[i]).slice(0, 2).toLowerCase();
      if (LINGUE.indexOf(c) > -1) return c;
    }
    return null;
  }

  // Paese del visitatore dall'IP (codice ISO a due lettere), oppure null
  function paesePerIp() {
    if (!window.fetch || !window.AbortController) return Promise.resolve(null);
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 3000);
    return fetch('https://ipapi.co/country/', { signal: ctrl.signal, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (t) {
        clearTimeout(timer);
        var c = (t || '').trim().toUpperCase();
        return /^[A-Z]{2}$/.test(c) ? c : null;
      })
      .catch(function () { clearTimeout(timer); return null; });
  }

  function avvia() {
    memorizzaOriginali();

    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        sceltaManuale = true;
        var lingua = b.getAttribute('data-set-lang');
        salva(lingua);
        applica(lingua);
      });
    });

    var salvata = leggiSalvata();
    if (salvata) {
      applica(salvata);
      return;
    }

    // Nessuna scelta salvata: suggerisci la lingua in base al Paese (IP), poi al browser
    paesePerIp().then(function (paese) {
      if (sceltaManuale) return;
      var lingua = paese ? (PAESE_LINGUA[paese] || 'en') : (linguaDelBrowser() || 'en');
      applica(lingua);
    });
  }

  window.sitoI18n = {
    testo: testo,
    lingua: function () { return attuale; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', avvia);
  } else {
    avvia();
  }
})();
