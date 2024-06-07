# ![SBI Banking Web App](/public/complete-logo.svg)

# SBI Banking Web App

## [Live Demo - Click Here](https://finance-seven-psi.vercel.app/)

Welcome to the **UNOFFICIAL** repository of the SBI Banking Web App, a cutting-edge online banking solution designed to provide seamless and secure financial services. This application offers a range of services including payments, transactions, account management, and more. It leverages the latest technology stack to ensure robust performance, security, and scalability.

## Table of Contents

- [](#)
- [SBI Banking Web App](#sbi-banking-web-app)
  - [Live Demo - Click Here](#live-demo---click-here)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Authentication](#authentication)
    - [Payments and Transactions](#payments-and-transactions)
    - [Data Visualization](#data-visualization)
  - [Demo Video](#demo-video)
  - [Demo Images](#demo-images)
  - [Mobile View](#mobile-view)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

- *User Authentication*: Secure user authentication powered by [Clerk](https://clerk.com).
- *Account Management*: Manage multiple accounts with ease.
- *Payments and Transactions*: Handle payments and transactions seamlessly.
- *Data Visualization*: Interactive charts and graphs using [Recharts](https://recharts.org/).
- *Responsive Design*: Fully responsive and mobile-friendly interface.
- *High Performance*: Optimized for speed and reliability.

## Tech Stack

- *Framework*: [Next.js 14](https://nextjs.org/)
- *Authentication*: [Clerk](https://clerk.com)
- *Language*: [TypeScript](https://www.typescriptlang.org/)
- *Charts*: [Recharts](https://recharts.org/)
- *Database*: [PostgreSQL](https://www.postgresql.org/)
- *Server Framework*: [Hono](https://hono.dev/)
- *ORM*: [Drizzle](https://drizzle.team/)
- *Deployment*: [Vercel](https://vercel.com/)
- *Styling*: [Tailwind CSS](https://tailwindcss.com/)

## Installation

To get started with the SBI Banking Web App, follow these steps:

1. *Clone the repository*:
    bash
    git clone https://github.com/abhinandan-verma/finance.git
    cd finance
    

2. *Install dependencies*:
    bash
    npm install
    

3. *Set up environment variables*:
    Create a .env.local file in the root of the project and add the necessary environment variables. Refer to .env.example for required variables.

4. *Run the development server*:
    bash
    npm run dev
    

5. *Open the app in your browser*:
    Navigate to http://localhost:3000.

## Usage

### Authentication

We use Clerk for user authentication. Ensure you have set up your Clerk credentials in the environment variables.
https://docs.clerk.dev/

### Payments and Transactions

To make payments and handle transactions, navigate to the respective sections in the app after logging in. The UI is intuitive and guides you through the necessary steps.

### Data Visualization

Our app includes comprehensive data visualization tools to help you track your financial activities. Visit the "Analytics" section to explore.
* https://recharts.org/

## Demo Video

https://github.com/abhinandan-verma/finance/assets/147910430/7f0bc366-097b-42ba-aa73-53769afbc1f2

## Demo Images
![SBI Banking Web App Logo](/public/complete-logo.svg)
![Screenshot](/public/screenshots/sign-in.png)
![Screenshot](/public/screenshots/sc1.png)
![Screenshot](/public/screenshots/sc3.png)
![Screenshot](/public/screenshots/sc8.png)
![Screenshot](/public/screenshots/sc11.png)

## Mobile View

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <img src="/public/mobile/sc3.jpeg" alt="Mobile View" style="width: 50%;">
    <img src="/public/mobile/sc4.jpeg" alt="Mobile View" style="width: 50%;">
    <img src="/public/mobile/sc8.jpeg" alt="Mobile View" style="width: 50%;">
    <img src="/public/mobile/sc7.jpeg" alt="Mobile View" style="width: 50%;">
</div>

## Contributing

We welcome contributions from the community. To contribute, please follow these steps:

1. *Fork the repository*.
2. *Create a new branch*:
    bash
    git checkout -b feature/your-feature-name
    
3. *Make your changes* and *commit* them:
    bash
    git commit -m 'Add some feature'
    
4. *Push to the branch*:
    bash
    git push origin feature/your-feature-name
    
5. *Create a Pull Request*.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or issues, please contact us at [support@sbiapp.com](mailto:support@sbiapp.com).

---

Thank you for using the SBI Banking Web App. We hope it serves all your banking needs efficiently and securely.
