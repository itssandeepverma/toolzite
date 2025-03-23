import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBolt, FaGlobe, FaLayerGroup, FaSearch, FaRobot, FaBrain, FaCloud } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    icon: <FaSearch className="faq-icon" />,
    question: "How can I find the best AI tool for my needs?",
    answer: "Use our smart search and category filters to quickly find the perfect AI tool for your task.",
  },
  {
    id: 2,
    icon: <FaRobot className="faq-icon" />,
    question: "Do I need technical skills to use AI tools?",
    answer: "Not at all! Many AI tools are designed for beginners with no coding knowledge required.",
  },
  {
    id: 3,
    icon: <FaBrain className="faq-icon" />,
    question: "Can AI tools replace human creativity?",
    answer: "AI enhances creativity by assisting with ideation, automation, and optimization, but human touch is irreplaceable!",
  },
  {
    id: 4,
    icon: <FaCloud className="faq-icon" />,
    question: "Are AI tools cloud-based or downloadable?",
    answer: "Most AI tools are cloud-based for easy access, but some offer desktop versions as well.",
  },
];

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-white mb-4">Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq) => (
          <div key={faq.id} className={`faq-item ${openFAQ === faq.id ? "open" : ""}`}>
            <div className="faq-header" onClick={() => toggleFAQ(faq.id)}>
              <div className="faq-left">
                {faq.icon}
                <h5 className="faq-text mb-0">{faq.question}</h5>
              </div>
              {openFAQ === faq.id ? (
                <FaChevronUp className="icon gradient-icon" />
              ) : (
                <FaChevronDown className="icon gradient-icon" />
              )}
            </div>
            <div className={`faq-content ${openFAQ === faq.id ? "open" : ""}`}>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS Styles (Inline)
const styles = `

  .faq-item {
    background: rgba(169, 166, 166, 0.5);
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 15px;
    transition: all 0.3s ease-in-out;
  }

  .faq-item.open {
    background: linear-gradient(to right, rgba(0, 156, 62, 0.5), rgba(172, 236, 32, 0.5));
  }

  .faq-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px;
  }

  .faq-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .faq-text {
    transition: color 0.3s ease-in-out;
  }

  .faq-text:hover {
    background: linear-gradient(to right, rgb(93, 93, 93), rgba(107, 122, 77, 0.33));
    color: white;
  }

  .faq-icon {
    font-size: 24px;
    opacity: 0.5; /* Makes the icons transparent */
    transition: opacity 0.3s ease-in-out;
  }

  .faq-item:hover .faq-icon {
    opacity: 1;
  }

  .icon {
    font-size: 20px;
    color: white;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
    padding: 5px;
    border-radius: 50%;
  }

  .gradient-icon {
    background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
  }

  .faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  }

  .faq-content.open {
    max-height: 100px;
    padding-top: 10px;
  }

  .faq-answer {
    color: white;
  }
`;

// Inject styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default FAQ;
