import React from "react";
import { FaBook, FaUniversity } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import ResourceCard from "../layout/ResourceCard";

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
  { title: "Gemini 1.5", link: "https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf", description: "Google DeepMind's multimodal AI model.", source: "DeepMind" },
  { title: "Anthropic Claude 3", link: "https://www.anthropic.com/news/claude-3-family", description: "Anthropic's safety-focused large language model.", source: "Anthropic" },
];

const AIPapers = () => (
  <>
    <MetaData
      title="AI Research Papers – Latest Publications"
      description="Curated AI/ML research papers: transformers, diffusion, multimodal models, RL, and more."
      canonical="https://www.toolzite.com/ai-papers"
    />

    <div className="tz-resource-page">
      <div className="tz-resource-page-inner">
        <div className="tz-resource-page-hero">
          <h1>AI Papers</h1>
          <p>Explore trending and foundational research papers in AI.</p>
        </div>

        <p className="tz-resource-count">{aiPapers.length} curated papers</p>

        <div className="tz-card-grid">
          {aiPapers.map((paper) => (
            <ResourceCard
              key={paper.title}
              title={paper.title}
              description={paper.description}
              href={paper.link}
              ctaLabel="Read paper"
              tag="Research Paper"
              meta={
                <span className="d-inline-flex align-items-center gap-2">
                  <FaUniversity aria-hidden="true" />
                  <span>{paper.source}</span>
                </span>
              }
              Icon={FaBook}
              gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default AIPapers;
