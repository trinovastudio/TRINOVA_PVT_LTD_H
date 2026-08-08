/* Trinova Aether — Industries data
   Sourced from the Trinova Website Information brief, Industries section. */
const TRINOVA_INDUSTRIES = [
  {
    id: "gaming",
    tag: "Interactive Entertainment",
    icon: "sports_esports",
    title: "Gaming & Interactive Entertainment",
    managedBy: "Trinova Studio",
    summary: "Original IP, multiplayer systems and gamified applications engineered across PC, mobile, console and emerging platforms.",
    overview:
      "Gaming is one of Trinova's core industries. We design and develop engaging interactive experiences across PC, mobile, console, and emerging platforms. Our focus is on creating original intellectual properties, multiplayer systems, educational games, simulations, and gamified applications that combine creativity with robust engineering.",
    services: [
      "Full Game Development", "Gameplay Programming", "Multiplayer Systems", "Game Design",
      "UI/UX", "Level Design", "Character Development", "Environment Art",
      "Animation", "Technical Art", "Performance Optimization", "Live Operations", "Publishing Support",
    ],
    workflow: ["Research & Concept", "Game Design Documentation", "Prototype Development", "Art & Asset Production", "Programming & Integration", "Quality Assurance", "Testing", "Launch", "Post-Launch Updates"],
  },
  {
    id: "software-enterprise",
    tag: "Enterprise Systems",
    icon: "dns",
    title: "Software & Enterprise Solutions",
    managedBy: "Trinova Business",
    summary: "Scalable ERP, CRM and automation platforms that help organizations of every size embrace digital transformation.",
    overview:
      "Modern businesses require software that improves efficiency, automates operations, and enhances customer experiences. Trinova develops scalable digital solutions tailored to organizations of all sizes, helping them embrace digital transformation with confidence.",
    services: [
      "Custom Software Development", "ERP Systems", "CRM Solutions", "HR Management Systems",
      "Billing Software", "Hotel Management Systems", "Inventory Management", "Automation Tools",
      "Dashboards", "SaaS Platforms", "API Integration", "Cloud Applications",
    ],
    workflow: ["Business Analysis", "Requirement Gathering", "System Architecture", "UI/UX Design", "Software Development", "Testing", "Deployment", "Training", "Maintenance & Support"],
  },
  {
    id: "artificial-intelligence",
    tag: "Applied AI",
    icon: "hub",
    title: "Artificial Intelligence",
    managedBy: "Trinova Business",
    summary: "AI chatbots, workflow automation and predictive systems that improve decision-making while staying transparent and reliable.",
    overview:
      "Artificial Intelligence is transforming every industry. Trinova develops AI-powered solutions that automate repetitive tasks, improve decision-making, and create intelligent user experiences while maintaining transparency and reliability.",
    services: [
      "AI Chatbots", "Workflow Automation", "Machine Learning Integration", "AI Assistants",
      "Data Processing", "Image Recognition", "Predictive Analytics", "AI-powered Customer Support", "Intelligent Search Systems",
    ],
    workflow: ["Problem Identification", "Data Collection", "Model Selection", "Training", "Integration", "Testing", "Deployment", "Continuous Improvement"],
  },
  {
    id: "film-cgi-animation",
    tag: "Visual Storytelling",
    icon: "movie",
    title: "Film, CGI & Animation",
    managedBy: "Trinova Production",
    summary: "Cinematic CGI, motion graphics and virtual production for films, brands, products and digital media.",
    overview:
      "Stories become more powerful through exceptional visuals. Trinova Production creates cinematic experiences for films, brands, products, and digital media using cutting-edge CGI, animation, and virtual production technologies.",
    services: [
      "CGI", "3D Animation", "Motion Graphics", "Commercials", "Product Animation",
      "Architectural Visualization", "Medical Visualization", "Corporate Films", "Documentaries",
      "Cinematics", "Visual Effects", "Virtual Production",
    ],
    workflow: ["Creative Brief", "Script", "Storyboard", "Concept Art", "Production", "Animation", "Lighting", "Rendering", "Editing", "Final Delivery"],
  },
  {
    id: "web-mobile",
    tag: "Digital Products",
    icon: "devices",
    title: "Web & Mobile Applications",
    managedBy: "Trinova Business",
    summary: "Fast, secure, scalable websites and apps that strengthen online presence and improve customer experience.",
    overview:
      "Websites and applications are often the first interaction between businesses and their customers. Trinova designs fast, secure, scalable, and visually engaging digital products that strengthen online presence and improve user experiences.",
    services: [
      "Business Websites", "Web Applications", "Mobile Apps", "Admin Dashboards",
      "E-Commerce Platforms", "Customer Portals", "CMS Development", "Progressive Web Apps",
    ],
    workflow: ["Research", "Planning", "UI/UX", "Development", "Testing", "Deployment", "Optimization"],
  },
  {
    id: "healthcare",
    tag: "Health Tech",
    icon: "medical_services",
    title: "Healthcare & Medical Technology",
    managedBy: "Trinova Business + Trinova Production",
    summary: "Reliable hospital software and medical visualization that simplify clinical communication and training.",
    overview:
      "Healthcare organizations require technology that is reliable, accurate, and easy to use. Trinova develops software and visual solutions that simplify medical communication, training, and operational workflows.",
    services: ["Hospital Software", "Medical Dashboards", "Medical Visualization", "Training Animation", "Healthcare Applications", "Interactive Learning"],
    workflow: ["Industry Research", "Requirement Analysis", "Design", "Development", "Validation", "Deployment"],
  },
  {
    id: "architecture-real-estate",
    tag: "Spatial Visualization",
    icon: "domain",
    title: "Architecture & Real Estate",
    managedBy: "Trinova Production",
    summary: "Photoreal renders, walkthroughs and virtual tours that help clients understand spaces before they're built.",
    overview:
      "Visualization helps clients understand spaces before they are built. Trinova creates architectural renders, walkthroughs, virtual tours, and interactive presentations for architects, builders, and developers.",
    services: ["Interior Visualization", "Exterior Visualization", "Walkthrough Animation", "Virtual Tours", "Product Visualization", "Interactive Experiences"],
    workflow: ["CAD Collection", "3D Modeling", "Materials", "Lighting", "Rendering", "Animation", "Delivery"],
  },
  {
    id: "education-training",
    tag: "EdTech",
    icon: "school",
    title: "Education & Training",
    managedBy: "Trinova Studio + Trinova Business",
    summary: "Gamified learning platforms and simulations engineered for retention, accessibility and scale.",
    overview:
      "Learning becomes more effective when technology is engaging. Trinova develops educational software, simulations, gamified learning experiences, and digital platforms that improve knowledge retention and accessibility.",
    services: ["E-Learning Platforms", "Educational Games", "Simulations", "Interactive Courses", "LMS Development", "Virtual Labs"],
    workflow: ["Learning Objectives", "Curriculum Design", "Prototype", "Development", "Testing", "Deployment"],
  },
  {
    id: "marketing-brand",
    tag: "Brand Experience",
    icon: "campaign",
    title: "Marketing & Brand Experience",
    managedBy: "Trinova Production + Trinova Business",
    summary: "Brand identity, motion content and interactive campaigns built for measurable business outcomes.",
    overview:
      "Modern brands require more than advertisements — they require memorable digital experiences. Trinova creates marketing assets that combine creativity with measurable business outcomes.",
    services: ["Brand Identity", "Social Media Content", "Product Videos", "Motion Graphics", "Interactive Campaigns", "Landing Pages", "Digital Advertising"],
    workflow: ["Brand Discovery", "Strategy", "Creative Direction", "Design", "Production", "Campaign Launch", "Performance Analysis"],
  },
  {
    id: "research-emerging-tech",
    tag: "R&D Frontier",
    icon: "science",
    title: "Research & Emerging Technology",
    managedBy: "All Three Divisions",
    summary: "Experimental products across AR/VR, spatial computing, digital humans and real-time rendering.",
    overview:
      "Innovation is driven by exploration. Trinova continuously researches emerging technologies and develops experimental products that prepare businesses and creators for the future.",
    services: [
      "Artificial Intelligence", "AR/VR", "Mixed Reality", "Digital Humans", "Spatial Computing",
      "Procedural Generation", "Cloud Gaming", "Robotics Integration", "Real-Time Rendering", "Human-Computer Interaction",
    ],
    workflow: ["Research", "Prototype", "Validation", "Iteration", "Product Development", "Commercialization"],
  },
];
