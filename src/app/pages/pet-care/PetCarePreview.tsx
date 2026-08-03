import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Seo from "../../components/seo/Seo";
import {
  addPetCarePreviewComment,
  approvePetCarePreview,
  getPetCarePreview,
  type PetCarePreviewResponse,
} from "../../../lib/api/clients";

export function PetCarePreview() {
  const { token = "" } = useParams();
  const [preview, setPreview] = useState<PetCarePreviewResponse | null>(null);
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPreview = useCallback(async () => {
    try {
      setPreview(await getPetCarePreview(token));
      setError("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "This preview link is unavailable.");
    }
  }, [token]);

  useEffect(() => { void loadPreview(); }, [loadPreview]);

  if (error) return <main className="min-h-[70vh] bg-[#F7FAF2] px-5 py-24"><Seo title="Private article preview | Lili Veterinary Hospital" description="Private editorial preview." path={`/pet-care/preview/${token}`} noIndex /><div className="mx-auto max-w-xl rounded-lg border border-[#DCE9D7] bg-white p-8 text-center"><h1 className="text-3xl font-bold text-[#073D2A]">Preview unavailable</h1><p className="mt-3 text-[#557064]">{error}</p></div></main>;
  if (!preview) return <main className="min-h-[70vh] bg-[#F7FAF2]" aria-busy="true" />;

  const article = preview.article;
  return <main className="bg-[#F7FAF2] px-4 py-12 text-[#073D2A] md:px-8"><Seo title={`Private preview: ${article.title}`} description="Private editorial preview." path={`/pet-care/preview/${token}`} noIndex />
    <div className="mx-auto max-w-[1180px]"><header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#DCE9D7] bg-white p-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087C48]">Private editorial preview</p><p className="mt-1 text-sm text-[#557064]">This draft is not published or indexed by search engines.</p></div><div className="flex items-center gap-2 rounded-full bg-[#EAF7F0] px-4 py-2 text-sm font-bold"><ShieldCheck className="h-4 w-4" />{preview.shareType === "REVIEWER" ? "Veterinarian approval" : "Comment access"}</div></header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><article className="rounded-lg border border-[#DCE9D7] bg-white p-6 md:p-10"><p className="text-xs font-bold uppercase text-[#087C48]">{article.categoryLabel}</p><h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1><p className="mt-5 text-xl leading-8 text-[#557064]">{article.excerpt}</p><p className="mt-4 text-sm font-bold text-[#557064]">{article.readingTimeMinutes} min read</p>{article.heroImageUrl ? <img src={article.heroImageUrl} alt={article.heroImageAlt} className="mt-8 aspect-[16/8] w-full rounded-lg object-cover" /> : null}<p className="mt-8 text-lg leading-8">{article.summary}</p>{article.sections.map((section) => <section key={section.id} className="mt-10"><h2 className="text-2xl font-bold">{section.title}</h2>{section.content.map((paragraph, index) => <p key={index} className="mt-4 leading-8 text-[#36584A]">{paragraph}</p>)}</section>)}</article>
        <aside className="space-y-6"><section className="rounded-lg border border-[#DCE9D7] bg-white p-5"><h2 className="flex items-center gap-2 text-xl font-bold"><MessageSquare className="h-5 w-5" />Leave feedback</h2><label className="mt-4 block text-sm font-bold">Your name<input value={authorName} onChange={(event) => setAuthorName(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#CFE0D5] px-3" /></label><label className="mt-4 block text-sm font-bold">Comment<textarea value={comment} onChange={(event) => setComment(event.target.value)} className="mt-2 min-h-28 w-full rounded-lg border border-[#CFE0D5] p-3" /></label><button disabled={isSubmitting || authorName.trim().length < 2 || comment.trim().length < 2} onClick={async () => { setIsSubmitting(true); try { await addPetCarePreviewComment(token, authorName, comment); setComment(""); toast.success("Comment added"); await loadPreview(); } catch (requestError) { toast.error(requestError instanceof Error ? requestError.message : "Could not add comment"); } finally { setIsSubmitting(false); } }} className="mt-4 h-12 w-full rounded-full bg-[#087C48] font-bold text-white disabled:opacity-50">Add comment</button></section>
          {preview.shareType === "REVIEWER" ? <section className="rounded-lg border border-[#BFDCCB] bg-[#ECF8F0] p-5"><h2 className="text-xl font-bold">Medical approval</h2><p className="mt-2 text-sm leading-6 text-[#456657]">Assigned reviewer: {article.reviewer ? `${article.reviewer.name}, ${article.reviewer.credentials}` : "Not assigned"}</p>{preview.canApprove ? <button onClick={async () => { setIsSubmitting(true); try { await approvePetCarePreview(token); toast.success("Article medically approved"); await loadPreview(); } catch (requestError) { toast.error(requestError instanceof Error ? requestError.message : "Could not approve article"); } finally { setIsSubmitting(false); } }} disabled={isSubmitting} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#073D2A] font-bold text-white"><CheckCircle2 className="h-5 w-5" />Approve article</button> : <p className="mt-4 flex items-center gap-2 font-bold text-[#087C48]"><CheckCircle2 className="h-5 w-5" />Approval recorded</p>}</section> : null}
          <section><h2 className="text-lg font-bold">Comments</h2><div className="mt-3 space-y-3">{preview.comments.length ? preview.comments.map((item) => <article key={item.id} className="rounded-lg border border-[#DCE9D7] bg-white p-4"><strong>{item.authorName}</strong><p className="mt-2 text-sm leading-6 text-[#456657]">{item.comment}</p></article>) : <p className="text-sm text-[#557064]">No comments yet.</p>}</div></section></aside></div></div></main>;
}
