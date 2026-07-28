# Pet Care Editorial Workflow

1. Topic proposed.
2. Search intent and related service selected.
3. Draft created.
4. Medical review assigned.
5. Reviewer feedback completed.
6. Revision completed.
7. Final approval.
8. Publish date assigned.
9. Static build generated.
10. SEO validation run.
11. Production deployment approved.
12. Search Console checks completed.
13. Distribution completed.
14. Performance reviewed.
15. Article updated when necessary.

## Responsibilities

- Content writer: draft, revise, references, summary, FAQ, distribution copy.
- Veterinary reviewer: medical review, accuracy feedback, final clinical signoff.
- Website administrator: content entry, build, deployment coordination.
- SEO owner: query targeting, metadata, internal links, Search Console review.
- Final publisher: confirms business approval and release timing.

No real staff owner is assigned in this document because individual roles have not been confirmed.

## Required Checks Before Publish

- `npm run content:validate`
- `npm run content:status`
- `npm run build`
- `npm run seo:verify`
- Production preview reviewed.
- Search Console inspection queued after deploy.
