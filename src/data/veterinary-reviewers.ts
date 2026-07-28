import images from "../app/assests/images";
import { veterinaryReviewers as rawReviewers } from "../content/pet-care/pet-care-content.mjs";

export type VeterinaryReviewer = {
  id: string;
  name: string;
  credentials: string;
  role: string;
  title: string;
  photo: string;
  photoFile: string;
  shortBio: string;
  bio: string;
  active: boolean;
};

const imageMap = images as Record<string, string>;

export const veterinaryReviewers: VeterinaryReviewer[] = rawReviewers.map((reviewer) => ({
  id: reviewer.id,
  name: reviewer.name,
  credentials: reviewer.credentials,
  role: reviewer.role,
  title: "Veterinarian reviewed",
  photo: imageMap[reviewer.photoKey],
  photoFile: reviewer.photoFile,
  shortBio: reviewer.shortBio,
  bio: reviewer.shortBio,
  active: reviewer.active,
}));

export function getReviewerById(id: string) {
  return veterinaryReviewers.find((reviewer) => reviewer.id === id);
}
