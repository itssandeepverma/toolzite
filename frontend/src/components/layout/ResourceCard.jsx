import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const ResourceCard = ({
  title,
  description,
  href,
  ctaLabel = "Explore",
  tag,
  meta,
  Icon,
  gradient,
  imageUrl,
  external = true,
  topActions,
  disabled = false,
  className = "",
}) => {
  const linkProps = external
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {
        to: href,
      };

  const LinkElement = external ? "a" : Link;
  const cardClassName = ["tz-card", "tz-tool-card", "tz-resource-card", "mx-auto", className]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      {topActions ? <div className="tz-resource-card-actions">{topActions}</div> : null}

      <div
        className="tz-resource-card-head"
        style={gradient ? { background: gradient } : undefined}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="tz-resource-card-image" />
        ) : (
          Icon && <Icon className="tz-resource-card-icon" aria-hidden="true" />
        )}
      </div>

      <div className="tz-tool-card-body">
        <h5 className="tz-tool-card-title">{title}</h5>
        <p className="tz-tool-card-description">{description}</p>

        {meta ? <div className="tz-resource-meta">{meta}</div> : null}

        <div className="tz-tool-card-footer">
          {tag ? <span className="tz-tool-tag">{tag}</span> : <span />}

          {disabled ? (
            <span className="tz-tool-cta tz-tool-cta-disabled">{ctaLabel}</span>
          ) : (
            <LinkElement className="tz-tool-cta" {...linkProps}>
              {ctaLabel}
              <span aria-hidden="true">
                {external ? <FaExternalLinkAlt size={12} /> : "→"}
              </span>
            </LinkElement>
          )}
        </div>
      </div>
    </article>
  );
};

export default ResourceCard;
