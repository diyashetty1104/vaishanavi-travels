
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

CREATE POLICY "Gallery photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload gallery photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery');

CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  uploader_name TEXT NOT NULL,
  caption TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery photos are publicly readable"
  ON public.gallery_photos FOR SELECT USING (true);

CREATE POLICY "Anyone can add a gallery photo"
  ON public.gallery_photos FOR INSERT WITH CHECK (true);
