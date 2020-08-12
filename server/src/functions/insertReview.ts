import { PartialModelObject as PMO } from 'objection';

import { id } from '../utils';
import { Review } from '../models';
import { indexReview } from './indexReviews';
import { upsertReviewCourseMetrics } from './utils';

export const insertReview = async (review: PMO<Review>): Promise<Review> => {
  const inserted = await Review.eagerQuery().insertAndFetch({
    ...review,
    id: id(),
  });

  await Promise.all([
    upsertReviewCourseMetrics(inserted),
    indexReview(inserted, 'create'),
  ]);

  return inserted;
};