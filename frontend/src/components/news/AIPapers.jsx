import React from "react";
import MetaData from "../layout/MetaData";
import { FaBook, FaExternalLinkAlt, FaUniversity } from "react-icons/fa";

const aiPapers = [
  { title: "Attention Is All You Need", link: "https://arxiv.org/abs/1706.03762", description: "The seminal paper introducing the Transformer architecture.", source: "Google Brain" },
  { title: "BERT: Pre-training of Deep Bidirectional Transformers", link: "https://arxiv.org/abs/1810.04805", description: "Groundbreaking NLP model using Transformer pre-training.", source: "Google AI" },
  { title: "GPT-3: Language Models are Few-Shot Learners", link: "https://arxiv.org/abs/2005.14165", description: "Demonstrated the power of very large language models.", source: "OpenAI" },
  { title: "DistilBERT", link: "https://arxiv.org/abs/1910.01108", description: "Efficient, smaller Transformer model.", source: "Hugging Face" },
  { title: "Stable Diffusion", link: "https://arxiv.org/abs/2112.10752", description: "Latent diffusion models for image generation.", source: "CompVis" },
  { title: "Denoising Diffusion Probabilistic Models", link: "https://arxiv.org/abs/2006.11239", description: "Foundation of diffusion-based generative models.", source: "UC Berkeley" },
  { title: "AlphaGo", link: "https://www.nature.com/articles/nature16961", description: "Deep reinforcement learning for board games.", source: "DeepMind" },
  { title: "AlphaFold", link: "https://www.nature.com/articles/s41586-021-03819-2", description: "AI system for protein structure prediction.", source: "DeepMind" },
  { title: "CLIP: Learning Transferable Visual Models", link: "https://arxiv.org/abs/2103.00020", description: "Multimodal learning with contrastive image-text pre-training.", source: "OpenAI" },
  { title: "DALL·E 2", link: "https://arxiv.org/abs/2204.06125", description: "Text-to-image generation with diffusion models.", source: "OpenAI" },
  { title: "PaLM: Pathways Language Model", link: "https://arxiv.org/abs/2204.02311", description: "Scaling language models with Pathways.", source: "Google Research" },
  { title: "Chinchilla: Training Compute-Optimal Models", link: "https://arxiv.org/abs/2203.15556", description: "Analysis of scaling laws for language models.", source: "DeepMind" },
  { title: "LLaMA: Open Foundation Models", link: "https://arxiv.org/abs/2302.13971", description: "Meta's family of open LLMs.", source: "Meta AI" },
  { title: "LoRA: Low-Rank Adaptation of LLMs", link: "https://arxiv.org/abs/2106.09685", description: "Efficient fine-tuning method for large models.", source: "Microsoft" },
  { title: "RLHF: InstructGPT", link: "https://arxiv.org/abs/2203.02155", description: "Aligning LLMs with human preferences using RLHF.", source: "OpenAI" },
  { title: "Swin Transformer", link: "https://arxiv.org/abs/2103.14030", description: "Hierarchical vision transformer for image recognition.", source: "Microsoft" },
  { title: "Segment Anything", link: "https://arxiv.org/abs/2304.02643", description: "Foundation model for image segmentation.", source: "Meta AI" },
  { title: "FlashAttention", link: "https://arxiv.org/abs/2205.14135", description: "Fast, memory-efficient attention algorithm.", source: "Stanford" },
  { title: "Mixture of Experts (GLaM)", link: "https://arxiv.org/abs/2112.06905", description: "Sparse mixture-of-experts language model.", source: "Google Research" },
  { title: "Gemini 1.5", link: "https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf", description: "Google DeepMind’s multimodal AI model.", source: "DeepMind" },
  { title: "Anthropic Claude 3", link: "https://www.anthropic.com/news/claude-3-family", description: "Anthropic’s safety-focused large language model.", source: "Anthropic" }
];

const AIPapers = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <MetaData 
      title="AI Research Papers – Latest Publications"
      description="Curated AI/ML research papers: transformers, diffusion, multimodal models, RL, and more."
      canonical="https://www.toolzite.com/ai-papers"
    />
    <div className="container mx-auto px-4 py-8" style={{ marginTop: "110px" }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AI Papers
        </h1>
        <p className="text-gray-400 text-lg">
          Explore trending and foundational research papers in AI
        </p>
      </div>
      <div className="mb-6 text-center">
        <p className="text-gray-400">
          {aiPapers.length} curated papers
        </p>
      </div>
      <div className="row">
        {aiPapers.map((paper, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div
              className="card product-card bg-dark text-light mx-auto"
              style={{ width: "18rem", height: "24rem", cursor: "pointer" }}
              onClick={() => window.open(paper.link, "_blank", "noopener,noreferrer")}
            >
              <div className="card-img-top d-flex align-items-center justify-content-center"
                   style={{ height: "30%", background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
                <FaBook className="text-white" style={{ fontSize: "3rem" }} />
              </div>
              <div className="card-body text-center d-flex flex-column" style={{ height: "70%" }}>
                <div style={{ height: "25%" }}>
                  <h5 className="card-title mb-2">{paper.title}</h5>
                  <div style={{ height: "2px", width: "80%", background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32))", margin: "0 auto" }}></div>
                </div>
                <div style={{ height: "45%", overflow: "hidden" }}>
                  <p className="card-text" style={{ margin: "0 1rem" }}>{paper.description}</p>
                </div>
                <div style={{ height: "20%", marginBottom: "0.5rem" }} className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="mb-1">
                      <span className="badge bg-secondary">Research Paper</span>
                    </div>
                    <div className="text-muted small d-flex align-items-center justify-content-center">
                      <FaUniversity className="me-1" />
                      {paper.source}
                    </div>
                  </div>
                </div>
                <div style={{ height: "10%" }} className="d-flex align-items-center justify-content-center">
                  <span className="badge bg-primary d-inline-flex align-items-center gap-1">
                    Read Paper
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </div>
              </div>
            </div>
            <style>{`
              .product-card { width: 300px; height: 380px; border-radius: 30px; background: #212121; box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60); overflow: hidden; position: relative; transition: all 0.3s ease-in-out; text-align: center; }
              .product-card:hover { box-shadow: 10px 10px 20px rgb(20, 20, 20), -10px -10px 20px rgb(50, 50, 50); transform: translateY(-5px); }
              .product-card .card-img-top { width: 100%; height: 120px; object-fit: cover; border-top-left-radius: 30px; border-top-right-radius: 30px; }
              .product-card .card-title { font-size: 15px; font-weight: bold; color: #ffffff; margin-top: 10px; }
              .product-card .card-text { font-size: 12px; color: #b0b0b0; opacity: 0.85; margin: 5px 0; }
              .badge:hover { background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32)) !important; color: white !important; }
              @media (max-width: 768px) { .product-card { width: 100%; max-width: 300px; } }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AIPapers;
