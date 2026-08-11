import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, ClipboardList, Home, MessageSquare, Quote, ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Seo from "../../components/seo/Seo";
import {
  addPetCarePreviewComment,
  approvePetCarePreview,
  getPetCarePreview,
  updatePetCarePreviewReviewerQuote,
  type PetCarePreviewResponse,
} from "../../../lib/api/clients";

export function PetCarePreview() {
  const { token = "" } = useParams();
  const [preview, setPreview] = useState<PetCarePreviewResponse | null>(null);
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [reviewerQuote, setReviewerQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPreview = useCallback(async () => {
    try {
      const response = await getPetCarePreview(token);
      setPreview(response);
      setReviewerQuote(response.article.vetQuote ?? "");
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
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><article className="rounded-lg border border-[#DCE9D7] bg-white p-6 md:p-10"><p className="text-xs font-bold uppercase text-[#087C48]">{article.categoryLabel}</p><h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1><p className="mt-5 text-xl leading-8 text-[#557064]">{article.excerpt}</p><p className="mt-4 text-sm font-bold text-[#557064]">{article.readingTimeMinutes} min read</p>{article.heroImageUrl ? <img src={article.heroImageUrl} alt={article.heroImageAlt} className="mt-8 aspect-[16/8] w-full rounded-lg object-cover" /> : null}<p className="mt-8 text-lg leading-8">{article.summary}</p>{article.sections.map((section) => <section key={section.id} className="mt-10"><h2 className="text-2xl font-bold">{section.title}</h2>{section.type === "IMAGE" && section.imageUrl ? <figure className="mt-4"><img src={section.imageUrl} alt={section.imageAlt ?? ""} className="max-h-[620px] w-full rounded-lg object-cover" />{section.caption ? <figcaption className="mt-2 text-sm text-[#60736B]">{section.caption}</figcaption> : null}</figure> : section.content.map((paragraph, index) => <p key={index} className="mt-4 leading-8 text-[#36584A]">{paragraph}</p>)}</section>)}
        {article.warningCallout ? <aside className="mt-10 border-l-4 border-[#E2463C] bg-[#FFF5F2] px-5 py-4"><h2 className="flex items-center gap-2 font-extrabold text-[#7A2923]"><ShieldAlert className="h-5 w-5" />Safety note</h2><p className="mt-2 leading-7 text-[#603D38]">{article.warningCallout}</p></aside> : null}
        {article.keyTakeaways.length ? <section className="mt-10 border-t border-[#DDEBE2] pt-8"><h2 className="flex items-center gap-2 text-2xl font-bold"><ClipboardList className="h-6 w-6 text-[#087C48]" />Key takeaways</h2><ul className="mt-4 space-y-3">{article.keyTakeaways.map((item, index) => <li key={index} className="flex gap-3 leading-7 text-[#36584A]"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#087C48]" />{item}</li>)}</ul></section> : null}
        {article.monitorAtHome.length ? <section className="mt-10 border-t border-[#DDEBE2] pt-8"><h2 className="flex items-center gap-2 text-2xl font-bold"><Home className="h-6 w-6 text-[#087C48]" />What to monitor at home</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{article.monitorAtHome.map((item, index) => <li key={index} className="rounded-lg border border-[#DDEBE2] bg-[#F7FAF8] p-4 leading-7 text-[#36584A]">{item}</li>)}</ul></section> : null}
        {article.vetQuote ? <blockquote className="mt-10 border-y border-[#DDEBE2] py-7 text-xl font-semibold italic leading-8 text-[#274A3E]">&ldquo;{article.vetQuote}&rdquo;</blockquote> : null}
        {article.faqs.length ? <section className="mt-10 border-t border-[#DDEBE2] pt-8"><h2 className="text-2xl font-bold">Frequently asked questions</h2><div className="mt-4 divide-y divide-[#DDEBE2] border-y border-[#DDEBE2]">{article.faqs.map((faq, index) => <div key={index} className="py-5"><h3 className="font-bold text-[#102E24]">{faq.question}</h3><p className="mt-2 leading-7 text-[#36584A]">{faq.answer}</p></div>)}</div></section> : null}
        {article.references.length ? <section className="mt-10 border-t border-[#DDEBE2] pt-8"><h2 className="text-xl font-bold">Veterinary references</h2><ol className="mt-4 space-y-2 text-sm leading-6 text-[#557064]">{article.references.map((reference, index) => <li key={index}>{index + 1}. {reference.url ? <a className="font-semibold text-[#087C48] underline underline-offset-4" href={reference.url} target="_blank" rel="noreferrer">{reference.label}</a> : reference.label}</li>)}</ol></section> : null}
        </article>
        <aside className="space-y-6"><section className="rounded-lg border border-[#DCE9D7] bg-white p-5"><h2 className="flex items-center gap-2 text-xl font-bold"><MessageSquare className="h-5 w-5" />Leave feedback</h2><label className="mt-4 block text-sm font-bold">Your name<input value={authorName} onChange={(event) => setAuthorName(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#CFE0D5] px-3" /></label><label className="mt-4 block text-sm font-bold">Comment<textarea value={comment} onChange={(event) => setComment(event.target.value)} className="mt-2 min-h-28 w-full rounded-lg border border-[#CFE0D5] p-3" /></label><button disabled={isSubmitting || authorName.trim().length < 2 || comment.trim().length < 2} onClick={async () => { setIsSubmitting(true); try { await addPetCarePreviewComment(token, authorName, comment); setComment(""); toast.success("Comment added"); await loadPreview(); } catch (requestError) { toast.error(requestError instanceof Error ? requestError.message : "Could not add comment"); } finally { setIsSubmitting(false); } }} className="mt-4 h-12 w-full rounded-full bg-[#087C48] font-bold text-white disabled:opacity-50">Add comment</button></section>
          {preview.shareType === "REVIEWER" ? <section className="rounded-lg border border-[#BFDCCB] bg-[#ECF8F0] p-5"><h2 className="text-xl font-bold">Medical approval</h2><p className="mt-2 text-sm leading-6 text-[#456657]">Assigned reviewer: {article.reviewer ? `${article.reviewer.name}, ${article.reviewer.credentials}` : "Not assigned"}</p>{preview.canApprove ? <><label className="mt-5 block text-sm font-bold text-[#294B3D]"><span className="flex items-center gap-2"><Quote className="h-4 w-4" />Veterinarian quote</span><textarea value={reviewerQuote} onChange={(event) => setReviewerQuote(event.target.value)} placeholder="Add or refine a short clinical quote for the article." className="mt-2 min-h-28 w-full rounded-lg border border-[#BFDCCB] bg-white p-3 font-normal" /></label><button onClick={async () => { setIsSubmitting(true); try { await updatePetCarePreviewReviewerQuote(token, reviewerQuote); toast.success("Veterinarian quote saved"); await loadPreview(); } catch (requestError) { toast.error(requestError instanceof Error ? requestError.message : "Could not save the veterinarian quote"); } finally { setIsSubmitting(false); } }} disabled={isSubmitting || reviewerQuote.trim().length < 2} className="mt-3 h-11 w-full rounded-full border border-[#087C48] bg-white font-bold text-[#087C48] disabled:opacity-50">Save veterinarian quote</button><button onClick={async () => { setIsSubmitting(true); try { await approvePetCarePreview(token); toast.success("Article medically approved"); await loadPreview(); } catch (requestError) { toast.error(requestError instanceof Error ? requestError.message : "Could not approve article"); } finally { setIsSubmitting(false); } }} disabled={isSubmitting} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#073D2A] font-bold text-white"><CheckCircle2 className="h-5 w-5" />Approve article</button></> : <p className="mt-4 flex items-center gap-2 font-bold text-[#087C48]"><CheckCircle2 className="h-5 w-5" />Approval recorded</p>}</section> : null}
          <section><h2 className="text-lg font-bold">Comments</h2><div className="mt-3 space-y-3">{preview.comments.length ? preview.comments.map((item) => <article key={item.id} className="rounded-lg border border-[#DCE9D7] bg-white p-4"><strong>{item.authorName}</strong><p className="mt-2 text-sm leading-6 text-[#456657]">{item.comment}</p></article>) : <p className="text-sm text-[#557064]">No comments yet.</p>}</div></section></aside></div></div></main>;
}
