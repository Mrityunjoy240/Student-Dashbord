import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const syllabusData = [
  {
    subject: "AI, Ethics, Society (AM-401)",
    difficulty: "Medium",
    color: "brand",
    modules: [
      {
        name: "Module 1: Foundations of Ethics and the Evolution of AI",
        topics: [
          "History of ethics (Western, Indian, Buddhist, Islamic)",
          "Major ethical theories: Kantian deontology, Consequentialism, Utilitarianism, Virtue Ethics, Ethics of Care, Ubuntu, Distributive Justice",
          "Professional codes of conduct: ACM, ALA, IEEE",
          "Introduction to AI: definition, milestones, generative vs. predictive",
          "Societal dimensions and motivations",
          "AI lifecycle overview"
        ]
      },
      {
        name: "Module 2: Technical Foundations of AI and Core Ethical Challenges",
        topics: [
          "Supervised learning basics",
          "Unsupervised learning and generative AI overview (GANs, VAEs, diffusion)",
          "Ethical issues in generative AI: synthetic data, deep-fakes",
          "Bias in predictive models",
          "AI alignment problem: moral machines",
          "Decision-making pipelines and ethical risk points"
        ]
      },
      {
        name: "Module 3: Data Ethics, Privacy, Bias, and Fairness",
        topics: [
          "Data ownership and informed consent",
          "Privacy-enhancing concepts: differential privacy, federated learning",
          "Data protection regulations: GDPR, CCPA",
          "Sources of bias in data and training",
          "Bias detection techniques (statistical tests, model-cards)",
          "Mitigation strategies (pre/in/post-processing)",
          "Fairness concepts and metrics"
        ]
      },
      {
        name: "Module 4: Accountability, Transparency, Explainability & Legal Landscape",
        topics: [
          "Black-box problem and interpretability (feature importance, LIME, SHAP)",
          "Explainable AI (XAI) and EU AI Act",
          "Accountability frameworks: impact assessments, model-cards",
          "Legal landscape: IP, liability, AI-specific regulations",
          "Transparency, power, and agency",
          "Ethical guidelines (IEEE 7010, ISO/IEC 42001)"
        ]
      },
      {
        name: "Module 5: Autonomous Systems, Societal Impacts & Controversial Applications",
        topics: [
          "Ethical challenges in autonomous vehicles and robots (trolley problem)",
          "AI and the future of work: automation, reskilling",
          "Case studies of AI failures",
          "Military and surveillance applications",
          "AI in creative industries and biomedical research",
          "Responsibility for autonomous decisions",
          "Governance for high-risk systems"
        ]
      },
      {
        name: "Module 6: Governance, Policy, and Responsible AI Practice",
        topics: [
          "International AI governance (OECD, UNESCO, EU AI Act)",
          "Human-rights-centered design",
          "Policy recommendations and regulatory challenges",
          "Interdisciplinary collaboration",
          "Responsible AI engineering practices (data-sheets, impact assessments)",
          "Guidelines and certification (ISO/IEC 42001, IEEE 7010)",
          "Strategies for public trust and societal engagement"
        ]
      }
    ]
  },
  {
    subject: "Design and Analysis of Algorithm (AM-402)",
    difficulty: "Hard",
    color: "orange",
    modules: [
      {
        name: "Module 1: Foundations of Algorithms and Complexity",
        topics: [
          "What is an algorithm? algorithm as a technology",
          "Models of computation (RAM), termination, and correctness",
          "Measuring performance: best/worst/average case",
          "Asymptotic notation: O, Ω, Θ, o, ω",
          "Review of essential math",
          "Basic ADTs: arrays, linked lists, stacks, queues",
          "Hash tables and binary-search trees"
        ]
      },
      {
        name: "Module 2: Recurrences and Divide-and-Conquer Techniques",
        topics: [
          "Recurrence relations",
          "Solving recurrences: substitution, recursion-tree, Master theorem",
          "Divide-and-Conquer paradigm",
          "Binary search",
          "Merge sort",
          "Quick sort and QuickSelect",
          "Heap data structure and Heap sort",
          "Linear-time sorting: counting, radix, bucket sort",
          "Multiplication of large integers (Karatsuba)"
        ]
      },
      {
        name: "Module 3: Greedy Algorithms and Priority-Queue Structures",
        topics: [
          "Greedy paradigm and proof techniques",
          "Activity-selection",
          "Making change problem",
          "Huffman coding",
          "Minimum-spanning-tree: Kruskal's and Prim's",
          "Greedy task-scheduling",
          "Priority queues with binary heaps",
          "Dijkstra's shortest-path algorithm"
        ]
      },
      {
        name: "Module 4: Dynamic Programming and Amortized Analysis",
        topics: [
          "DP fundamentals: optimal substructure, overlapping subproblems",
          "Classic DP problems: Rod-cutting, Matrix-chain multiplication, LCS, 0/1 knapsack, Subset-sum, Independent set in trees",
          "Floyd-Warshall algorithm",
          "Amortized analysis: aggregate, accounting, potential methods",
          "Dynamic tables"
        ]
      },
      {
        name: "Module 5: Advanced Graph Algorithms and Network Flows",
        topics: [
          "Graph representations",
          "BFS and DFS",
          "Topological sorting",
          "Strongly connected components",
          "Single-source shortest paths: Dijkstra, Bellman-Ford, DAG paths",
          "Maximum-flow fundamentals: Ford-Fulkerson, Edmonds-Karp",
          "Maximum bipartite matching"
        ]
      },
      {
        name: "NP-Completeness, Approximation, Randomization & Backtracking (AI-Focused)",
        topics: [
          "Complexity classes: P, NP, PSPACE, NP-hard/complete",
          "Reducibility and Cook's theorem",
          "Classic NP-complete problems (SAT, Clique, TSP, etc.)",
          "Approximation algorithms",
          "Randomized algorithms: quicksort, Rabin-Karp",
          "String-matching: KMP, finite-automata",
          "Backtracking: N-Queens",
          "Branch-and-bound: 15-puzzle",
          "A* algorithm"
        ]
      }
    ]
  },
  {
    subject: "Operating System (AM-403)",
    difficulty: "Hard",
    color: "red",
    modules: [
      {
        name: "Module 1: Foundations of Operating Systems",
        topics: [
          "Introduction & history",
          "Computing system organization (CPU, memory, I/O)",
          "OS components: process, memory, file, security",
          "OS models: monolithic, micro-kernel, hypervisor",
          "System-call interface",
          "Boot process",
          "Interrupt handling",
          "OS families (Unix, Windows, RTOS)"
        ]
      },
      {
        name: "Module 2: Processes and Threads",
        topics: [
          "Process concept, states, and PCB",
          "Process creation/termination",
          "Control operations: wait, signal, context-switch",
          "IPC: shared memory, pipes, sockets",
          "Thread fundamentals: POSIX and Windows threads",
          "Multicore programming and thread-scheduling",
          "Process isolation and containers"
        ]
      },
      {
        name: "Module 3: Process Scheduling and Concurrency Control",
        topics: [
          "Scheduling goals",
          "Algorithms: FCFS, SJF, RR, Priority, MLFQ",
          "Multiprocessor scheduling",
          "Context-switch overhead",
          "Priority inversion and inheritance",
          "Critical-section problem",
          "Real-time scheduling (EDF)"
        ]
      },
      {
        name: "Module 4: Synchronization Primitives and Deadlock",
        topics: [
          "Correctness criteria",
          "Software solutions: Peterson's, Dekker",
          "Hardware primitives: test-and-set, memory barriers",
          "Synchronization objects: mutexes, semaphores, monitors",
          "Classic patterns: Producer-consumer, Readers-writers, Dining philosophers",
          "Deadlock model and Handling (prevention, avoidance, detection)"
        ]
      },
      {
        name: "Module 5: Memory Management and Virtual Memory",
        topics: [
          "MMU and protection bits",
          "Allocation: swapping, contiguous, fragmentation",
          "Segmentation and paging",
          "TLB role",
          "Virtual memory: demand paging, copy-on-write",
          "Page-replacement (FIFO, LRU, Clock)",
          "Thrashing and NUMA awareness",
          "Kernel memory allocation"
        ]
      },
      {
        name: "Module 6: Storage, I/O, Protection, Security & Advanced OS Topics",
        topics: [
          "Storage hierarchy: SSD, RAID, Cloud",
          "Disk scheduling: elevator, SSTF",
          "File-system implementation and implementation",
          "Protection & security models: Unix permissions, ACLs",
          "OS-level attacks (buffer overflow)",
          "OS support for accelerators (GPU/TPU scheduling)"
        ]
      }
    ]
  },
  {
    subject: "Machine Learning (AM 404)",
    difficulty: "Hard",
    color: "blue",
    modules: [
      {
        name: "Module 1: Introduction to Machine Learning and Supervised Learning",
        topics: [
          "Types of ML (Supervised, Unsupervised, Reinforcement)",
          "Regression vs. Classification",
          "Linear Models: Least-Squares Fitting",
          "Evaluation Metrics: MSE, RMSE",
          "Model Selection: Train-Test Split, Cross-Validation, Bias-Variance Trade-off",
          "Overfitting/Underfitting, Confusion Matrix, Precision, Recall, F1, ROC"
        ]
      },
      {
        name: "Module 2: Supervised Learning Algorithms I: Classification",
        topics: [
          "Logistic Regression",
          "Regularization (L1/L2)",
          "Optimization: Gradient Descent (Batch, Stochastic)",
          "Naive Bayes Classifier",
          "k-Nearest Neighbors: distance metrics"
        ]
      },
      {
        name: "Module 3: Supervised Learning Algorithms II: Trees and Ensembles",
        topics: [
          "Decision Trees: Information Gain, Gini, Pruning",
          "Random Forests: Bagging",
          "Gradient Boosting Machines (GBM): XGBoost, LightGBM",
          "Hyperparameter Tuning: Grid/Random Search"
        ]
      },
      {
        name: "Module 4: Introduction to Neural Networks",
        topics: [
          "Perceptrons and MLPs",
          "Activation Functions: Sigmoid, ReLU, Softmax",
          "Backpropagation algorithm",
          "Loss Functions: MSE, Cross-entropy",
          "Optimization: SGD, Adam",
          "Data preprocessing and scaling"
        ]
      },
      {
        name: "Module 5: Unsupervised Learning and Deep Learning Architectures (Introduction)",
        topics: [
          "Clustering: k-Means",
          "Dimensionality Reduction: PCA",
          "Convolutional Neural Networks (CNNs) overview",
          "Recurrent Neural Networks (RNNs) overview"
        ]
      },
      {
        name: "Module 6: AI Applications, Ethical Considerations & Reinforcement Learning (Introduction)",
        topics: [
          "ML/DL Applications: Image recognition, NLP, robotics",
          "Ethical considerations: Bias, fairness, accountability",
          "Reinforcement Learning: MDPs, Q-learning high-level overview"
        ]
      }
    ]
  },
  {
    subject: "Mathematics for Machine Learning (AM-405)",
    difficulty: "Hard",
    color: "yellow",
    modules: [
      {
        name: "Module 1: Linear Algebra Foundations for AI",
        topics: [
          "Vectors, matrices and basic operations",
          "Systems of linear equations and inversion",
          "Rank, basis, and vector spaces",
          "Linear transformations",
          "Norms, inner product, and orthogonality",
          "Gram-Schmidt process",
          "Eigenvalues/Eigenvectors and SVD",
          "NumPy computation"
        ]
      },
      {
        name: "Module 2: Calculus and Optimization Techniques",
        topics: [
          "Differentiation: univariate, partial, gradient",
          "Jacobian and Hessian matrices",
          "Multivariate Taylor series and chain rule",
          "Unconstrained optimization: Gradient Descent, Newton's method, momentum",
          "Constrained optimization: Lagrange multipliers",
          "Convex functions",
          "Regularization as constraint"
        ]
      },
      {
        name: "Module 3: Probability & Statistics for AI",
        topics: [
          "Axioms, Bayes' theorem, independence",
          "Distributions: Bernoulli, Gaussian, exponential",
          "Expectation, variance, covariance",
          "Sampling and descriptive statistics",
          "Hypothesis testing and A/B testing",
          "MLE and MAP estimation",
          "Bias-variance trade-off"
        ]
      },
      {
        name: "Module 4: Linear Models & Dimensionality Reduction",
        topics: [
          "Data representation with NumPy/pandas",
          "Preprocessing: scaling and splits",
          "Linear regression and multivariate solutions",
          "Regularization: Ridge and Lasso",
          "PCA and LDA theory",
          "Model evaluation: k-fold, ROC/AUC, F1",
          "Model interpretability"
        ]
      },
      {
        name: "Module 5: Classical Supervised Learning Algorithms",
        topics: [
          "Support Vector Machines: kernel trick, dual formulation",
          "Decision/Regression trees: splitting, pruning",
          "Ensemble methods: Bagging, RF, Boosting (AdaBoost, Gradient Boosting)",
          "Perceptron",
          "Hyper-parameter tuning: Grid search",
          "Interpretability: SHAP"
        ]
      },
      {
        name: "Module 6: Deep Learning, Unsupervised Learning & Uncertainty",
        topics: [
          "Neural network fundamentals: activation and loss functions",
          "Backpropagation and autodiff",
          "Optimization: Adam",
          "Regularization: Dropout, Batch norm",
          "CNN basics",
          "EM algorithm and Gaussian Mixture Models",
          "Clustering: k-means, DBSCAN",
          "Uncertainty: MC dropout",
          "Transformers and attention overview"
        ]
      }
    ]
  },
  {
    subject: "Data Handling and Data Visualization (AM-497)",
    difficulty: "Medium",
    color: "green",
    modules: [
      {
        name: "Module 1: Introduction to Data Visualization for AI",
        topics: [
          "Defining visualization workflow for AI",
          "Human perception and cognition",
          "Assessing quality for explainability",
          "Ethical considerations: bias and fairness",
          "Communication of model performance/limitations"
        ]
      },
      {
        name: "Module 2: Fundamental Chart Types and Data Representation for AI",
        topics: [
          "Data types: categorical, numerical, temporal, spatial",
          "Core charts: Histograms, scatter, box plots, line charts",
          "Visualizing distributions for training",
          "Effective use of color/labels",
          "Selecting charts based on task"
        ]
      },
      {
        name: "Module 3: Data Preprocessing and Exploratory Data Analysis (EDA) for AI",
        topics: [
          "Cleaning: missing values, outliers",
          "Feature scaling",
          "EDA techniques for patterns/anomalies",
          "Visualization for EDA (pair plots)",
          "Dimensionality reduction visualization (PCA, t-SNE)"
        ]
      },
      {
        name: "Module 4: Visualizing AI Models and Relationships",
        topics: [
          "Performance metrics: ROC, precision-recall, confusion matrices",
          "Feature importance: partial dependence plots",
          "Decision boundaries visualization",
          "Target variable relationships",
          "Parallel coordinates for high-dimensional data"
        ]
      },
      {
        name: "Module 5: Data Visualization Tools for AI",
        topics: [
          "Matplotlib, Seaborn, Plotly practice",
          "Interactive libraries: Bokeh, Dash",
          "Version control with Git",
          "Reproducibility best practices",
          "Creating visualizations for reports"
        ]
      },
      {
        name: "Module 6: Explainable AI (XAI) and Case Studies",
        topics: [
          "XAI importance",
          "Visualizing model explanations (LIME, SHAP)",
          "Case studies in XAI",
          "Future research areas"
        ]
      }
    ]
  }
]

async function main() {
  console.log('Clearing existing subjects and tasks...')
  await prisma.task.deleteMany()
  await prisma.subject.deleteMany()

  for (const item of syllabusData) {
    console.log(`Creating subject: ${item.subject}`)
    
    // Count total topics
    const totalTopics = item.modules.reduce((acc, mod) => acc + mod.topics.length, 0)
    
    const subject = await prisma.subject.create({
      data: {
        name: item.subject,
        difficulty: item.difficulty,
        color: item.color,
        totalTopics: totalTopics,
        completedTopics: 0
      }
    })

    const tasksData = []
    for (const mod of item.modules) {
      for (const topic of mod.topics) {
        tasksData.push({
          title: topic,
          isCompleted: false,
          category: item.subject.split(' (')[0], // Extract category from name
          subjectId: subject.id,
          module: mod.name
        })
      }
    }

    await prisma.task.createMany({
      data: tasksData
    })
  }

  console.log('Syllabus sync complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
