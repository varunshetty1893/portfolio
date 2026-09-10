import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "parkwise",
    title: "ParkWise",
    subtitle: "Enterprise Smart Parking Operations & Revenue Platform",
    category: "Full-Stack & Systems",
    description:
      "Enterprise-grade smart parking management platform automating vehicle check-in/out, dynamic slot allocation, tariff billing, staff payroll, and real-time revenue analytics.",
    badge: "640+ Automated Tests",
    highlights: [
      "Engineered with 640+ unit and integration tests verifying billing, tariff calculation, and concurrent slot allocation.",
      "Dual database support: SQLite for local rapid dev and PostgreSQL for enterprise production workloads.",
      "Reactive, lightweight front-end powered by Alpine.js and Tailwind CSS without bulky heavy framework overhead.",
    ],
    features: [
      "Real-time parking slot occupancy mapping with dynamic status updates",
      "Automated vehicle license plate tracking and multi-tier hourly billing engine",
      "Staff management module with role-based access control and shift logging",
      "Executive analytics dashboard with daily/monthly revenue metrics and PDF invoice generation",
    ],
    technicalDetails: [
      "Built with Python Flask using modular Blueprints and application factories",
      "PostgreSQL with SQLAlchemy ORM, indexes on slot IDs and timestamps for sub-5ms query response",
      "Alpine.js reactive stores with server-rendered Jinja2 templates",
      "Pytest suite covering race conditions, edge-case overtime tariffs, and discount codes",
    ],
    github: "https://github.com/varunshetty1893/parkwise",
    skills: {
      frontend: [
        { name: "Alpine.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/alpinejs/alpinejs-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "HTML5/CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "SQLAlchemy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      ],
      mlOrTools: [
        { name: "Pytest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      ],
    },
  },
  {
    id: "zentra",
    title: "Zentra ATS",
    subtitle: "Job Search & Intelligent Resume ATS Optimization Ecosystem",
    category: "Full-Stack & Cloud",
    description:
      "A complete hiring ecosystem where job seekers evaluate resumes against authentic ATS scoring algorithms, recruiters manage vacancies & applicant funnels, and admins gatekeeper recruitment access.",
    badge: "Live on Vercel",
    highlights: [
      "Realistic ATS keyword matching and formatting scoring algorithm providing actionable resume feedback.",
      "Multi-persona portal: Candidate dashboard, Recruiter applicant tracking pipeline, and Super Admin oversight.",
      "Built-in interactive resume builder generating clean, recruiter-friendly formatted resumes.",
    ],
    features: [
      "ATS Compatibility Checker scoring resumes against target job descriptions in real-time",
      "Recruiter Kanban board for tracking candidate status: Applied, Reviewing, Interview, Accepted/Rejected",
      "Granular permission verification ensuring only approved recruiters can post active roles",
      "Full applicant history with status notifications and direct profile review",
    ],
    technicalDetails: [
      "Flask backend with RESTful API endpoints and token-based authentication sessions",
      "PostgreSQL database with relational schemas for candidate profiles, resumes, jobs, and applications",
      "Deployed to Vercel and cloud containers with automated CI pipelines",
      "Responsive, clean UI with fast client-side filtering and search indexing",
    ],
    github: "https://github.com/varunshetty1893/Zentra",
    live: "https://zentraats.vercel.app",
    skills: {
      frontend: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      ],
      mlOrTools: [
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      ],
    },
  },
  {
    id: "ai-interviewer",
    title: "AI Interviewer",
    subtitle: "AI-Powered Conversational Mock Interview & Evaluation Platform",
    category: "AI & GenAI",
    description:
      "Interactive interview preparation platform powered by Groq LLaMA 3.3 70B that generates tailored questions, conducts voice/text mock interviews, and produces deep diagnostic evaluations.",
    badge: "Groq LLaMA 3.3 70B",
    highlights: [
      "Sub-second AI response latency achieved via Groq's high-speed LPU inference engine.",
      "Dynamic prompt engineering that adapts question difficulty based on the candidate's previous responses.",
      "Comprehensive performance scorecard analyzing technical accuracy, clarity, and confidence.",
    ],
    features: [
      "Job role and skill-customized technical & behavioral interview simulations",
      "Conversational question flow with automated follow-ups challenging candidate assumptions",
      "Instant multi-metric report with strengths, improvement recommendations, and model answers",
      "Mock interview history tracking progress over time with scorecard comparisons",
    ],
    technicalDetails: [
      "Python Flask microservice communicating with Groq API (LLaMA 3.3 70B Versatile)",
      "Strict JSON structured output validation ensuring deterministic evaluation metrics",
      "SQLite local session store caching interview states and questions",
      "Deployed to Render cloud platform with zero-latency streaming responses",
    ],
    github: "https://github.com/varunshetty1893/AI-Interviewr",
    live: "https://ai-interviewer-1-zxke.onrender.com/",
    skills: {
      frontend: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "Groq LLaMA 3.3", icon: "/icons/groq.svg" },
        { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      ],
      mlOrTools: [
        { name: "Render", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      ],
    },
  },
  {
    id: "ct-classifier",
    title: "COVID-19 & Pneumonia CT Scan Classifier",
    subtitle: "Deep Medical Image Feature Extraction & Ensemble Classifier",
    category: "Machine Learning & CV",
    description:
      "Automated diagnostic classification pipeline identifying COVID-19, Pneumonia, and Normal chest CT scans using DenseNet121 deep representations combined with classical statistical classifiers.",
    badge: "DenseNet121 + SVM",
    highlights: [
      "Leveraged pretrained DenseNet121 convolutional networks for robust high-dimensional feature extraction.",
      "Trained and benchmarked Support Vector Machines (SVM), Random Forest, and Logistic Regression models.",
      "Comprehensive evaluation including confusion matrices, ROC-AUC curves, precision, recall, and F1 scores.",
    ],
    features: [
      "Automated image preprocessing pipeline: resizing, normalization, histogram equalization, and augmentation",
      "Deep feature extraction from DenseNet121 transition layers",
      "Multi-class classification: Normal, Bacterial/Viral Pneumonia, and COVID-19 pulmonary infiltrates",
      "Model interpretability analysis identifying key discriminative image regions",
    ],
    technicalDetails: [
      "Python 3, Scikit-learn, NumPy, Pandas, OpenCV, and PyTorch / TensorFlow",
      "Hyperparameter tuning using GridSearchCV with 5-fold cross-validation",
      "Comparative analysis proving SVM with RBF kernel achieved superior generalization on CT scan features",
      "Jupyter Notebook workflow with documented research methodology and statistical validation",
    ],
    github: "https://github.com/varunshetty1893/covid19-pneumonia-ct-classification",
    skills: {
      frontend: [
        { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      ],
      backend: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "DenseNet121", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      ],
      mlOrTools: [
        { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      ],
    },
  },
  {
    id: "global-farmer",
    title: "Global Farmer",
    subtitle: "AgriTech E-Commerce Platform & Agricultural Marketplace",
    category: "Full-Stack Web",
    description:
      "A specialized e-commerce web platform connecting agricultural producers directly with wholesale buyers and consumers, eliminating exploitative intermediaries.",
    badge: "Direct Farmer Marketplace",
    highlights: [
      "Empowers rural farmers to list crop yields, set competitive rates, and manage incoming orders.",
      "Dual storefront with shopping cart, customer checkout, and a full administrative management console.",
      "Order lifecycle tracking from farm harvest through dispatch and final delivery confirmation.",
    ],
    features: [
      "Farmer product catalog with categories for grains, vegetables, spices, and organic yields",
      "Interactive shopping cart with tax calculations and delivery scheduling",
      "Admin panel with analytics on fast-moving commodities and registered farmer statistics",
      "User authentication with role separation between agricultural vendors and retail consumers",
    ],
    technicalDetails: [
      "Full-stack PHP server with modular architectural layout",
      "MySQL database with relational schemas for inventory, order lines, farmer profiles, and payments",
      "Vanilla JavaScript for responsive asynchronous cart updates without full page reloads",
      "Bootstrap 5 mobile-responsive grid for accessibility across low-bandwidth rural mobile devices",
    ],
    github: "https://github.com/varunshetty1893/global-farmer",
    skills: {
      frontend: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "HTML5/CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
      ],
      mlOrTools: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      ],
    },
  },
  {
    id: "fitness-planner",
    title: "Smart Fitness & Diet Planner",
    subtitle: "Rule-Based Health, BMI & Nutrition Engine",
    category: "Web & Algorithmic",
    description:
      "Personalized nutrition and workout prescription engine calculating tailored daily macro requirements, meal splits, and hydration targets based on biological metrics and fitness goals.",
    badge: "Personalized Nutrition Engine",
    highlights: [
      "Algorithmic calculations of Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and BMI.",
      "Custom meal distribution plans tailored for weight loss, lean muscle hypertrophy, and maintenance.",
      "Hydration schedule and progressive resistance training guidance matched to user activity level.",
    ],
    features: [
      "Interactive health metrics input: age, height, weight, gender, target timeline, and activity tier",
      "Dynamic diet chart generation with calorie breakdown across proteins, carbs, and fats",
      "Exercise library with tailored recommendations based on user physical capability",
      "Local progress recording allowing users to track weight and body composition shifts",
    ],
    technicalDetails: [
      "Python Flask web application with clean routing and session management",
      "SQLite database storing nutrition lookup tables, food calories, and user logs",
      "Client-side dynamic validation and visual metric gauges using JavaScript and CSS3",
    ],
    github: "https://github.com/varunshetty1893/Smart-Fitness-Diet-Planner-Python-Project",
    skills: {
      frontend: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      ],
    },
  },
  {
    id: "student-results",
    title: "Student Result Management System",
    subtitle: "Academic Records, Grading & Instant Marksheet Portal",
    category: "Full-Stack Web (Internship)",
    description:
      "Developed during web development internship at Testsavvy Company. Enables academic institutions to manage courses, students, subject enrollment, exam marks, and generate automated PDF grade cards.",
    badge: "Built at Testsavvy",
    highlights: [
      "Streamlined institutional exam result publication for thousands of student records.",
      "Student-facing instant result lookup with verification credentials and secure pass/fail calculation.",
      "Comprehensive faculty administration portal with bulk marks upload and class analytics.",
    ],
    features: [
      "Student portal: Roll number verification and instant marksheet display with grades and GPA",
      "Admin portal: Class creation, subject assignment, teacher allocation, and marks moderation",
      "Automated result calculation: pass criteria, distinctions, subject-wise totals, and ranks",
      "Clean printable marksheet layout formatted for official institutional transcripts",
    ],
    technicalDetails: [
      "PHP backend with sanitized database queries defending against SQL injection",
      "Relational MySQL database with normalized schemas linking students, classes, subjects, and results",
      "Bootstrap responsive tables and modal dialogs for fast administrator workflows",
    ],
    github: "https://github.com/varunshetty1893/Student-result-management-project",
    skills: {
      frontend: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
      backend: [
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      ],
      mlOrTools: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      ],
    },
  },
];
