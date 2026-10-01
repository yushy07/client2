import { useState, type FormEvent } from "react";
import { ExternalLink, Loader2, Star } from "lucide-react";
import {
  REVIEW_NAME_ERROR,
  REVIEW_NAME_MAX,
  REVIEW_NAME_MIN,
  REVIEW_RATING_ERROR,
  REVIEW_RATING_MAX,
  REVIEW_RATING_MIN,
  REVIEW_TEXT_ERROR,
  REVIEW_TEXT_MAX,
  REVIEW_TEXT_MIN,
} from "@shared/validation";

/** A review published from the website and stored in the database. */
export interface WebsiteReview {
  id: number;
  displayName: string;
  rating: number;
  reviewText: string;
  createdAt: Date | string | number;
}

export interface ReviewSubmissionInput {
  displayName: string;
  rating: number;
  reviewText: string;
}

interface CuratedTestimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  product: string;
  date: string;
  tag: string;
}

/**
 * Feedback collected in the showroom and published by the owners. These are
 * deliberately kept separate from website submissions: they are not tied to a
 * `shopReviews` record, so they are labelled as curated rather than presented
 * as verified website reviews.
 */
const CURATED_SHOWROOM_TESTIMONIALS: CuratedTestimonial[] = [
  {
    name: "Santosh Verma",
    role: "Homeowner · Shukul Bazar",
    avatar: "SV",
    rating: 5,
    quote:
      "Best paint shop in Baskhari. Got authentic Birla Opus Calista with exact computerized shade matching for our living room. The finish is ultra-smooth and easily washable.",
    product: "Calista Ever Clear (Warm Cashmere)",
    date: "Recent Buyer",
    tag: "Verified In-Store Buyer",
  },
  {
    name: "Anil Kumar Yadav",
    role: "Civil Contractor · Ambedkar Nagar",
    avatar: "AY",
    rating: 5,
    quote:
      "Ramesh ji personally guided our team on All Dry waterproofing dilution and exterior primer coats for a 3-storey bungalow. Zero seepage even after heavy monsoons.",
    product: "All Dry Rain Shield & Primer",
    date: "1 month ago",
    tag: "Verified Contractor",
  },
  {
    name: "Dr. Pradeep Mishra",
    role: "Resident · Baskhari Market",
    avatar: "PM",
    rating: 5,
    quote:
      "The low-odour luxury emulsion is phenomenal. The staff was very courteous and demonstrated physical swatch fandecks under natural daylight. Best experience.",
    product: "One Pure Elegance Matt (Alabaster)",
    date: "2 weeks ago",
    tag: "Homeowner",
  },
  {
    name: "Mohd. Tariq",
    role: "Master Painter · Tanda Road",
    avatar: "MT",
    rating: 5,
    quote:
      "As a painter with 15+ years experience, Birla Opus coverage and drying time is top tier. Jaymurti Traders supplies 100% genuine sealed cans with direct billing.",
    product: "Neo Lux Enamel & Wood Finishes",
    date: "3 weeks ago",
    tag: "Master Painter (15+ Yrs)",
  },
  {
    name: "Vikas Pandey",
    role: "Homeowner · Akbarpur Road",
    avatar: "VP",
    rating: 5,
    quote:
      "With small kids at home, stain resistance was our main priority. Crayon marks and tea spills wiped clean with a damp sponge without fading the wall color.",
    product: "Calista Ever Clean (Washable)",
    date: "1 month ago",
    tag: "Verified Buyer",
  },
  {
    name: "Rajesh Jaiswal",
    role: "Commercial Builder · Baskhari",
    avatar: "RJ",
    rating: 5,
    quote:
      "Painted our commercial showroom facade with Birla Opus Style exterior shield. Anti-algae performance and vibrant colour retention under harsh summer sun is outstanding.",
    product: "Style All-Weather Exterior Shield",
    date: "2 months ago",
    tag: "Commercial Project",
  },
  {
    name: "Sunita Devi",
    role: "Renovation Client · Shukul Bazar",
    avatar: "SD",
    rating: 5,
    quote:
      "We chose the Venetian mineral stucco texture for our mandir accent wall. The showroom staff arranged physical sample panels before ordering. Very trustworthy shop.",
    product: "Designer Wall Textures & Stucco",
    date: "Recent Buyer",
    tag: "Verified Buyer",
  },
  {
    name: "Amitabh Srivastava",
    role: "Interior Consultant · Ambedkar Nagar",
    avatar: "AS",
    rating: 5,
    quote:
      "The computerized tinting machine reproduces exact architectural codes from the catalogue. No shade variation between multiple 20L batches. My go-to dealer.",
    product: "159 Shade Spectral Palette",
    date: "Verified Pro",
    tag: "Interior Consultant",
  },
];

const STAR_LEVELS = Array.from(
  { length: REVIEW_RATING_MAX },
  (_, index) => index + REVIEW_RATING_MIN,
);

function formatReviewDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="review-stars" role="img" aria-label={label}>
      {STAR_LEVELS.map(level => (
        <Star
          key={level}
          size={13}
          aria-hidden="true"
          fill={level <= rating ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export interface HomeReviewsSectionProps {
  /** Reviews published from the website, newest first. */
  reviews?: WebsiteReview[];
  /** Mean rating of `reviews`, or null when nothing is published yet. */
  averageRating?: number | null;
  isLoading?: boolean;
  onSubmit: (input: ReviewSubmissionInput) => Promise<void>;
  googleBusinessProfileUrl: string;
}

export function HomeReviewsSection({
  reviews = [],
  averageRating = null,
  isLoading = false,
  onSubmit,
  googleBusinessProfileUrl,
}: HomeReviewsSectionProps) {
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const publishedCount = reviews.length;
  const hasPublishedRating = publishedCount > 0 && typeof averageRating === "number";
  const displayedRating = hasPublishedRating ? (averageRating as number).toFixed(1) : null;

  const validate = (): string => {
    if (displayName.trim().length < REVIEW_NAME_MIN) return REVIEW_NAME_ERROR;
    if (rating < REVIEW_RATING_MIN || rating > REVIEW_RATING_MAX) {
      return REVIEW_RATING_ERROR;
    }
    const trimmedReview = reviewText.trim();
    if (trimmedReview.length < REVIEW_TEXT_MIN || trimmedReview.length > REVIEW_TEXT_MAX) {
      return REVIEW_TEXT_ERROR;
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      setSubmitted(false);
      return;
    }

    setFormError("");
    setSubmitting(true);
    try {
      await onSubmit({
        displayName: displayName.trim(),
        rating,
        reviewText: reviewText.trim(),
      });
      setDisplayName("");
      setRating(0);
      setReviewText("");
      setSubmitted(true);
    } catch (error) {
      setSubmitted(false);
      setFormError(
        error instanceof Error && error.message
          ? error.message
          : "We could not save your review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="review-intro">
        <div>
          <div className="eyebrow">Verified Client Experiences</div>
          <h2 className="section-title">
            Voices of transformed
            <br />
            living spaces.
          </h2>
          <p className="section-lead">
            Authentic feedback from homeowners, master painters, civil contractors, and
            builders across Baskhari and Ambedkar Nagar.
          </p>
        </div>

        <a
          className="google-review-placeholder"
          href={googleBusinessProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Review Jaymurti Traders on the Google Business Profile"
        >
          <div>
            <span>Google Business Verified</span>
            <strong>Review us on Google</strong>
            <p className="google-review-sub">
              Official Google Business Profile · Baskhari showroom
            </p>
          </div>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="review-layout">
        <div className="approved-reviews visual-review-summary-card">
          <div className="review-summary">
            <div>
              <span className="review-summary-label">Website reviews</span>
              <strong>{displayedRating ?? "—"}</strong>
              {hasPublishedRating ? (
                <Stars
                  rating={Math.round(averageRating as number)}
                  label={`${displayedRating} out of 5 stars from ${publishedCount} published ${
                    publishedCount === 1 ? "review" : "reviews"
                  }`}
                />
              ) : null}
            </div>
            <div className="review-summary-side">
              <p>
                {hasPublishedRating
                  ? `Based on ${publishedCount} published ${
                      publishedCount === 1 ? "review" : "reviews"
                    } submitted on this website.`
                  : "No published website reviews yet."}
              </p>
              <a
                className="review-summary-google-link"
                href={googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Business Profile
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          {isLoading ? (
            <p className="review-empty" role="status">
              Loading published reviews…
            </p>
          ) : publishedCount === 0 ? (
            <p className="review-empty">
              Be the first to review Jaymurti Traders on this website. Your review appears here
              once our team has published it.
            </p>
          ) : (
            <div className="approved-review-list">
              {reviews.map(review => (
                <article className="approved-review-card" key={review.id}>
                  <div className="review-card-top">
                    <strong>{review.displayName}</strong>
                    <Stars
                      rating={review.rating}
                      label={`${review.rating} out of 5 stars`}
                    />
                  </div>
                  <p>“{review.reviewText}”</p>
                  <div className="review-card-bottom">
                    <span className="review-source-tag">Website review</span>
                    <span>{formatReviewDate(review.createdAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <form className="review-form" onSubmit={handleSubmit} noValidate>
          <div className="review-form-heading">
            <span className="review-summary-label">Share your experience</span>
            <h3>Write a review</h3>
            <p>
              Tell other homeowners and contractors how your visit went. Reviews are published
              by our team before they appear on this page.
            </p>
          </div>

          <label className="review-name-label" htmlFor="review-display-name">
            Your name
            <input
              id="review-display-name"
              name="displayName"
              type="text"
              autoComplete="name"
              maxLength={REVIEW_NAME_MAX}
              value={displayName}
              onChange={event => {
                setDisplayName(event.target.value);
                if (formError) setFormError("");
              }}
              required
            />
          </label>

          <fieldset className="review-rating">
            <legend>Your rating</legend>
            <div>
              {STAR_LEVELS.map(level => (
                <button
                  key={level}
                  type="button"
                  className={level <= rating ? "active" : undefined}
                  aria-label={`${level} ${level === 1 ? "star" : "stars"}`}
                  aria-pressed={level <= rating}
                  onClick={() => {
                    setRating(level);
                    if (formError) setFormError("");
                  }}
                >
                  <Star size={18} aria-hidden="true" fill="currentColor" />
                </button>
              ))}
            </div>
          </fieldset>

          <label className="review-copy-label" htmlFor="review-text">
            Your review
            <textarea
              id="review-text"
              name="reviewText"
              maxLength={REVIEW_TEXT_MAX}
              value={reviewText}
              onChange={event => {
                setReviewText(event.target.value);
                if (formError) setFormError("");
              }}
              required
            />
          </label>

          <button className="review-submit" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              "Submit review"
            )}
          </button>

          <div className="review-form-feedback">
            {formError ? (
              <p className="review-form-message" role="alert">
                {formError}
              </p>
            ) : submitted ? (
              <p className="review-form-message" role="status">
                Thank you — your review has been received and will appear here once published.
              </p>
            ) : null}

            {submitted ? (
              <div className="review-google-prompt">
                <p>Already a Google customer? A Google review helps neighbours find us.</p>
                <a
                  className="button-google-share"
                  href={googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Review us on Google
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
        </form>
      </div>

      <div className="approved-reviews">
        <div className="review-summary">
          <div>
            <span className="review-summary-label">Showroom testimonials</span>
            <strong>{CURATED_SHOWROOM_TESTIMONIALS.length}</strong>
            <Stars
              rating={5}
              label="Curated showroom testimonials, collected in store"
            />
          </div>
          <div className="review-summary-side">
            <p>
              Collected in store by Jaymurti Traders and published by the showroom owners.
            </p>
          </div>
        </div>

        <div className="approved-review-list">
          {CURATED_SHOWROOM_TESTIMONIALS.map(testimonial => (
            <article className="approved-review-card" key={testimonial.name}>
              <div className="review-card-top">
                <strong>{testimonial.name}</strong>
                <Stars
                  rating={testimonial.rating}
                  label={`${testimonial.rating} out of 5 stars`}
                />
              </div>
              <p>“{testimonial.quote}”</p>
              <div className="review-card-bottom">
                <span className="review-source-tag">Showroom testimonial</span>
                <span>
                  {testimonial.role} · {testimonial.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeReviewsSection;
