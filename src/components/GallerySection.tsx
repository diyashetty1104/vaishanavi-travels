import { useState, useEffect, useRef } from "react";
import { Camera, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryPhoto {
  id: string;
  uploader_name: string;
  caption: string | null;
  storage_path: string;
  created_at: string;
}

const GallerySection = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setPhotos(data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !name.trim()) return;
    setUploading(true);

    const ext = selectedFile.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .upload(path, selectedFile, { contentType: selectedFile.type });

    if (storageError) {
      setUploading(false);
      return;
    }

    const { data: inserted } = await supabase
      .from("gallery_photos")
      .insert([{ uploader_name: name, caption: caption || null, storage_path: path }])
      .select()
      .single();

    if (inserted) {
      setPhotos((prev) => [inserted, ...prev]);
    }

    setUploading(false);
    setSuccess(true);
    setName("");
    setCaption("");
    setSelectedFile(null);
    setPreview(null);
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  const getPhotoUrl = (path: string) => {
    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <section id="gallery" className="py-20 bg-surface-light">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-display text-accent-orange font-semibold text-xs tracking-widest uppercase mb-2">
            Customer Moments
          </p>
          <h2 className="font-display font-black text-primary text-3xl md:text-4xl mb-3">
            TRAVEL GALLERY
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Share your travel memories with us! Upload a photo from your journey with Vaishnavi Travels.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 gradient-cta text-accent-orange-foreground font-display font-bold text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-elevated"
          >
            <Camera size={16} />
            Share Your Photo
          </button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <div className="max-w-lg mx-auto mb-12 bg-card rounded-2xl shadow-elevated p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-black text-primary text-base">Upload Your Travel Photo</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-primary transition-colors">
                <X size={18} />
              </button>
            </div>

            {success ? (
              <div className="text-center py-6">
                <Camera size={40} className="text-accent-orange mx-auto mb-3" />
                <p className="font-display font-bold text-primary">Photo Uploaded! 🎉</p>
                <p className="font-body text-muted-foreground text-sm mt-1">Thanks for sharing your memory.</p>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                {/* File picker */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-accent-orange/60 transition-colors overflow-hidden relative"
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <>
                      <Upload size={28} className="text-muted-foreground mb-2" />
                      <p className="font-display font-bold text-muted-foreground text-xs uppercase tracking-wider">
                        Tap to choose a photo
                      </p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul Shetty"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    Caption (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amazing trip to Coorg!"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="w-full gradient-cta text-accent-orange-foreground font-display font-black text-sm py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Photo Grid */}
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon size={48} className="text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-display font-bold text-muted-foreground">No photos yet — be the first to share!</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid group relative overflow-hidden rounded-xl bg-card shadow-card">
                <img
                  src={getPhotoUrl(photo.storage_path)}
                  alt={photo.caption || "Travel photo"}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  {photo.caption && (
                    <p className="font-body text-primary-foreground text-xs leading-snug mb-0.5">{photo.caption}</p>
                  )}
                  <p className="font-display font-bold text-accent-orange text-[10px] uppercase tracking-wide">
                    — {photo.uploader_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
