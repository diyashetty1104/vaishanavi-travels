
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  trip TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly readable"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT WITH CHECK (true);
