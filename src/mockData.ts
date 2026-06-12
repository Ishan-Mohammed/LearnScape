import { Track } from "./types";

export const DEFAULT_TRACKS: Track[] = [
  {
    id: "software-dev",
    title: "Software Development",
    description: "Master full-stack engineering, from the basic building blocks of modern web pages to advanced React frontend architectures and scalable backends.",
    difficulty: "Intermediate",
    duration: "16 hrs",
    skillsCovered: ["HTML/CSS", "JavaScript", "React.js", "TypeScript", "Drizzle ORM", "Serverless Basics"],
    xpReward: 1800,
    modules: [
      {
        id: "sdev-m1",
        trackId: "software-dev",
        title: "HTML & CSS Fundamentals",
        description: "Establish solid ground with semantic HTML layouts, CSS styling systems, flexbox grids, and responsive design guidelines.",
        order: 1,
        xpReward: 300,
        lessons: [
          {
            id: "sdev-m1-l1",
            moduleId: "sdev-m1",
            title: "Introduction to Semantic HTML5",
            content: "Learn how pages are structured semantically. Elements like <header>, <main>, <section>, <article>, and <footer> help search engines and screen readers parse your document hierarchy for improved accessibility and search indexing.",
            durationMin: 3,
            xpReward: 25
          },
          {
            id: "sdev-m1-l2",
            moduleId: "sdev-m1",
            title: "The CSS Box Model",
            content: "Master margins, borders, padding, and content size. Discover how widths and heights behave when borders and padding are factored in, and how box-sizing: border-box simplifies modern responsive calculations.",
            durationMin: 4,
            xpReward: 25
          },
          {
            id: "sdev-m1-l3",
            moduleId: "sdev-m1",
            title: "Flexbox & CSS Grid Layouts",
            content: "Bid farewell to legacy floats. Flexbox handles 1-dimensional layouts cleanly, distributing spacing along main and cross axes, while CSS Grid empowers complex multi-row and multi-column responsive designs.",
            durationMin: 4,
            xpReward: 25
          },
          {
            id: "sdev-m1-l4",
            moduleId: "sdev-m1",
            title: "Responsive Media Queries & Fluid Grid Systems",
            content: "Write code that adapts. Build fluid grid systems and target breakpoints using CSS media queries or robust modern utility framework conventions to support mobile phones, tablets, and wide screens flawlessly.",
            durationMin: 3,
            xpReward: 25
          },
          {
            id: "sdev-m1-l5",
            moduleId: "sdev-m1",
            title: "Modern CSS Custom Properties",
            content: "Leverage variables in CSS. Declare values globally inside root nodes for easy branding, color themes, dark-mode variations, and consistent design frameworks without code duplication.",
            durationMin: 5,
            xpReward: 25
          }
        ],
        quiz: {
          moduleId: "sdev-m1",
          xpBonus: 100,
          questions: [
            {
              id: "sdev-q1",
              question: "Which HTML5 element represents the primary content area of a document?",
              options: [
                "<main>",
                "<section>",
                "<div class='main'>",
                "<header>"
              ],
              correctAnswerIndex: 0
            },
            {
              id: "sdev-q2",
              question: "In the standard box model, which property wraps directly around the padding area?",
              options: [
                "Margin",
                "Border",
                "Content size",
                "Outline"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "sdev-m2",
        trackId: "software-dev",
        title: "JavaScript Essentials",
        description: "Build dynamic client features with high-performance modern JavaScript functions, logic flows, and asynchronous promises.",
        order: 2,
        xpReward: 400,
        lessons: [
          {
            id: "sdev-m2-l1",
            moduleId: "sdev-m2",
            title: "Variable Declarations & Modern Scopes",
            content: "Analyze differences between let, const, and var. Scope determines variable accessibility. Always enforce block scope boundaries and choose const by default to prevent unintended side effects.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "sdev-m2-l2",
            moduleId: "sdev-m2",
            title: "Functions & Arrow Notation",
            content: "Explore declarative statements, expressions, and compact arrow syntax. Arrow functions do not bind their own 'this' context, which makes them perfect for lexical nesting inside modern callback handlers.",
            durationMin: 3,
            xpReward: 30
          },
          {
            id: "sdev-m2-l3",
            moduleId: "sdev-m2",
            title: "Manipulating the Browser DOM",
            content: "Use vanilla JavaScript APIs to select nodes, create child elements, modify styling rules dynamically, and attach custom browser event listeners to build highly interactive experiences.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "sdev-m2-l4",
            moduleId: "sdev-m2",
            title: "Asynchronous JavaScript & Promises",
            content: "Avoid callback nesting pitfalls. Solve complex asynchronous flows using Promises and clean async/await syntax to fetch remote APIs and handle logical errors.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "sdev-m2-l5",
            moduleId: "sdev-m2",
            title: "Data Operations and Array Methods",
            content: "Write functional, immutable chains using map, filter, reduce, and find. Avoid verbose imperative loops to ensure highly readable and verifiable state updates in your projects.",
            durationMin: 5,
            xpReward: 30
          }
        ],
        quiz: {
          moduleId: "sdev-m2",
          xpBonus: 150,
          questions: [
            {
              id: "sdev2-q1",
              question: "Which keyword introduces block-scoped variables that cannot be reassigned?",
              options: [
                "let",
                "var",
                "const",
                "static"
              ],
              correctAnswerIndex: 2
            },
            {
              id: "sdev2-q2",
              question: "What occurs when you invoke an asynchronous function resolved with the 'await' keyword?",
              options: [
                "It halts the entire browser tab execution",
                "It blocks other users from loading the site",
                "It pauses function execution until the promise settles",
                "It throws a compiler syntax error"
              ],
              correctAnswerIndex: 2
            }
          ]
        }
      },
      {
        id: "sdev-m3",
        trackId: "software-dev",
        title: "React Development",
        description: "Orchestrate responsive user experiences with declarative components, functional state managers, and custom hooks.",
        order: 3,
        xpReward: 500,
        lessons: [
          {
            id: "sdev-m3-l1",
            moduleId: "sdev-m3",
            title: "Understanding the React Virtual DOM",
            content: "React uses a lightweight in-memory representation of the UI. It batches updates, calculates precise diffs, and updates the physical DOM in unified, performant cycles.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "sdev-m3-l2",
            moduleId: "sdev-m3",
            title: "State versus Props",
            content: "Establish component scope bounds. Props pass read-only configuration arrays downward through the node tree, while React.useState stores mutable state flags local to components.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "sdev-m3-l3",
            moduleId: "sdev-m3",
            title: "The Unified useEffect Hook",
            content: "Synchronize component lifecycles with external browser layers. Always declare clean, primitive dependency lists and return unmount cleanup functions to prevent active memory leaks.",
            durationMin: 5,
            xpReward: 40
          },
          {
            id: "sdev-m3-l4",
            moduleId: "sdev-m3",
            title: "Creating Custom Reusable Hooks",
            content: "Extract and reuse stateful logic blocks. Share common data fetching routines, resize-tracker loops, or form inputs via simple custom hooks prefixed with 'use'.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "sdev-m3-l5",
            moduleId: "sdev-m3",
            title: "Optimizing Component Renders",
            content: "Manage rendering budgets. Use React.memo, useMemo, and useCallback to preserve reference points and prevent redundant render loops of static children.",
            durationMin: 4,
            xpReward: 40
          }
        ],
        quiz: {
          moduleId: "sdev-m3",
          xpBonus: 200,
          questions: [
            {
              id: "sdev3-q1",
              question: "What mechanism passes configuration data read-only down from parent to child in React?",
              options: [
                "State variables",
                "Props attributes",
                "Effects dependencies",
                "Ref pointers"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "sdev3-q2",
              question: "Which hook should you employ to memoize a heavy calculation result across renders?",
              options: [
                "useEffect",
                "useCallback",
                "useMemo",
                "useRef"
              ],
              correctAnswerIndex: 2
            }
          ]
        }
      },
      {
        id: "sdev-m4",
        trackId: "software-dev",
        title: "Backend & Full Stack Basics",
        description: "Connect server runtimes, configure reliable database systems, build custom API endpoints, and execute production builds.",
        order: 4,
        xpReward: 600,
        lessons: [
          {
            id: "sdev-m4-l1",
            moduleId: "sdev-m4",
            title: "Introduction to Node.js & Express",
            content: "Run JS outside the browser. Learn how to boot an Express server, declare server routes, parse request payloads, and handle HTTP responses in modern backend environments.",
            durationMin: 5,
            xpReward: 50
          },
          {
            id: "sdev-m4-l2",
            moduleId: "sdev-m4",
            title: "RESTful API Conventions",
            content: "Design clean routing boundaries. Map actions to standardized verbs: GET to retrieve, POST to create, PUT to replace database rows, and DELETE to remove entities safely.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "sdev-m4-l3",
            moduleId: "sdev-m4",
            title: "Relational Databases & Schema Modeling",
            content: "Store data reliably in SQL systems like PostgreSQL. Model normalized tables with primary keys, unique constraints, and foreign key linkages to preserve high data integrity.",
            durationMin: 5,
            xpReward: 50
          },
          {
            id: "sdev-m4-l4",
            moduleId: "sdev-m4",
            title: "Object Relational Mappers (ORMs)",
            content: "Eliminate string-based SQL formatting. Write type-safe TypeScript models using libraries like Drizzle or Prisma to provide absolute static checking over database schemas.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "sdev-m4-l5",
            moduleId: "sdev-m4",
            title: "Production Builds & Environment Secrets",
            content: "Prepare code for production. Compile full-stack code, manage bundles, and load sensitive production variables safely using environment configurations.",
            durationMin: 5,
            xpReward: 50
          }
        ],
        quiz: {
          moduleId: "sdev-m4",
          xpBonus: 250,
          questions: [
            {
              id: "sdev4-q1",
              question: "Which HTTP verb should be paired with an endpoint designed to create a brand new database record?",
              options: [
                "GET",
                "PUT",
                "DELETE",
                "POST"
              ],
              correctAnswerIndex: 3
            },
            {
              id: "sdev4-q2",
              question: "What is the primary role of an ORM in modern full-stack systems?",
              options: [
                "To replace the relational database engine completely",
                "To map database rows to logical structures/objects using type-safe code",
                "To convert CSS code into SQL scripts",
                "To accelerate the browser internet speeds"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Design cognitive pipelines, orchestrate multi-agent schedules, and construct automated logic flows.",
    difficulty: "Advanced",
    duration: "18 hrs",
    skillsCovered: ["Workflow Mechanics", "Webhooks & APIs", "Few-Shot Rules", "JSON Injections", "Agent Systems"],
    xpReward: 1800,
    modules: [
      {
        id: "aiauto-m1",
        trackId: "ai-automation",
        title: "Introduction to Automation",
        description: "Define automation concepts, explore basic script schedules, understand webhooks, and map operational triggers.",
        order: 1,
        xpReward: 350,
        lessons: [
          {
            id: "aiauto-m1-l1",
            moduleId: "aiauto-m1",
            title: "The Paradigm of Digital Automation",
            content: "Shift from manual tasks to background loops. Automation programs run 24/7, monitoring events and executing pre-planned chains without human intervention.",
            durationMin: 3,
            xpReward: 25
          },
          {
            id: "aiauto-m1-l2",
            moduleId: "aiauto-m1",
            title: "Understanding Event-Driven Triggers",
            content: "Events kickstart actions. Triggers can be scheduled (crontabs), webhook payloads sent from external applications, or database state updates.",
            durationMin: 4,
            xpReward: 25
          },
          {
            id: "aiauto-m1-l3",
            moduleId: "aiauto-m1",
            title: "The Role of Webhooks in Modern Apps",
            content: "Webhooks are real-time HTTP callbacks. When an action occurs on a service, it immediately delivers an HTTP POST payload to your endpoint with relevant details.",
            durationMin: 4,
            xpReward: 25
          },
          {
            id: "aiauto-m1-l4",
            moduleId: "aiauto-m1",
            title: "Data Formats: JSON and Parsing",
            content: "JSON is the language of modern automation. Master JSON objects, arrays, and standard parsers to extract critical payload keys.",
            durationMin: 5,
            xpReward: 25
          },
          {
            id: "aiauto-m1-l5",
            moduleId: "aiauto-m1",
            title: "Handling API Keys & Security Rules",
            content: "Never upload raw access tokens to public git systems. Store API tokens in environment vaults, utilizing secure headers to sign script requests.",
            durationMin: 4,
            xpReward: 25
          }
        ],
        quiz: {
          moduleId: "aiauto-m1",
          xpBonus: 100,
          questions: [
            {
              id: "aiauto-q1",
              question: "What represents a webhook in modern web systems?",
              options: [
                "An physical cable connection",
                "A real-time HTTP callback pushed from a third-party service upon some event",
                "A web browser plugin for drawing graphs",
                "A database backup drive"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aiauto-q2",
              question: "Which standard text format is most commonly used to exchange payload data in modern automation systems?",
              options: [
                "Plain text (TXT)",
                "JSON format",
                "Document format (DOCX)",
                "Binary Executable format"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aiauto-m2",
        trackId: "ai-automation",
        title: "Workflow Automation Tools",
        description: "Connect platform interfaces, configure multi-app triggers, design data filters, and map error handling flows.",
        order: 2,
        xpReward: 450,
        lessons: [
          {
            id: "aiauto-m2-l1",
            moduleId: "aiauto-m2",
            title: "Visual Automation Builders",
            content: "Explore platforms like Zapier, Make, and local node frameworks. Visually line up application steps to relay data between disparate clouds effortlessly.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aiauto-m2-l2",
            moduleId: "aiauto-m2",
            title: "Mapping Multi-App Routes",
            content: "Take data from a form, post a Slack notification, write a row in Google Sheets, and update a CRM entry sequentially in a single execution.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "aiauto-m2-l3",
            moduleId: "aiauto-m2",
            title: "Data Filtering & Complex Routing",
            content: "Define specific condition barriers. Only proceed to step 4 IF the transaction value exceeds a threshold, routing alternative events to fallback tracks.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aiauto-m2-l4",
            moduleId: "aiauto-m2",
            title: "String Cleaning and Transformation",
            content: "Raw API data can be messy. Learn how to normalize timestamps, split name values, format currencies, and strip HTML tags before saving.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "aiauto-m2-l5",
            moduleId: "aiauto-m2",
            title: "Graceful Error Handling in Pipelines",
            content: "Automation will fail. Prevent silent pipeline crashes by implementing retry variables, defining fallback webhooks, and routing alerts to developer logs.",
            durationMin: 4,
            xpReward: 30
          }
        ],
        quiz: {
          moduleId: "aiauto-m2",
          xpBonus: 150,
          questions: [
            {
              id: "aiauto2-q1",
              question: "In a multi-app workflow, what does a 'Data Filter' accomplish?",
              options: [
                "It compresses the database size",
                "It checks conditions to decide if the workflow should proceed or drop the current run",
                "It translates text into other programming languages",
                "It deletes all system records instantly"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aiauto2-q2",
              question: "What is a recommended strategy to deal with temporary network failures in automation pipelines?",
              options: [
                "To shut down the server permanently",
                "To ignore the failures completely",
                "To implement retry policies with exponential backoff and configure alert routes",
                "To rewrite your whole codebase in a different syntax"
              ],
              correctAnswerIndex: 2
            }
          ]
        }
      },
      {
        id: "aiauto-m3",
        trackId: "ai-automation",
        title: "AI-Powered Automation",
        description: "Inject strategic prompt chains, model logical decisions, structured output generation, and semantic routers.",
        order: 3,
        xpReward: 550,
        lessons: [
          {
            id: "aiauto-m3-l1",
            moduleId: "aiauto-m3",
            title: "Embedding LLMs into Standard Pipelines",
            content: "Introduce intelligence. Instead of static regex filters, pass unstructured customer emails to an LLM block to classify tone and extract complaints automatically.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aiauto-m3-l2",
            moduleId: "aiauto-m3",
            title: "Structured JSON Extraction",
            content: "Enforce consistent payload outputs. Prompt LLMs to structure results strictly against JSON schemas so subsequent automation code parses values without errors.",
            durationMin: 5,
            xpReward: 40
          },
          {
            id: "aiauto-m3-l3",
            moduleId: "aiauto-m3",
            title: "Few-Shot Pattern Anchors",
            content: "Solidify AI output reliability. Guide complex decisions by supplying a few clear pairs of messy client inputs labeled with optimal analytical outputs.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aiauto-m3-l4",
            moduleId: "aiauto-m3",
            title: "Dynamic Semantic Routing",
            content: "Route pipelines intelligently. Compare input vectors to determine if a message should go to Legal, Support, or Sales queues based on conceptual meaning.",
            durationMin: 5,
            xpReward: 40
          },
          {
            id: "aiauto-m3-l5",
            moduleId: "aiauto-m3",
            title: "Context Management & Token Budgets",
            content: "LLMs charge per token. Optimize workflow budgets by summarizing source pages and passing only relevant context lines instead of full documents.",
            durationMin: 4,
            xpReward: 40
          }
        ],
        quiz: {
          moduleId: "aiauto-m3",
          xpBonus: 200,
          questions: [
            {
              id: "aiauto3-q1",
              question: "Why is forcing an AI to output structured JSON critical for automated pipelines?",
              options: [
                "JSON makes the text look prettier",
                "It ensures downstream code can reliably parse, modify, and act on specific keys without syntax errors",
                "It bypasses standard API billing limits",
                "JSON compiles the script to native machine code"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aiauto3-q2",
              question: "What does 'Few-Shot' prompting involve when training a pipeline to make decisions?",
              options: [
                "Using very short input prompts only",
                "Providing a few concrete input-output examples in the prompt to ground behavior",
                "Running the prompt thousands of times",
                "Updating the machine's BIOS configuration"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aiauto-m4",
        trackId: "ai-automation",
        title: "Building Automation Projects",
        description: "Assemble unified real-world agent nodes, create custom integrations, verify pipelines, and run telemetry audits.",
        order: 4,
        xpReward: 650,
        lessons: [
          {
            id: "aiauto-m4-l1",
            moduleId: "aiauto-m4",
            title: "Designing a Self-Correction Run Loop",
            content: "Close the feedback loop. Create agent modules that check their own outputs against syntactic rules, refactoring and re-prompting if schema checks fail.",
            durationMin: 5,
            xpReward: 50
          },
          {
            id: "aiauto-m4-l2",
            moduleId: "aiauto-m4",
            title: "Providing Computational Tools to LLMs",
            content: "Give the model active leverage. Register server commands (e.g. search web, execute SQL, compute math) and execute them when the model requests.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "aiauto-m4-l3",
            moduleId: "aiauto-m4",
            title: "The ReAct Loop: Reasoning and Action",
            content: "Orchestrate cognitive schedules. The agent writes a Thought, executes an Action (e.g., calling a tool), observes the result, and iterates until target achieved.",
            durationMin: 5,
            xpReward: 50
          },
          {
            id: "aiauto-m4-l4",
            moduleId: "aiauto-m4",
            title: "Configuring Human-in-the-Loop Approved Steps",
            content: "Build safe automated systems. Pause running agent schedules for high-value actions (e.g., sending money, emailing clients) until manual approved.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "aiauto-m4-l5",
            moduleId: "aiauto-m4",
            title: "Pipeline Monitoring and Telemetry",
            content: "Maintain visual audits over production pipelines. Monitor latency patterns, track token usage budgets, and log run status states.",
            durationMin: 5,
            xpReward: 50
          }
        ],
        quiz: {
          moduleId: "aiauto-m4",
          xpBonus: 250,
          questions: [
            {
              id: "aiauto4-q1",
              question: "In the ReAct framework, what represents the standard cognitive execution sequence?",
              options: [
                "Thought, Action, Observation, repeat",
                "Code, Compile, Deploy",
                "Listen, Speak, Forget",
                "Input, Print, Delete"
              ],
              correctAnswerIndex: 0
            },
            {
              id: "aiauto4-q2",
              question: "What is the purpose of implementing 'Human-in-the-Loop' gates in advanced agent systems?",
              options: [
                "To completely eliminate server processors",
                "To enable real-time multiplayer gaming",
                "To review and authorize sensitive operations before the agent executes them",
                "To decrease internet network speeds"
              ],
              correctAnswerIndex: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: "ai-foundations",
    title: "AI Foundations",
    description: "Explore neural networks, vector databases, machine learning fundamentals, and cognitive theory.",
    difficulty: "Beginner",
    duration: "12 hrs",
    skillsCovered: ["Weights & Biases", "Linear Regression", "Self-Attention", "RLHF Alignment", "Training Splits"],
    xpReward: 1600,
    modules: [
      {
        id: "aifound-m1",
        trackId: "ai-foundations",
        title: "Introduction to Artificial Intelligence",
        description: "Demystify neural networks, training loops, backpropagation, and active synapses.",
        order: 1,
        xpReward: 250,
        lessons: [
          {
            id: "aifound-m1-l1",
            moduleId: "aifound-m1",
            title: "Neurons & Synapses in Silicon",
            content: "Neural networks are inspired by human brains. Silicon nodes receive inputs, multiply them by mathematical 'weights', add a baseline bias, and feed results forward.",
            durationMin: 3,
            xpReward: 20
          },
          {
            id: "aifound-m1-l2",
            moduleId: "aifound-m1",
            title: "Activation Functions & Rectified Linear Units (ReLU)",
            content: "Without nonlinearity, a neural network is just nested high-school algebra, unable to draw complex boundaries. Activation functions like ReLU or Sigmoid warp vectors.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aifound-m1-l3",
            moduleId: "aifound-m1",
            title: "What is Backpropagation?",
            content: "How does code learn? It calculates its level of error (Loss Function), and travels backwards through the synapses, tweaking every single weight using partial derivatives.",
            durationMin: 5,
            xpReward: 20
          },
          {
            id: "aifound-m1-l4",
            moduleId: "aifound-m1",
            title: "Gradient Descent Frameworks",
            content: "Think of gradient descent as walking down a foggy mountain range to reach the elevation minimum. You take small, measured steps based on local steepness.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aifound-m1-l5",
            moduleId: "aifound-m1",
            title: "The Danger of Overfitting Data",
            content: "Overfitting on training data with extreme parameter density leads to a model that can only repeat its homework. It completely fails on new real-world inputs.",
            durationMin: 4,
            xpReward: 20
          }
        ],
        quiz: {
          moduleId: "aifound-m1",
          xpBonus: 80,
          questions: [
            {
              id: "aifound-q1",
              question: "What is the core purpose of an Activation Function in neural layers?",
              options: [
                "Injected nonlinearity allows networks to solve highly complex non-linear problems",
                "It prints out diagnostic terminal statements automatically",
                "It resets the computer's CPU once maximum calculations are reached",
                "It translates English text into Chinese and Spanish dialects"
              ],
              correctAnswerIndex: 0
            },
            {
              id: "aifound-q2",
              question: "How do you characterize a model that has 'Overfitted' its training data?",
              options: [
                "It works seamlessly on all future datasets but crashes when loaded into RAM",
                "It memorized training data so precisely that it cannot generalize or output accurate results on fresh data",
                "It fits inside a hard drive easily without file limits",
                "Its weights are all zero"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aifound-m2",
        trackId: "ai-foundations",
        title: "Machine Learning Basics",
        description: "Explore supervised and unsupervised models, training structures, and evaluate dataset scores.",
        order: 2,
        xpReward: 350,
        lessons: [
          {
            id: "aifound-m2-l1",
            moduleId: "aifound-m2",
            title: "Supervised versus Unsupervised Learning",
            content: "Understand basic models. Supervised learning guides machines with labeled training pairs, while Unsupervised models discover patterns (clusters) from unlabeled raw data.",
            durationMin: 3,
            xpReward: 30
          },
          {
            id: "aifound-m2-l2",
            moduleId: "aifound-m2",
            title: "Linear & Logistic Regressions",
            content: "Master baseline tools. Linear regression maps continuous coordinates (e.g. house values), while Logistic regression estimates probability bounds for binary classifications.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aifound-m2-l3",
            moduleId: "aifound-m2",
            title: "Decision Trees and Ensemble Methods",
            content: "Trace logical trees. Understand how multiple weak trees merge into powerful Random Forests, correcting biases to improve final outcome predictions.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aifound-m2-l4",
            moduleId: "aifound-m2",
            title: "Splitting Datasets: Train vs Test",
            content: "Prevent test contamination. Always split your input datasets: use roughly 80% to train your variables and hold back 20% to independently verify models.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "aifound-m2-l5",
            moduleId: "aifound-m2",
            title: "Evaluating Model Accuracy Metrics",
            content: "Look beyond simple success scores. Understand precision, call-back ratios, F1 scoring bounds, and confusion matrix structures to measure model failures.",
            durationMin: 4,
            xpReward: 30
          }
        ],
        quiz: {
          moduleId: "aifound-m2",
          xpBonus: 120,
          questions: [
            {
              id: "aifound2-q1",
              question: "What represents the main distinction between supervised and unsupervised learning?",
              options: [
                "Supervised learning requires human coders to type commands in real-time",
                "Supervised learning relies on labeled training target records while unsupervised does not",
                "Supervised learning only runs on desktop computers",
                "There is no difference between the two methods"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aifound2-q2",
              question: "Why do we split input datasets into training and testing portions?",
              options: [
                "To reduce the physical storage occupied by the data",
                "To evaluate model performance on fresh, unseen data, preventing memorization bias",
                "To duplicate the rows for backup archives",
                "Because modern computers cannot process files in one piece"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aifound-m3",
        trackId: "ai-foundations",
        title: "Generative AI Concepts",
        description: "Learn transformer designs, explore semantic token embeddings, and study generative prompt mechanics.",
        order: 3,
        xpReward: 450,
        lessons: [
          {
            id: "aifound-m3-l1",
            moduleId: "aifound-m3",
            title: "The Rise of the Transformer",
            content: "Deconstruct the engine. The Transformer architecture relies on Self-Attention networks, calculating which words in a long sentence relate to each other.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aifound-m3-l2",
            moduleId: "aifound-m3",
            title: "Text Tokenization Operations",
            content: "Models do not read words. Tokenizers chop text strings into numerical segments (tokens) representing syllables or letters, enabling high-speed math mapping.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aifound-m3-l3",
            moduleId: "aifound-m3",
            title: "Semantic Vector Embeddings",
            content: "Map concept spaces. Embeddings represent words or blocks as coordinates in a 1,000+ dimensional map, aligning similar concepts geographically close to each other.",
            durationMin: 5,
            xpReward: 40
          },
          {
            id: "aifound-m3-l4",
            moduleId: "aifound-m3",
            title: "Attention Head Mechanisms",
            content: "Calculate relevance. Attention heads assign weights to context words, focusing on critical elements when synthesizing output responses.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aifound-m3-l5",
            moduleId: "aifound-m3",
            title: "Autoregressive Content Synthesis",
            content: "Discover how text generates. Models create text token by token, calculating probability charts to choose the next most logical fragment iteratively.",
            durationMin: 5,
            xpReward: 40
          }
        ],
        quiz: {
          moduleId: "aifound-m3",
          xpBonus: 180,
          questions: [
            {
              id: "aifound3-q1",
              question: "What is the primary innovation introduced by the Transformer architecture?",
              options: [
                "Dynamic database migrations",
                "Multi-head attention mechanisms that track relationship contexts across text sequences",
                "High-frequency graphics card interfaces",
                "Visual web builders"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aifound3-q2",
              question: "What represents a Semantic Vector Embedding?",
              options: [
                "A folder containing pictures",
                "A system database password string",
                "An array of numbers representing conceptual meaning and positioning in high-dimensional space",
                "A web protocol for uploading files"
              ],
              correctAnswerIndex: 2
            }
          ]
        }
      },
      {
        id: "aifound-m4",
        trackId: "ai-foundations",
        title: "AI Applications & Ethics",
        description: "Assess data privacy limits, locate model biases, examine fair deployment guidelines, and evaluate artificial limits.",
        order: 4,
        xpReward: 550,
        lessons: [
          {
            id: "aifound-m4-l1",
            moduleId: "aifound-m4",
            title: "Bias and Fairness in Datasets",
            content: "Models reflect human prejudices. If training datasets contain historical disparities, the model's classifications will replicate and scale those unfair biases.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "aifound-m4-l2",
            moduleId: "aifound-m4",
            title: "Data Privacy and Secure Enclaves",
            content: "Manage training leaks. Study how customer conversations, private medical diagnostics, or intellectual records must be protected from model memorization.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "aifound-m4-l3",
            moduleId: "aifound-m4",
            title: "The Black Box: Interpretability",
            content: "A major hurdle in deep learning is explainability. Discover why high-accuracy neural layers fail to detail *why* they reached specific decisions.",
            durationMin: 5,
            xpReward: 50
          },
          {
            id: "aifound-m4-l4",
            moduleId: "aifound-m4",
            title: "Algorithmic Alignment & RLHF",
            content: "Align models with human values. Review Reinforcement Learning with Human Feedback (RLHF) methods to rate safe, helpful, and objective guidelines.",
            durationMin: 4,
            xpReward: 50
          },
          {
            id: "aifound-m4-l5",
            moduleId: "aifound-m4",
            title: "Intellectual Property & Licensing",
            content: "Navigate a complex legal terrain. Analyze who legally owns the copyrights of synthetic text, graphics, or code, and review fair use boundaries.",
            durationMin: 5,
            xpReward: 50
          }
        ],
        quiz: {
          moduleId: "aifound-m4",
          xpBonus: 220,
          questions: [
            {
              id: "aifound4-q1",
              question: "Why do AI models sometimes output biased or discriminatory classifications?",
              options: [
                "Because the computer processors are physically defective",
                "Because they replicate and magnify existing biases present in their training datasets",
                "Models are naturally malicious entities",
                "Because they do not have enough electricity"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aifound4-q2",
              question: "What is the main goal of Reinforcement Learning with Human Feedback (RLHF)?",
              options: [
                "To teach models how to play video games",
                "To align model responses with human values, safety metrics, and helpful outcomes",
                "To speed up compilation times on full-stack servers",
                "To replace human employees entirely"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: "ai-content-creation",
    title: "AI Content Creation",
    description: "Generate highly precise cinematic imagery, produce custom vector elements, and voice synthesis scripts.",
    difficulty: "Beginner",
    duration: "10 hrs",
    skillsCovered: ["Computational Copy", "Image Diffusion", "Cinema Camera", "Calendar Outlines", "Audio synthesis"],
    xpReward: 1400,
    modules: [
      {
        id: "aicont-m1",
        trackId: "ai-content-creation",
        title: "AI Content Writing",
        description: "Master strategic prompt templates, refine brand voices, outline narrative pacing, and generate clean text blocks.",
        order: 1,
        xpReward: 200,
        lessons: [
          {
            id: "aicont-m1-l1",
            moduleId: "aicont-m1",
            title: "The Craft of Computational Copywriting",
            content: "Shift from empty typing to structured drafting. Learn how style presets, tone keywords, and audience maps shape your text layouts.",
            durationMin: 3,
            xpReward: 20
          },
          {
            id: "aicont-m1-l2",
            moduleId: "aicont-m1",
            title: "Iterative Drafting & Structuring",
            content: "Never build standard drafts in one prompt. Outline sections sequentially, draft introductions, enrich core details, and summarize findings in phases.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m1-l3",
            moduleId: "aicont-m1",
            title: "Establishing Custom Brand Voices",
            content: "Provide complete stylistic rules in system prompts. Outline vocabulary constraints, syntax density, passive-active balances, and emoji patterns.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m1-l4",
            moduleId: "aicont-m1",
            title: "Scriptwriting and Conversational Pacing",
            content: "Write for the ear. Structure natural dialetical scripts, calibrate dialogue beats, insert stage transitions, and manage active suspense pacing.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m1-l5",
            moduleId: "aicont-m1",
            title: "Editing & Polishing AI-Generated Drafts",
            content: "Ensure human craftsmanship. Actively refine drafts to eliminate repetitive model crutch phrases, verify factual claims, and insert authentic storytelling.",
            durationMin: 4,
            xpReward: 20
          }
        ],
        quiz: {
          moduleId: "aicont-m1",
          xpBonus: 80,
          questions: [
            {
              id: "aicont-q1",
              question: "What is a recommended strategy to maintain a cohesive brand voice in AI-written articles?",
              options: [
                "Ask the model to surprise you with different styles each time",
                "Specify a systematic set of tone, style, and vocabulary constraints in the system prompt",
                "Write everything in all-uppercase letters",
                "Avoid providing any instructions"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aicont-q2",
              question: "Why should you edit and review AI-generated written drafts before publishing?",
              options: [
                "To ensure factual correctness, remove repetitive model crutches, and inject authentic human styling",
                "To verify that the file compiles into C++",
                "Draft editing is illegal under standard copyright codes",
                "To make sure the script runs faster"
              ],
              correctAnswerIndex: 0
            }
          ]
        }
      },
      {
        id: "aicont-m2",
        trackId: "ai-content-creation",
        title: "AI Image Generation",
        description: "Explore latent space noise removal systems, control image layouts with ControlNet, and upscale assets to 4K resolutions.",
        order: 2,
        xpReward: 300,
        lessons: [
          {
            id: "aicont-m2-l1",
            moduleId: "aicont-m2",
            title: "The Science of Image Diffusion",
            content: "Image pipelines operate on noise. They start with an absolute blizzard of gray static, and systematically brush away noise in multiple iterations, looking for prompt correlations.",
            durationMin: 3,
            xpReward: 20
          },
          {
            id: "aicont-m2-l2",
            moduleId: "aicont-m2",
            title: "The Latent Space Map",
            content: "Pixel space is too complex. Model encoders convert images into mathematical coordinates in 'latent space' where deep conceptual concepts (e.g., 'cat', 'neon', 'futuristic') align.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m2-l3",
            moduleId: "aicont-m2",
            title: "ControlNet & Positional Guides",
            content: "Stop guessing! ControlNet uses auxiliary guides (edge contours, depth maps, skeleton wireframes) to strictly force characters to strike custom designated gestures.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m2-l4",
            moduleId: "aicont-m2",
            title: "Upscaling and Detailing Pipelines",
            content: "Initial generations are low resolution. Learn to execute dual-pass rendering, tile-based upscaling, and face restorations to export crisp 4K visual results.",
            durationMin: 4,
            xpReward: 20
          },
          {
            id: "aicont-m2-l5",
            moduleId: "aicont-m2",
            title: "Licensing and Intellectual Alignment",
            content: "As a futuristic creator, respect open weights permissions. Learn to train your own custom LORAs on your company's physical vector assets to stay secure.",
            durationMin: 4,
            xpReward: 20
          }
        ],
        quiz: {
          moduleId: "aicont-m2",
          xpBonus: 100,
          questions: [
            {
              id: "aicont2-q1",
              question: "How do modern image diffusion models generate clean visual layers?",
              options: [
                "By copy-pasting Google images directly into a smart collage",
                "By iteratively denoising a starting canvas of random visual noise according to prompt coordinates",
                "Using simple SVG vector lines drawn using Math.random()",
                "By loading a file directory from high-speed local memory folders"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aicont2-q2",
              question: "What utility does 'ControlNet' provide in advanced layout development?",
              options: [
                "It resets your wifi coordinates instantly",
                "It grants structural instructions (like wireframes, depth maps, or skeletal outlines) to lock the layout composition",
                "It restricts users from opening other browser tabs",
                "It counts the number of letters in text prompts"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aicont-m3",
        trackId: "ai-content-creation",
        title: "AI Video & Media Creation",
        description: "Animate static visual assets, edit audio vocal scripts, synthesize backing tracks, and sequence video story reels.",
        order: 3,
        xpReward: 400,
        lessons: [
          {
            id: "aicont-m3-l1",
            moduleId: "aicont-m3",
            title: "Understanding Frame Interpolation & Motion Vectors",
            content: "Generative video uses optical flow concepts. Algorithms generate subtle transition frames to smoothly morph elements between key frames without flickering.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aicont-m3-l2",
            moduleId: "aicont-m3",
            title: "Dynamic Text-to-Video Outlines",
            content: "Convert text descriptions into dynamic scenes. Specify camera controls (e.g. pan, dolly, crane-up) to generate high-intensity cinematically consistent video runs.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "aicont-m3-l3",
            moduleId: "aicont-m3",
            title: "Voice Synthesis and Clone Tuning",
            content: "Examine synthetic vocal cords. Convert transcripts into lifelike speech patterns, adding custom pause elements and emotional inflections.",
            durationMin: 4,
            xpReward: 30
          },
          {
            id: "aicont-m3-l4",
            moduleId: "aicont-m3",
            title: "Soundscapes & AI Background Scoring",
            content: "Synthesize backing atmospheric scores. Command generative audio tools to compose musical sequences matched to video tempo layouts.",
            durationMin: 5,
            xpReward: 30
          },
          {
            id: "aicont-m3-l5",
            moduleId: "aicont-m3",
            title: "Assembling Cinematic Story Reels",
            content: "Combine individual tracks. Compile visual, vocal, and backing audio layers into video timelines, synchronizing key cuts on major audio beats.",
            durationMin: 4,
            xpReward: 30
          }
        ],
        quiz: {
          moduleId: "aicont-m3",
          xpBonus: 120,
          questions: [
            {
              id: "aicont3-q1",
              question: "In generative video pipelines, what does 'Camera Control' parameters achieve?",
              options: [
                "They focus the hardware webcam on your face",
                "They command the synthesis algorithm to pan, zoom, or dolly the camera perspective across generated frames",
                "They adjust your computer monitor brightness settings",
                "They turn on the studio lights automatically"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aicont3-q2",
              question: "How is a realistic speech pacing engineered in AI Voice Synthesizers?",
              options: [
                "By speed-reading the text without spacing",
                "By inserting custom pauses, emotional weights, and phonetic pitch curves",
                "By translating files into sound effects",
                "Vocal generators cannot be customized"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      },
      {
        id: "aicont-m4",
        trackId: "ai-content-creation",
        title: "Content Strategy with AI",
        description: "Plan multi-channel asset distribution campaigns, track content performance matrices, analyze audience engagement, and scale asset outputs.",
        order: 4,
        xpReward: 500,
        lessons: [
          {
            id: "aicont-m4-l1",
            moduleId: "aicont-m4",
            title: "Automating Media Calendar Layouts",
            content: "Eliminate writer's block. Use automated scheduling charts to orchestrate structured theme plans and coordinate consistent publications.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aicont-m4-l2",
            moduleId: "aicont-m4",
            title: "Dynamic Visual Variation Pipelines",
            content: "Scale multi-size visual grids. Automatically re-render core visual assets into custom aspect ratios (9:16 vertical, 16:9 widescreen) for distinct networks.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aicont-m4-l3",
            moduleId: "aicont-m4",
            title: "A/B Testing AI-Generated Headlines",
            content: "Discover what resonates. Generate diverse variation hooks for products, analyze click ratios, and iterate toward optimized copy structures.",
            durationMin: 5,
            xpReward: 40
          },
          {
            id: "aicont-m4-l4",
            moduleId: "aicont-m4",
            title: "Tracking Audience Retention Traces",
            content: "Understand the analytics. Map user watch patterns, pinpoint exactly where audience drops occur, and use diagnostic findings to restructure your pacing.",
            durationMin: 4,
            xpReward: 40
          },
          {
            id: "aicont-m4-l5",
            moduleId: "aicont-m4",
            title: "The Ethical Compass of Scaled Content",
            content: "Maintain genuine integrity. At massive scale, prioritize informational values. Avoid low-quality spam to preserve long-term audience trust.",
            durationMin: 5,
            xpReward: 40
          }
        ],
        quiz: {
          moduleId: "aicont-m4",
          xpBonus: 150,
          questions: [
            {
              id: "aicont4-q1",
              question: "What represents a main benefit of visual variation scaling pipelines?",
              options: [
                "They delete the media from servers instantly",
                "They automatically reformat core assets into diverse size ranges matching different networks' specifications",
                "They increase the cost of subscriptions",
                "They translate visual assets into pure audio text formats"
              ],
              correctAnswerIndex: 1
            },
            {
              id: "aicont4-q2",
              question: "How should modern brand developers utilize automation analytics?",
              options: [
                "Ignore player tracking metrics entirely",
                "Restructure visual pacing and content hooks based on diagnostic records of where viewers lose interest",
                "Increase the number of daily ads on screen",
                "Delete user accounts with low scores"
              ],
              correctAnswerIndex: 1
            }
          ]
        }
      }
    ]
  }
];
