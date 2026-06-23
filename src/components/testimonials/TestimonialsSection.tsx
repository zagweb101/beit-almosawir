import { Star } from "lucide-react";
import { SITE } from "@/lib/site-config";
import type { AdminTestimonial } from "@/lib/admin/types";

type FallbackItem = { q: string; n: string; r: string };

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= rating ? "size-4 fill-primary text-primary" : "size-4 text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

function reviewSchema(items: AdminTestimonial[]) {
  const rated = items.filter((t) => t.rating > 0);
  if (rated.length === 0) return null;
  const avg = rated.reduce((sum, t) => sum + t.rating, 0) / rated.length;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brandName,
    url: SITE.siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: rated.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: rated.slice(0, 12).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.authorName },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5, worstRating: 1 },
      reviewBody: t.quote,
    })),
  };
}

export default function TestimonialsSection({
  testimonials,
  title,
  fallback = [],
}: {
  testimonials: AdminTestimonial[];
  title: string;
  fallback?: FallbackItem[];
}) {
  const hasReal = testimonials.length > 0;
  const schema = hasReal ? reviewSchema(testimonials) : null;

  const items = hasReal
    ? testimonials
    : fallback.map(
        (f, i): AdminTestimonial => ({
          id: `fallback-${i}`,
          authorName: f.n,
          role: f.r,
          quote: f.q,
          rating: 5,
          featured: false,
          active: true,
          sortOrder: i,
          createdAt: "",
          updatedAt: "",
        }),
      );

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {items.map((t) => (
          <figure key={t.id} className="card-elegant rounded-2xl p-8">
            <Stars rating={t.rating} />
            <blockquote className="mt-3 text-foreground/90 leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {t.photoUrl ? (
                <img
                  src={t.photoUrl}
                  alt={t.authorName}
                  loading="lazy"
                  className="size-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="size-10 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                  {t.authorName.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-semibold">{t.authorName}</div>
                {t.role ? <div className="text-xs text-muted-foreground">{t.role}</div> : null}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
