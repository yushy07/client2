import { useState, type ReactNode } from "react";
import { Check, EyeOff, Loader2, LogIn, ShieldAlert, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PAGE_SIZE = 20;

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState("");
  const me = trpc.auth.me.useQuery();
  const reviews = trpc.shopReviews.listForModeration.useQuery(
    { page, pageSize: PAGE_SIZE },
    { enabled: me.data?.role === "admin" },
  );
  const utils = trpc.useUtils();
  const moderation = trpc.shopReviews.moderate.useMutation({
    onSuccess: async () => {
      setActionError("");
      await Promise.all([
        utils.shopReviews.listForModeration.invalidate(),
        utils.shopReviews.listPublished.invalidate(),
      ]);
    },
    onError: error => setActionError(error.message || "Could not update this review. Please try again."),
  });

  if (me.isLoading) return <PageMessage icon={<Loader2 className="h-6 w-6 animate-spin" />} title="Checking access…" />;
  if (me.error) return <PageMessage icon={<ShieldAlert className="h-6 w-6" />} title="Could not verify access" detail={me.error.message} />;
  if (!me.data) {
    return <PageMessage icon={<LogIn className="h-6 w-6" />} title="Admin sign-in required" detail="Sign in with an administrator account to moderate customer reviews." action={<Button onClick={startLogin}>Sign in</Button>} />;
  }
  if (me.data.role !== "admin") {
    return <PageMessage icon={<ShieldAlert className="h-6 w-6" />} title="Administrator access required" detail="Your account cannot moderate reviews." />;
  }

  const totalPages = Math.max(1, Math.ceil((reviews.data?.total ?? 0) / PAGE_SIZE));
  return (
    <main className="min-h-screen bg-dark px-4 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Administration</p>
          <h1 className="mt-2 text-3xl font-serif">Customer review moderation</h1>
          <p className="mt-2 text-sm text-on-dark-muted">New reviews stay private until an administrator approves them.</p>
        </header>
        {actionError && <div role="alert" className="rounded-lg border border-red-400/50 bg-red-950/40 p-4 text-sm text-red-100">{actionError}</div>}
        {reviews.isLoading && <p aria-live="polite">Loading reviews…</p>}
        {reviews.error && <div role="alert" className="rounded-lg border border-red-400/50 p-4">{reviews.error.message}</div>}
        {reviews.data?.reviews.length === 0 && <p className="rounded-lg border border-border-teal p-6 text-on-dark-muted">No reviews found.</p>}

        <div className="space-y-4">
          {reviews.data?.reviews.map(review => {
            const busy = moderation.isPending && moderation.variables?.reviewId === review.id;
            const isPublic = review.status === "published" || review.status === "approved";
            return (
              <Card key={review.id} className="border-border-teal bg-dark-surface text-white">
                <CardHeader className="pb-3"><div className="flex flex-wrap items-start justify-between gap-3">
                  <CardTitle className="text-lg">{review.displayName}</CardTitle>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isPublic ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-200"}`}>{isPublic ? "Published" : "Private / pending"}</span>
                </div></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" className={`h-4 w-4 ${index < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />)}
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-6 text-on-dark-muted">{review.reviewText}</p>
                  <p className="text-xs text-slate-400">Submitted {new Date(review.createdAt).toLocaleString()}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled={busy || isPublic} onClick={() => moderation.mutate({ reviewId: review.id, action: "approve" })}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}Approve</Button>
                    <Button variant="outline" disabled={busy || !isPublic} onClick={() => moderation.mutate({ reviewId: review.id, action: "hide" })}><EyeOff className="mr-2 h-4 w-4" />Hide</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {reviews.data && reviews.data.total > PAGE_SIZE && <nav aria-label="Review pages" className="flex items-center justify-between">
          <Button variant="outline" disabled={page === 1 || reviews.isFetching} onClick={() => setPage(value => value - 1)}>Previous</Button>
          <span className="text-sm text-on-dark-muted">Page {page} of {totalPages}</span>
          <Button variant="outline" disabled={page >= totalPages || reviews.isFetching} onClick={() => setPage(value => value + 1)}>Next</Button>
        </nav>}
      </div>
    </main>
  );
}

function PageMessage({ icon, title, detail, action }: { icon: ReactNode; title: string; detail?: string; action?: ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center bg-dark px-4 text-white"><div className="max-w-md rounded-2xl border border-border-teal bg-dark-surface p-8 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">{icon}</div>
    <h1 className="text-2xl font-serif">{title}</h1>
    {detail && <p className="my-4 text-sm text-on-dark-muted">{detail}</p>}
    {action}
  </div></main>;
}
