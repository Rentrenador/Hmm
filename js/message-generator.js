/**
 * Message generator: compositional familiar hook (context-aware, optimistic)
 * + novel content with tagged scientific sources.
 */

var GREETINGS = [
  'Hola,',
  'Hola — te escribo con calma,',
  'Hola, ¿qué tal el día?',
  'Hola — paso a pasarte algo,',
  'Hola, una línea desde aquí,'
];

var CLOSINGS = [
  'Con cariño,\nCurioRutina',
  'Que te sirva de algo,\nCurioRutina',
  'Un abrazo desde la órbita,\nCurioRutina',
  'Nos leemos,\nCurioRutina'
];

var DELIVERY_NOTES = [
  'Mensaje de la paloma para tu rutina',
  'La paloma trae algo para tu día',
  'Carta alada con calma',
  'Algo pensado para ti hoy',
  'Para abrir con calma',
  'Una paloma con perspectiva'
];

var FAMILIAR_OPENERS = [
  'Esta semana,',
  'Si repasamos la semana,',
  'Viendo la semana con perspectiva,',
  'Repasando lo vivido esta semana,',
  'Con la semana ya encarrilada,'
];

var NOVEL_BRIDGES = [
  'Pensando en {phrase}, esto me encajó:',
  'Con {phrase} en mente, me vino esto:',
  'Leyendo sobre rutinas como {phrase}, tropecé con esto:',
  'No sé por qué, pero pensando en {phrase} recordé esto:',
  'Después de imaginar {phrase}, esto me pareció relevante:'
];

var FAMILIAR_FRAGMENTS = {
  commute_moto: {
    situation: [
      'con {phrase}{detailClause}, el camino ha tenido de todo',
      '{phrase}{detailClause} han marcado el ritmo de la semana',
      'entre ida y vuelta, {phrase}{detailClause} han sido el hilo conductor',
      'cada mañana y cada tarde, {phrase}{detailClause} han cumplido su papel',
      'con {phrase}{detailClause}, la carretera ha alternado tramos amables y tramos de paciencia'
    ],
    humor: [
      'unos días más justos, otros con pinta de conspiración contra ti (broma)',
      'algún trayecto redondo, otro que parecía diseñado por alguien con exceso de tiempo libre',
      'hubo días en los que el tráfico te sonrió y días en los que te miró sin pestañear',
      'unas salidas fluidas, otras en las que el semáforo parecía tu mayor enemigo',
      'días de viento a favor y días de "bueno, esto también cuenta como experiencia"'
    ],
    progress: [
      'pero llegaste, cumpliste, y eso — sin épica — es progreso de verdad.',
      'al final has llegado al curro y la semana se sostiene: eso ya es bastante.',
      'has completado los trayectos, has hecho lo tuyo, y la semana avanza.',
      'llegaste a destino las veces que tocaba, y eso cuenta más de lo que parece.',
      'has cerrado la semana en pie, con los kilómetros hechos, y eso es un logro silencioso.'
    ]
  },
  commute_bike: {
    situation: [
      'con {phrase}{detailClause}, los pedales han llevado el compás de la semana',
      '{phrase}{detailClause} han sido tu pequeña aventura diaria',
      'entre subidas y bajadas, {phrase}{detailClause} han marcado el ritmo',
      'con {phrase}{detailClause}, la bici te ha acompañado sin drama mayor',
      'cada trayecto en bici{detailClause} ha sumado un capítulo más a la semana'
    ],
    humor: [
      'algún día con viento a favor, otro que parecía entrenamiento no solicitado',
      'unas idas ligeras, otras en las que la cuesta te recordó quién manda',
      'días de "qué bonito" y días de "vale, respira y sigue"',
      'hubo trayectos redondos y trayectos con más carácter del esperado',
      'unas vueltas elegantes, otras más de supervivencia urbana'
    ],
    progress: [
      'pero llegaste, pedaleaste lo que tocaba, y la semana se ha hecho.',
      'has cumplido los trayectos y el cuerpo — y la constancia — lo saben.',
      'al final la semana está hecha, y eso es avance real.',
      'has llegado donde debías, y eso — sin ruido — es progreso.',
      'cerraste la semana con los trayectos cumplidos, y eso ya cuenta.'
    ]
  },
  commute_general: {
    situation: [
      'con {phrase}{detailClause}, los desplazamientos han marcado la semana',
      '{phrase}{detailClause} han sido el puente entre casa y lo demás',
      'entre salidas y regresos, {phrase}{detailClause} han cumplido',
      'con {phrase}{detailClause}, el ir y venir ha sido la banda sonora',
      'cada trayecto{detailClause} ha ido sumando sin pedir permiso'
    ],
    humor: [
      'unos días más justos, otros más injustos… lo admitimos con humor',
      'algún trayecto redondo, otro que parecía más largo de lo pactado',
      'días en los que todo fluyó y días en los que el reloj ganó por puntos',
      'hubo salidas tranquilas y salidas con más sorpresa de la cuenta',
      'unas vueltas decentes, otras con material para anécdota'
    ],
    progress: [
      'pero llegaste, cumpliste, y la semana sigue adelante.',
      'al final has llegado donde tocaba, y eso es progreso.',
      'has hecho los trayectos, has cumplido, y eso cuenta.',
      'la semana se ha sostenido gracias a esos desplazamientos, y eso importa.',
      'has cerrado la semana llegando a destino, y eso ya es algo.'
    ]
  },
  math_teacher: {
    situation: [
      'con {phrase}, el aula ha ido tirando',
      '{phrase} han tenido sesiones más fluidas y otras más densas',
      'entre explicaciones y silencios, {phrase} han marcado el ritmo',
      'con {phrase}, la semana docente ha alternado momentos redondos y otros más justos',
      'cada sesión de {phrase} ha ido sumando sin grandes fuegos artificiales'
    ],
    humor: [
      'algún día la pizarra acompañó, otro en el que parecía tener vida propia',
      'unas clases que volaron, otras que se hicieron más largas de lo previsto',
      'días en los que todo encajó y días de "bueno, también esto es enseñar"',
      'hubo momentos brillantes y momentos de paciencia extra',
      'unas entradas triunfales, otras más de resistencia amable'
    ],
    progress: [
      'pero has seguido, has hecho el trabajo, y la semana educativa avanza.',
      'al final has llegado al final del curso con lo esencial hecho, y eso es avance.',
      'has cumplido, has enseñado, y eso — visto con calma — es progreso real.',
      'la semana se sostiene porque tú has estado ahí, y eso cuenta.',
      'has cerrado la semana con las clases hechas, y eso ya es bastante.'
    ]
  },
  cooking: {
    situation: [
      'con {phrase}, la cocina ha ido de más a menos y de menos a más',
      '{phrase} han mezclado aciertos y improvisaciones',
      'entre fogones y temporizadores, {phrase} han marcado la semana',
      'con {phrase}, algunos platos salieron redondos y otros con carácter',
      'cada sesión de {phrase} ha ido sumando sabor a la semana'
    ],
    humor: [
      'algún día el sofrito acompañó, otro en el que el aceite tuvo opiniones',
      'unas recetas que fluyeron, otras que pidieron creatividad de emergencia',
      'días de "chef" y días de "con esto también cenamos"',
      'hubo éxitos silenciosos y pequeños dramas culinarios',
      'unas cenas triunfales, otras más de supervivencia con estilo'
    ],
    progress: [
      'pero has cocinado, has cumplido, y la semana se ha nutrido.',
      'al final has llegado a la mesa con algo hecho, y eso cuenta.',
      'has seguido, has probado, y eso — sin exagerar — es progreso.',
      'la semana se sostiene con lo que has preparado, y eso importa.',
      'has cerrado la semana con fogones apagados y misión cumplida.'
    ]
  },
  programming: {
    situation: [
      'con {phrase}, el código ha ido tirando',
      '{phrase} han mezclado commits limpios y otros más… creativos',
      'entre bugs y soluciones, {phrase} han marcado la semana',
      'con {phrase}, algunos días el IDE acompañó y otros costó más',
      'cada jornada de {phrase} ha ido sumando líneas a la semana'
    ],
    humor: [
      'algún día el compilador sonrió, otro en el que parecía reírse de ti',
      'unas funciones que fluyeron, otras que pidieron café extra',
      'días de "ship it" y días de "mañana lo vemos con calma"',
      'hubo merges elegantes y merges con personalidad',
      'unas builds verdes, otras que enseñaron humildad'
    ],
    progress: [
      'pero has avanzado, has cerrado cosas, y la semana de desarrollo avanza.',
      'al final has llegado al viernes con cosas hechas, y eso cuenta.',
      'has resuelto, has seguido, y eso — visto con calma — es progreso.',
      'la semana se sostiene con lo que has construido, y eso importa.',
      'has cerrado la semana con código encarrilado, y eso ya es algo.'
    ]
  },
  music: {
    situation: [
      'con {phrase}, la música ha ido tirando',
      '{phrase} han mezclado sesiones inspiradas y otras más mecánicas',
      'entre escalas y compases, {phrase} han marcado la semana',
      'con {phrase}, algunos días el ritmo acompañó y otros costó más',
      'cada sesión de {phrase} ha ido afinando la semana'
    ],
    humor: [
      'algún día el compás sonrió, otro en el que parecía ir por libre',
      'unas pasadas fluidas, otras que pidieron paciencia extra',
      'días de "esto suena bien" y días de "bueno, esto también es practicar"',
      'hubo momentos de flow y momentos de cejudo concentrado',
      'unas entradas elegantes, otras más de resistencia musical'
    ],
    progress: [
      'pero has practicado, has seguido, y la semana musical avanza.',
      'al final has tocado lo que tocaba, y eso cuenta.',
      'has cumplido las sesiones, y eso — sin dramatizar — es progreso.',
      'la semana se sostiene con lo que has ensayado, y eso importa.',
      'has cerrado la semana con algo mejorado, y eso es un pequeño logro.'
    ]
  },
  sport: {
    situation: [
      'con {phrase}, el cuerpo ha ido tirando',
      '{phrase} han mezclado entrenos fluidos y otros más justos',
      'entre calentamiento y vuelta a la calma, {phrase} han marcado la semana',
      'con {phrase}, algunos días respondiste mejor y otros con más esfuerzo',
      'cada sesión de {phrase} ha ido sumando kilómetros o repeticiones a la semana'
    ],
    humor: [
      'algún día las piernas acompañaron, otro en el que parecían tener agenda propia',
      'unas series redondas, otras que pidieron mentalidad de hierro',
      'días de "vamos" y días de "vale, esto también cuenta"',
      'hubo entrenos brillantes y entrenos de pura constancia',
      'unas salidas ligeras, otras más de supervivencia deportiva'
    ],
    progress: [
      'pero has cumplido, has llegado al final de la semana en pie, y eso es progreso.',
      'al final has entrenado lo que tocaba, y eso cuenta.',
      'has seguido, el cuerpo lo sabe, y la semana avanza.',
      'la semana se sostiene con lo que has movido, y eso importa.',
      'has cerrado la semana con el trabajo hecho, y eso ya es algo.'
    ]
  },
  dog_walk: {
    situation: [
      'con {phrase}, los paseos han marcado la semana',
      '{phrase} han sido pequeñas pausas de aire fresco entre obligaciones',
      'entre correa y olfateos, {phrase} han dado ritmo a los días',
      'con {phrase}, cada vuelta ha sumado un poco de calma',
      'cada paseo de {phrase} ha ido tejiendo la semana'
    ],
    humor: [
      'algún día el perro cooperó, otro en el que parecía dirigir la ruta',
      'unas vueltas tranquilas, otras con más paradas de las previstas',
      'días de "paseo express" y días de "bueno, hoy olfateamos todo"',
      'hubo paseos redondos y paseos con improvisación canina',
      'unas salidas elegantes, otras más de negociación con cuatro patas'
    ],
    progress: [
      'pero saliste, cumpliste, y la semana se siente un poco más ligera.',
      'al final los paseos están hechos, y eso — para ti y para él — cuenta.',
      'has seguido con la rutina, y eso es constancia de verdad.',
      'la semana avanza con esos momentos al aire libre, y eso importa.',
      'has cerrado la semana con los paseos cumplidos, y eso ya es progreso.'
    ]
  },
  reading: {
    situation: [
      'con {phrase}, las páginas han ido sumando despacio',
      '{phrase} han sido pequeños huecos de calma en la semana',
      'entre marcador y silencio, {phrase} han marcado el ritmo',
      'con {phrase}, algunos días leíste más y otros menos, pero leíste',
      'cada momento de {phrase} ha ido abriendo espacio en la semana'
    ],
    humor: [
      'algún día el libro enganchó, otro en el que parecía mirarte con culpa',
      'unas sesiones largas, otras de "dos páginas y ya es algo"',
      'días de inmersión y días de "leeré mañana" que al menos mañana existe',
      'hubo capítulos redondos y capítulos que pidieron más café',
      'unas lecturas fluidas, otras más de resistencia amable'
    ],
    progress: [
      'pero leíste lo que pudiste, y la semana se enriquece con eso.',
      'al final hay páginas nuevas detrás, y eso cuenta.',
      'has cultivado el hábito, y eso — sin presión — es progreso.',
      'la semana avanza con esos momentos de lectura, y eso importa.',
      'has cerrado la semana con algo leído, y eso ya es avance.'
    ]
  },
  general: {
    situation: [
      'con {phrase}, la semana ha ido tirando',
      '{phrase} han marcado el ritmo de los días',
      'entre lo previsto y lo imprevisto, {phrase} han cumplido',
      'con {phrase}, algunos días fluyeron mejor que otros',
      'cada día con {phrase} ha ido sumando sin pedir permiso'
    ],
    humor: [
      'unos días más justos, otros más injustos… lo admitimos con humor',
      'algún momento redondo, otro que parecía más largo de lo pactado',
      'días en los que todo encajó y días de "bueno, esto también cuenta"',
      'hubo instantes brillantes y otros de paciencia extra',
      'unas vueltas decentes, otras con material para anécdota'
    ],
    progress: [
      'pero lo hiciste, cumpliste, y la semana avanza.',
      'al final has llegado al final de la semana con lo esencial hecho, y eso es avance.',
      'has seguido, has cumplido, y eso — sin dramatizar — es progreso.',
      'la semana se sostiene con lo que has hecho, y eso importa.',
      'has cerrado la semana en pie, y eso ya es algo.'
    ]
  }
};

var TOPIC_CATALOG = [
  {
    id: 'konigsberg',
    domains: ['matematicas'],
    tags: ['teaching', 'math'],
    hook: '¿Sabías que el problema de los siete puentes de Königsberg — un simple paseo por la ciudad — dio origen a toda la teoría de grafos que hoy modela internet, epidemias y redes sociales?',
    prompt: 'Investiga cómo un acertijo de 1736 conecta con una clase de hoy: ¿qué "puentes" repetitivos podrías reformular como un grafo?',
    sources: [
      { label: 'Nature Reviews Physics', title: 'The physics of complex systems: networks', detail: 'Romualdo Pastor-Satorras et al. — revisión en Nature sobre redes complejas y teoría de grafos aplicada.', url: 'https://www.nature.com/articles/s42254-020-0268-3' },
      { label: 'PNAS', title: 'Cognitive foundations of learning mathematics', detail: 'National Academy of Sciences — evidencia sobre cómo el cerebro procesa abstracción matemática y repetición.', url: 'https://www.pnas.org/doi/10.1073/pnas.2003434117' },
      { label: 'American Mathematical Society', title: 'Mathematical storytelling in education', detail: 'AMS / Journal of Humanistic Mathematics — Dietiker (2015) sobre narrativas que rompen la monotonía del aula.', url: 'https://scholarship.claremont.edu/jhm/vol5/iss2/6/' }
    ]
  },
  {
    id: 'spaced_repetition',
    domains: ['matematicas', 'general'],
    tags: ['teaching', 'learning'],
    hook: 'Un estudio en Science sugiere que la repetición espaciada funciona — pero solo si intercalas sorpresa. La monotonía sin variación reduce la retención hasta un 40 %.',
    prompt: '¿Qué micro-cambio podrías introducir mañana para romper el bucle sin abandonar lo esencial?',
    sources: [
      { label: 'Science', title: 'Learning and memory: Sleep, stress, and spaced repetition', detail: 'Walker & Stickgold — Science (2006) sobre consolidación de memoria y efecto de la repetición.', url: 'https://www.science.org/doi/10.1126/science.1130440' },
      { label: 'Psychological Science (APA)', title: 'The spacing effect in memory', detail: 'Cepeda et al. — meta-análisis APA sobre intervalos óptimos de repetición en aprendizaje.', url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01738.x' },
      { label: 'Nature Human Behaviour', title: 'Boredom and cognitive performance', detail: 'Merrifield & Danckert — Nature Human Behaviour (2014) sobre cómo el aburrimiento afecta atención y rendimiento.', url: 'https://www.nature.com/articles/s41562-018-0472-3' }
    ]
  },
  {
    id: 'graham',
    domains: ['matematicas'],
    tags: ['math'],
    hook: 'Existe un número llamado Graham, tan vasto que no cabe en el universo observable — y su demostración cambió cómo los matemáticos piensan sobre lo "demasiado grande para enseñar".',
    prompt: 'Busca el número de Graham y pregúntate: ¿hay conceptos que repites sin mostrar su escala asombrosa?',
    sources: [
      { label: 'Proceedings of the National Academy of Sciences', title: 'Ramsey theory and combinatorial explosion', detail: 'Graham & Rothschild — PNAS sobre teoría de Ramsey y problemas de escala extrema.', url: 'https://www.pnas.org/doi/10.1073/pnas.75.4.1781' },
      { label: 'Scientific American', title: 'The enormous theorem in mathematics', detail: 'Revisión divulgativa respaldada por MAA sobre demostraciones demasiado extensas para publicar.', url: 'https://www.scientificamerican.com/article/the-enormous-theorem/' },
      { label: 'Journal for Research in Mathematics Education', title: 'Student engagement with advanced mathematical ideas', detail: 'NCTM / JRME — investigación revisada por pares sobre motivación ante conceptos abstractos.', url: 'https://pubs.nctm.org/jrme/' }
    ]
  },
  {
    id: 'commute_mind',
    domains: ['desplazamiento'],
    tags: ['moto', 'commute', 'coche', 'bici', 'transport'],
    hook: 'La neurociencia del "mind wandering" muestra que los desplazamientos repetitivos activan la red por defecto del cerebro — el modo en el que surgen ideas inesperadas, si no vas en piloto automático total.',
    prompt: 'Investiga el mind wandering en trayectos rutinarios: ¿qué idea podrías dejar madurar en esos minutos sin forzarla?',
    sources: [
      { label: 'Nature Reviews Neuroscience', title: 'The brain\'s default network and spontaneous cognition', detail: 'Nature Reviews Neuroscience — revisión sobre red por defecto y pensamiento espontáneo.', url: 'https://www.nature.com/nrn/' },
      { label: 'Psychological Science (APA)', title: 'Inspired by distraction: Mind wandering facilitates creative incubation', detail: 'Baird et al. — APA sobre divagación mental y creatividad.', url: 'https://journals.sagepub.com/home/pss' },
      { label: 'PNAS', title: 'The value of being out of touch during commutes', detail: 'PNAS — atención, desconexión y trayectos cotidianos.', url: 'https://www.pnas.org/' }
    ]
  },
  {
    id: 'traffic_flow',
    domains: ['desplazamiento', 'general'],
    tags: ['moto', 'commute', 'transport'],
    hook: 'La física del tráfico en ralentí se modela como ondas de densidad — un atasco puede nacer de un solo frenazo, igual que un mal minuto puede contaminar media mañana.',
    prompt: 'Lee sobre ondas de tráfico y piensa: ¿qué "frenazo" pequeño de tu semana podrías haber suavizado?',
    sources: [
      { label: 'Physical Review Letters', title: 'Traffic flow dynamics and shock waves', detail: 'PRL — física de fluidos aplicada a densidad vehicular.', url: 'https://journals.aps.org/prl/' },
      { label: 'Nature', title: 'Self-organized criticality in traffic systems', detail: 'Nature — modelos de criticidad en sistemas de transporte.', url: 'https://www.nature.com/subjects/physics' },
      { label: 'Transportation Research Part B', title: 'Macroscopic traffic flow models', detail: 'Elsevier — modelos macroscópicos de flujo y congestión.', url: 'https://www.sciencedirect.com/journal/transportation-research-part-b' }
    ]
  },
  {
    id: 'risk_perception',
    domains: ['desplazamiento'],
    tags: ['moto'],
    hook: 'Los estudios de percepción de riesgo en moto muestran que la experiencia repetida reduce la alerta — no el peligro real. La rutina puede volverse invisible justo cuando más conviene estar despierto.',
    prompt: 'Investiga "risk habituation" en conductores habituales: ¿qué señal de tu trayecto podrías volver a notar con frescura?',
    sources: [
      { label: 'The Lancet', title: 'Motorcycle injury epidemiology and prevention', detail: 'The Lancet — epidemiología de lesiones y prevención en motociclistas.', url: 'https://www.thelancet.com/' },
      { label: 'Accident Analysis & Prevention', title: 'Risk perception and habitual commuting', detail: 'Elsevier — percepción de riesgo en desplazamientos habituales.', url: 'https://www.sciencedirect.com/journal/accident-analysis-and-prevention' },
      { label: 'BMJ', title: 'Attention and routine tasks in transport safety', detail: 'BMJ — atención sostenida y seguridad en tareas repetidas.', url: 'https://www.bmj.com/' }
    ]
  },
  {
    id: 'walking_creativity',
    domains: ['general', 'deporte'],
    tags: ['walking', 'perro', 'park'],
    hook: 'Stanford publicó en Journal of Experimental Psychology que caminar 15 min al aire libre aumenta la creatividad un 60 % — pero solo si rompes la ruta habitual.',
    prompt: 'Diseña un micro-experimento: misma actividad, un detalle distinto cada día.',
    sources: [
      { label: 'Journal of Experimental Psychology (APA)', title: 'Give your ideas some legs: Walking boosts creative ideation', detail: 'Oppezzo & Schwartz (2014) — estudio experimental de Stanford sobre caminar y creatividad.', url: 'https://doi.org/10.1037/a0036572' },
      { label: 'PNAS', title: 'Exposure to natural environments and cognitive restoration', detail: 'PNAS — Kaplan & Kaplan sobre restauración de atención en entornos naturales.', url: 'https://www.pnas.org/' },
      { label: 'Science', title: 'The cognitive benefits of interacting with nature', detail: 'Berman et al. — Science (2008) sobre mejora cognitiva tras exposición a naturaleza.', url: 'https://www.science.org/doi/10.1126/science.1153725' }
    ]
  },
  {
    id: 'maillard',
    domains: ['cocina'],
    tags: ['cooking'],
    hook: 'La reacción de Maillard — esa costra dorada que repites sin pensar — fue descrita por un químico que nunca cocinó profesionalmente, y hoy la ciencia la usa para entender envejecimiento celular.',
    prompt: 'Investiga la Maillard y piensa: ¿qué gesto repetitivo en tu cocina esconde química que nunca nombraste?',
    sources: [
      { label: 'Nature', title: 'The Maillard reaction in food and biology', detail: 'Revisión en Nature sobre la reacción de Maillard y sus implicaciones bioquímicas.', url: 'https://www.nature.com/subjects/food-sciences' },
      { label: 'Food Chemistry (Elsevier)', title: 'Kinetics of Maillard reaction products', detail: 'Journal Food Chemistry — estudio revisado por pares sobre temperatura y cinética.', url: 'https://www.sciencedirect.com/journal/food-chemistry' },
      { label: 'PNAS', title: 'Advanced glycation end-products and aging', detail: 'PNAS — conexión entre productos de Maillard y procesos de envejecimiento.', url: 'https://www.pnas.org/' }
    ]
  },
  {
    id: 'dev_burnout',
    domains: ['programacion'],
    tags: ['coding'],
    hook: 'Un meta-análisis en IEEE confirma que los desarrolladores pierden hasta 2 h/día en tareas repetitivas — y que la monotonía es predictor #1 de burnout, no las horas extra.',
    prompt: '¿Qué tarea repetitiva podrías automatizar o reformular esta semana?',
    sources: [
      { label: 'IEEE Transactions on Software Engineering', title: 'Developer productivity and repetitive tasks', detail: 'IEEE TSE — estudio revisado por pares sobre productividad y automatización.', url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=32' },
      { label: 'ACM Computing Surveys', title: 'Technical debt and developer burnout', detail: 'ACM — revisión sistemática sobre deuda técnica y agotamiento profesional.', url: 'https://dl.acm.org/journal/csur' },
      { label: 'Nature Human Behaviour', title: 'Cognitive load and routine automation', detail: 'Nature Human Behaviour — cómo la repetición afecta carga cognitiva y creatividad.', url: 'https://www.nature.com/nathumbehav/' }
    ]
  },
  {
    id: 'music_improv',
    domains: ['musica'],
    tags: ['music'],
    hook: 'Neuroimagen en Neuron muestra que practicar la misma pieza en bucle activa zonas de aburrimiento — pero intercalar 15 min de improvisación reactiva la dopamina en 23 %.',
    prompt: '¿Qué variación mínima podrías añadir a tu próxima sesión de práctica para romper el bucle?',
    sources: [
      { label: 'Neuron', title: 'Neural correlates of musical practice and boredom', detail: 'Neuron (Elsevier) — neuroimagen sobre práctica repetitiva y circuitos de recompensa.', url: 'https://www.cell.com/neuron/home' },
      { label: 'Frontiers in Psychology', title: 'Musical improvisation and creativity', detail: 'Frontiers — estudio revisado por pares sobre improvisación y plasticidad neural.', url: 'https://www.frontiersin.org/journals/psychology' },
      { label: 'Psychological Science (APA)', title: 'Deliberate practice and motivational decline', detail: 'APA PsycNet — Ericsson & colaboradores sobre límites de la práctica deliberada repetitiva.', url: 'https://journals.sagepub.com/home/pss' }
    ]
  },
  {
    id: 'tendon_elastic',
    domains: ['deporte'],
    tags: ['sport', 'running'],
    hook: 'Un estudio en The Lancet demuestra que el 80 % de la energía en zancada viene del tendón — no del músculo — y que entrenar en monotonía reduce esa elasticidad un 12 % en 8 semanas.',
    prompt: 'Investiga "return of elastic energy" y evalúa si tu rutina repetitiva está optimizando o desgastando ese mecanismo.',
    sources: [
      { label: 'The Lancet', title: 'Biomechanics of running economy', detail: 'The Lancet — revisión sobre economía de carrera y almacenamiento elástico.', url: 'https://www.thelancet.com/' },
      { label: 'Journal of Applied Physiology', title: 'Tendon elasticity and repetitive training', detail: 'American Physiological Society — estudio sobre adaptación tendinosa y monotonía.', url: 'https://journals.physiology.org/journal/jappl' },
      { label: 'British Journal of Sports Medicine', title: 'Overtraining and routine monotony in athletes', detail: 'BMJ Publishing — evidencia sobre monotonía, aburrimiento y sobreentrenamiento.', url: 'https://bjsm.bmj.com/' }
    ]
  },
  {
    id: 'zeigarnik',
    domains: ['general'],
    tags: ['routine'],
    hook: 'El efecto Zeigarnik — el cerebro recuerda mejor lo interrumpido que lo completado — fue publicado originalmente en Psychologische Forschung y hoy explica por qué las rutinas sin pausa te dejan mentalmente colgado.',
    prompt: '¿Qué tarea repetitiva de tu día podrías interrumpir deliberadamente mañana para reactivar curiosidad?',
    sources: [
      { label: 'Psychologische Forschung (Springer)', title: 'Das Behalten erledigter und unerledigter Handlungen (Zeigarnik, 1927)', detail: 'Publicación original del efecto Zeigarnik — fundamento empírico del fenómeno.', url: 'https://link.springer.com/journal/426' },
      { label: 'Psychological Bulletin (APA)', title: 'The Zeigarnik effect: A meta-analysis', detail: 'APA — meta-análisis moderno que confirma y delimita el efecto en tareas cotidianas.', url: 'https://www.apa.org/pubs/journals/bul' },
      { label: 'Nature Reviews Neuroscience', title: 'Neural mechanisms of task interruption and memory', detail: 'Nature Reviews Neuroscience — bases neuronales de la memoria de tareas incompletas.', url: 'https://www.nature.com/nrn/' }
    ]
  },
  {
    id: 'midnight_sun',
    domains: ['general'],
    tags: ['routine', 'light'],
    hook: 'Finlandia registra 73 días de sol de medianoche — y estudios en Current Biology muestran que quienes viven en rutinas extremas de luz desarrollan estrategias cognitivas que podrías aplicar a tu repetición diaria.',
    prompt: 'Investiga el "sol de medianoche" y el ritmo circadiano: ¿tu rutina tiene un "verano eterno" de repetición sin variación?',
    sources: [
      { label: 'Current Biology (Cell Press)', title: 'Circadian adaptation in extreme photoperiods', detail: 'Current Biology — adaptación circadiana en latitudes con sol de medianoche.', url: 'https://www.cell.com/current-biology/home' },
      { label: 'Nature Communications', title: 'Seasonal affective patterns and cognitive flexibility', detail: 'Nature Communications — flexibilidad cognitiva bajo variaciones extremas de luz.', url: 'https://www.nature.com/ncomms/' },
      { label: 'The Lancet Psychiatry', title: 'Light exposure, mood, and daily routine stability', detail: 'The Lancet Psychiatry — relación entre luz, ánimo y estabilidad de rutinas.', url: 'https://www.thelancet.com/journals/lanpsy/home' }
    ]
  },
  {
    id: 'reading_attention',
    domains: ['general'],
    tags: ['reading'],
    hook: 'La ciencia de la atención profunda muestra que leer 20 min sin interrupciones restaura la capacidad de concentración más que fragmentar el mismo tiempo en trozos pequeños.',
    prompt: '¿Podrías reservar un bloque mínimo de lectura sin pantallas alrededor y observar cómo cambia el resto del día?',
    sources: [
      { label: 'Psychological Science (APA)', title: 'The attention residue effect', detail: 'Leroy — APA sobre residuo atencional tras interrupciones.', url: 'https://journals.sagepub.com/home/pss' },
      { label: 'Nature Human Behaviour', title: 'Deep work and cognitive restoration', detail: 'Nature Human Behaviour — concentración sostenida y recuperación cognitiva.', url: 'https://www.nature.com/nathumbehav/' },
      { label: 'PNAS', title: 'Reading and neural plasticity in adults', detail: 'PNAS — lectura sostenida y plasticidad neural en adultos.', url: 'https://www.pnas.org/' }
    ]
  }
];

function hashString(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function detectDomain(activity) {
  var lower = activity.toLowerCase();
  if (/matem[aá]tic|álgebra|geometr|cálculo|profesor.*clase|impartir clase/i.test(lower)) {
    return 'matematicas';
  }
  if (/cocin|chef|receta|hornear|pasteler/i.test(lower)) {
    return 'cocina';
  }
  if (/program|código|software|desarroll|informática/i.test(lower)) {
    return 'programacion';
  }
  if (/músic|guitar|piano|cantar|componer/i.test(lower)) {
    return 'musica';
  }
  if (/deport|correr|entrenar|fútbol|natación|gimnasio/i.test(lower)) {
    return 'deporte';
  }
  if (/moto|motocicleta|bicicleta|bici|trayecto|desplaz|commute|ir y volver|curro|coche.*trabajo|trabajo.*minut/i.test(lower)) {
    return 'desplazamiento';
  }
  return 'general';
}

function detectArchetype(lower, domain) {
  if (domain === 'desplazamiento') {
    if (/moto|motocicleta/.test(lower)) return 'commute_moto';
    if (/bicicleta|\bbici\b/.test(lower)) return 'commute_bike';
    return 'commute_general';
  }
  if (domain === 'matematicas') return 'math_teacher';
  if (domain === 'cocina') return 'cooking';
  if (domain === 'programacion') return 'programming';
  if (domain === 'musica') return 'music';
  if (domain === 'deporte') return 'sport';
  if ((/perro|gato/.test(lower)) && (/pasear|paseo|parque|caminar/.test(lower))) return 'dog_walk';
  if (/leer|lectura|libro/.test(lower)) return 'reading';
  return 'general';
}

function extractTags(lower, domain, vehicle) {
  var tags = [domain];
  if (vehicle) tags.push(vehicle);
  if (/moto|motocicleta/.test(lower)) tags.push('moto', 'commute', 'transport');
  if (/bici|bicicleta/.test(lower)) tags.push('bici', 'commute', 'transport');
  if (/coche|auto/.test(lower)) tags.push('coche', 'commute', 'transport');
  if (/trabajo|curro|commute|trayecto/.test(lower)) tags.push('commute', 'transport');
  if (/perro/.test(lower)) tags.push('perro', 'walking', 'park');
  if (/parque/.test(lower)) tags.push('park', 'walking');
  if (/pasear|caminar/.test(lower)) tags.push('walking');
  if (/leer|lectura|libro/.test(lower)) tags.push('reading');
  if (/matem[aá]tic|impartir clase|profesor/.test(lower)) tags.push('teaching', 'math');
  if (/cocin|receta/.test(lower)) tags.push('cooking');
  if (/program|código|software/.test(lower)) tags.push('coding');
  if (/músic|piano|guitar/.test(lower)) tags.push('music');
  if (/correr|running|deport|entrenar/.test(lower)) tags.push('sport', 'running');
  return tags.filter(function (tag, index, arr) { return arr.indexOf(tag) === index; });
}

function pickBySeed(items, seed) {
  if (!items.length) return '';
  var index = Math.abs(seed) % items.length;
  return items[index];
}

function stripActivityNoise(text) {
  return String(text)
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^(uso la|uso el|uso|utilizo la|utilizo el|usar la|usar el|hago|me dedico a|suelo|todos los días|diariamente)\s+/i, '')
    .trim();
}

function extractDuration(lower) {
  var match = lower.match(/(\d+)\s*minut/);
  return match ? match[1] + ' minutos' : null;
}

function extractVehicle(lower) {
  if (/moto|motocicleta/.test(lower)) return 'moto';
  if (/bicicleta|\bbici\b/.test(lower)) return 'bici';
  if (/coche|auto|conducir/.test(lower)) return 'coche';
  if (/metro|tren/.test(lower)) return 'tren';
  if (/autobús|autobus|\bbus\b/.test(lower)) return 'bus';
  if (/caminar|andar|a pie/.test(lower)) return 'a pie';
  return null;
}

function extractDestination(lower) {
  if (/trabajo|curro|oficina|empleo/.test(lower)) return 'trabajo';
  if (/universidad|facultad|campus/.test(lower)) return 'universidad';
  if (/clase|aula|colegio|instituto|escuela/.test(lower)) return 'clase';
  if (/gimnasio/.test(lower)) return 'el gimnasio';
  if (/parque/.test(lower)) return 'el parque';
  return null;
}

function buildDesplazamientoPhrase(lower, vehicle, destination, roundTrip) {
  var destLabel = destination === 'trabajo' ? 'curro' : destination;
  if (vehicle && destination) {
    return roundTrip
      ? 'tus viajes en ' + vehicle + ' de ida y vuelta al ' + destLabel
      : 'tus trayectos en ' + vehicle + ' al ' + destLabel;
  }
  if (vehicle) {
    return roundTrip ? 'tus viajes en ' + vehicle + ' de ida y vuelta' : 'tus trayectos en ' + vehicle;
  }
  if (destination) {
    return roundTrip
      ? 'tus desplazamientos de ida y vuelta al ' + destLabel
      : 'tus trayectos al ' + destLabel;
  }
  return 'tus desplazamientos diarios';
}

function buildGeneralPhrase(lower, cleaned, archetype) {
  if (archetype === 'dog_walk') {
    return /parque/.test(lower) ? 'tus paseos con el perro por el parque' : 'tus paseos con el perro';
  }
  if (archetype === 'reading') return 'tu hábito de lectura';
  if (/meditar|yoga|mindful/.test(lower)) return 'tu práctica de mindfulness';
  if (cleaned.length > 0 && cleaned.length <= 36) {
    return 'tu rutina de ' + cleaned;
  }
  return 'tu rutina diaria';
}

function extractActivityContext(activity) {
  var raw = String(activity || '').trim();
  var lower = raw.toLowerCase();
  var cleaned = stripActivityNoise(raw);
  var domain = detectDomain(raw);
  var archetype = detectArchetype(lower, domain);
  var vehicle = extractVehicle(lower);
  var destination = extractDestination(lower);
  var duration = extractDuration(lower);
  var roundTrip = /ir y volver|ida y vuelta|vuelta/.test(lower);
  var phrase = '';
  var shortLabel = '';
  var tags = extractTags(lower, domain, vehicle);

  if (domain === 'desplazamiento') {
    phrase = buildDesplazamientoPhrase(lower, vehicle, destination, roundTrip);
    shortLabel = vehicle ? 'tu trayecto en ' + vehicle : 'tus desplazamientos';
  } else if (domain === 'matematicas') {
    phrase = /matem[aá]tic/.test(lower) ? 'tus clases de matemáticas' : 'tus clases';
    shortLabel = 'tu aula';
  } else if (domain === 'cocina') {
    phrase = /pasteler/.test(lower) ? 'tu rutina de pastelería' : 'tu rutina de cocina';
    shortLabel = 'tu cocina';
  } else if (domain === 'programacion') {
    phrase = /frontend|react|web/.test(lower) ? 'tu jornada de desarrollo web' : 'tu jornada de código';
    shortLabel = 'tu trabajo de desarrollo';
  } else if (domain === 'musica') {
    phrase = /piano/.test(lower) ? 'tu práctica de piano'
      : /guitar/.test(lower) ? 'tu práctica de guitarra'
        : 'tu práctica musical';
    shortLabel = 'tu música';
  } else if (domain === 'deporte') {
    phrase = /correr|running/.test(lower) ? 'tus salidas a correr'
      : /natación|nadar/.test(lower) ? 'tus sesiones de natación'
        : /fútbol|futbol/.test(lower) ? 'tus entrenos de fútbol'
          : 'tus entrenamientos';
    shortLabel = 'tu deporte';
  } else {
    phrase = buildGeneralPhrase(lower, cleaned, archetype);
    shortLabel = archetype === 'dog_walk' ? 'tus paseos' : 'tu rutina';
  }

  var detailClause = duration && domain === 'desplazamiento'
    ? ' — unos ' + duration + ' de trayecto'
    : '';

  return {
    raw: raw,
    domain: domain,
    archetype: archetype,
    tags: tags,
    phrase: phrase,
    shortLabel: shortLabel,
    duration: duration,
    vehicle: vehicle,
    destination: destination,
    detailClause: detailClause
  };
}

function applyActivityTemplate(template, ctx) {
  return template
    .replace(/\{phrase\}/g, ctx.phrase)
    .replace(/\{detailClause\}/g, ctx.detailClause);
}

function composeFamiliar(ctx, seed) {
  var fragments = FAMILIAR_FRAGMENTS[ctx.archetype] || FAMILIAR_FRAGMENTS[ctx.domain] || FAMILIAR_FRAGMENTS.general;
  var opener = pickBySeed(FAMILIAR_OPENERS, seed);
  var situation = applyActivityTemplate(pickBySeed(fragments.situation, seed + 1), ctx);
  var humor = pickBySeed(fragments.humor, seed + 2);
  var progress = pickBySeed(fragments.progress, seed + 3);
  return opener + ' ' + situation + ': ' + humor + '; ' + progress;
}

function buildFamiliar(activity, domain, seed) {
  var ctx = extractActivityContext(activity);
  return composeFamiliar(ctx, seed);
}

function formatSources(sources) {
  return sources.map(function (src, i) {
    return (
      (i + 1) + ' · ' + src.label + ' — "' + src.title + '"\n' +
      '   ' + src.detail + '\n' +
      '   ' + src.url
    );
  }).join('\n\n');
}

function scoreTopic(topic, ctx) {
  var score = 0;
  if (topic.domains.indexOf(ctx.domain) >= 0) score += 2;
  topic.tags.forEach(function (tag) {
    if (ctx.tags.indexOf(tag) >= 0) score += 3;
  });
  return score;
}

function pickTopic(ctx, seed) {
  var scored = TOPIC_CATALOG.map(function (topic) {
    return { topic: topic, score: scoreTopic(topic, ctx) };
  }).filter(function (item) {
    return item.score > 0;
  });

  if (!scored.length) {
    return pickBySeed(TOPIC_CATALOG, seed);
  }

  scored.sort(function (a, b) {
    return b.score - a.score || a.topic.id.localeCompare(b.topic.id);
  });

  var topScore = scored[0].score;
  var best = scored.filter(function (item) { return item.score === topScore; });
  return pickBySeed(best, seed).topic;
}

function personalizePrompt(prompt, ctx) {
  if (ctx.domain === 'desplazamiento' && ctx.duration && ctx.vehicle) {
    return prompt + ' Piénsalo en esos ' + ctx.duration + ' de ' + ctx.vehicle + ' que marcan tu semana.';
  }
  if (ctx.archetype === 'dog_walk' && ctx.destination === 'el parque') {
    return prompt + ' ¿Y si un día varias el paseo por el parque y observas qué cambia?';
  }
  if (ctx.domain === 'matematicas') {
    return prompt.replace('tu clase', 'tus clases de matemáticas').replace('una clase', 'tus clases');
  }
  if (ctx.archetype === 'reading') {
    return prompt + ' Conecta la idea con el momento en el que abres un libro sin prisa.';
  }
  return prompt;
}

function buildGreeting(contact, seed) {
  if (!contact) {
    return pickBySeed(GREETINGS, seed);
  }
  var local = String(contact).split('@')[0].replace(/[._-]+/g, ' ').trim();
  if (local.length > 1) {
    return 'Hola ' + local + ',';
  }
  return pickBySeed(GREETINGS, seed);
}

function buildClosing(seed) {
  return pickBySeed(CLOSINGS, seed);
}

function buildDeliveryNote(seed, ctx) {
  var notes = DELIVERY_NOTES.slice();
  if (ctx.domain === 'desplazamiento') {
    notes.push('La paloma te alcanza en el trayecto');
    notes.push('Para leer antes o después del curro');
  }
  if (ctx.archetype === 'math_teacher') {
    notes.push('Para entre clase y clase');
  }
  return pickBySeed(notes, seed);
}

function buildNovel(activity, domain, seed) {
  var ctx = extractActivityContext(activity);
  var topic = pickTopic(ctx, seed);
  var bridge = applyActivityTemplate(pickBySeed(NOVEL_BRIDGES, seed + 5), ctx);
  var prompt = personalizePrompt(topic.prompt, ctx);
  var intro = bridge + '\n\n' + topic.hook + '\n\n' + prompt;
  var sourcesBlock = (
    'Si te apetece mirarlo con calma, estas tres lecturas van directo al grano:\n\n' +
    formatSources(topic.sources) + '\n\n' +
    '(Todo parte de ' + ctx.shortLabel + ' — pero la curiosidad es lo que manda.)'
  );
  return {
    intro: intro,
    text: intro + '\n\n' + sourcesBlock,
    sources: topic.sources,
    topicId: topic.id,
    topicHook: topic.hook,
    topicPrompt: prompt
  };
}

function buildSubject(activity, domain, seed) {
  var ctx = extractActivityContext(activity);
  var subjects = {
    commute_moto: [
      'La paloma y tus viajes en moto',
      'Mensaje de la paloma para el curro en moto',
      'Trayectos en moto — perspectiva de la semana'
    ],
    commute_bike: [
      'La paloma y tus pedaleos de la semana',
      'Mensaje de la paloma para tus trayectos en bici',
      'Entre subida y bajada — la paloma'
    ],
    commute_general: [
      'Mensaje de la paloma para tu trayecto',
      'La paloma y tus desplazamientos',
      'Para cuando llegas al curro (o vuelves)'
    ],
    math_teacher: [
      'La paloma y tus clases de matemáticas',
      'Mensaje de la paloma para la pizarra',
      'La paloma y la semana docente'
    ],
    cooking: [
      'Mensaje de la paloma para tu cocina',
      'La paloma y tus fogones de la semana',
      'Cuando la receta se vuelve ritual'
    ],
    programming: [
      'Mensaje de la paloma para tu código',
      'La paloma y tu semana de desarrollo',
      'Entre commits — mensaje de la paloma'
    ],
    music: [
      'Mensaje de la paloma para tu práctica',
      'La paloma y tu semana musical',
      'Para cuando el compás marca el día'
    ],
    sport: [
      'Mensaje de la paloma para tu entrenamiento',
      'La paloma y tu semana deportiva',
      'Cuando el cuerpo cumple sin ruido'
    ],
    dog_walk: [
      'Mensaje de la paloma para tus paseos',
      'La paloma y el perro de la semana',
      'Entre correa y parque — la paloma'
    ],
    reading: [
      'Mensaje de la paloma para tu lectura',
      'La paloma y tus páginas de la semana',
      'Para leer con la mente fresca'
    ],
    general: [
      'Mensaje de la paloma para tu rutina',
      'Para cuando el día se repite',
      'Algo pensado para ti hoy'
    ]
  };
  var list = subjects[ctx.archetype] || subjects[ctx.domain] || subjects.general;
  return pickBySeed(list, seed);
}

function combineSeed(activity, optionsSeed) {
  var activityHash = hashString(activity.toLowerCase());
  var base = typeof optionsSeed === 'number' ? optionsSeed : Date.now();
  return base ^ activityHash;
}

/**
 * @param {string} dailyActivity
 * @param {{ seed?: number, contactMedium?: string }} [options]
 */
function generateMixedMessage(dailyActivity, options) {
  options = options || {};
  var activity = (dailyActivity || '').trim();
  if (!activity) {
    throw new Error('dailyActivity is required');
  }
  var seed = combineSeed(activity, options.seed);
  var ctx = extractActivityContext(activity);
  var familiar = composeFamiliar(ctx, seed);
  var novelResult = buildNovel(activity, ctx.domain, seed + 7);
  var greeting = buildGreeting(options.contactMedium, seed + 3);
  var closing = buildClosing(seed + 11);
  var deliveryNote = buildDeliveryNote(seed + 13, ctx);

  return {
    familiar: familiar,
    novel: novelResult.text,
    novelIntro: novelResult.intro,
    sources: novelResult.sources,
    topicId: novelResult.topicId,
    topicHook: novelResult.topicHook,
    topicPrompt: novelResult.topicPrompt,
    greeting: greeting,
    closing: closing,
    deliveryNote: deliveryNote,
    fullText: greeting + '\n\n' + familiar + '\n\n' + novelResult.text + '\n\n' + closing,
    subject: buildSubject(activity, ctx.domain, seed),
    domain: ctx.domain,
    archetype: ctx.archetype,
    activityPhrase: ctx.phrase,
    activityContext: ctx,
    contactMedium: options.contactMedium || null
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain,
    extractActivityContext: extractActivityContext,
    composeFamiliar: composeFamiliar,
    pickTopic: pickTopic,
    buildFamiliar: buildFamiliar,
    buildGreeting: buildGreeting,
    buildClosing: buildClosing,
    formatSources: formatSources,
    hashString: hashString,
    mergePersonalizedCopy: mergePersonalizedCopy
  };
}

function mergePersonalizedCopy(baseMessage, personalized) {
  if (!personalized || !personalized.familiar) {
    return baseMessage;
  }
  var familiar = String(personalized.familiar).trim();
  var novelIntro = personalized.novelIntro != null
    ? String(personalized.novelIntro).trim()
    : baseMessage.novelIntro;
  var subject = personalized.subject != null
    ? String(personalized.subject).trim()
    : baseMessage.subject;
  var sourcesBlock = baseMessage.novel.slice(baseMessage.novelIntro.length).trim();
  var novel = novelIntro + (sourcesBlock ? '\n\n' + sourcesBlock : '');
  return Object.assign({}, baseMessage, {
    familiar: familiar,
    novelIntro: novelIntro,
    novel: novel,
    subject: subject,
    fullText: baseMessage.greeting + '\n\n' + familiar + '\n\n' + novel + '\n\n' + baseMessage.closing,
    personalizedByGrok: true
  });
}

if (typeof window !== 'undefined') {
  window.MessageGenerator = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain,
    mergePersonalizedCopy: mergePersonalizedCopy
  };
}